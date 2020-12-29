/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-12-30 00:10:41
* @Description         Compile
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-31 00:33:49
*/

'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpRename = require('gulp-rename');

const BASE_PATH = path.join(__dirname, '../');
const BUNDLE_PATH = path.join(BASE_PATH, 'temporary/bundle/');
const COMPILE_PATH = path.join(BASE_PATH, 'temporary/compile/');

if (!fs.existsSync(COMPILE_PATH)) fs.mkdirSync(COMPILE_PATH);

function css (scheme, options, done) {
  let level1, level2;
  const OUTFILE = 'modallayer.min.css';
  const CleanCss = require('gulp-clean-css');
  const BUNDLE_FILE = 'modallayer.bundle.css';

  level1 = {
    cleanupCharsets: true,
    normalizeUrls: true,
    optimizeBackground: true,
    optimizeBorderRadius: true,
    optimizeFilter: true,
    optimizeFontWeight: true,
    optimizeOutline: true,
    removeEmpty: true,
    removeNegativePaddings: true,
    removeQuotes: true,
    removeWhitespace: true,
    replaceMultipleZeros: true,
    replaceTimeUnits: true,
    replaceZeroUnits: true,
    roundingPrecision: '',
    selectorsSortingMethod: 'standard',
    specialComments: 'all',
    tidyAtRules: true,
    tidyBlockScopes: true,
    tidySelectors: true
  };
  level2 = {
    mergeAdjacentRules: true,
    mergeIntoShorthands: true,
    mergeMedia: true,
    mergeNonAdjacentRules: true,
    mergeSemantically: false,
    overrideProperties: true,
    reduceNonAdjacentRules: true,
    removeDuplicateFontRules: true,
    removeDuplicateMediaBlocks: true,
    removeDuplicateRules: true,
    removeEmpty: true,
    removeUnusedAtRules: false,
    restructureRules: false,
    skipProperties: ''
  };

  return gulp.src(BUNDLE_FILE, {cwd: BUNDLE_PATH})
          .pipe(CleanCss({level: {1: level1, 2: level2}}))
          .pipe(gulpRename(OUTFILE))
          .pipe(gulp.dest(COMPILE_PATH));
}

function javascript (scheme, options, done) {
  const OUTFILE = 'modallayer.min.js';
  const BUNDLE_FILE = 'modallayer.babel.js';
  if (options.compile_online) {
    const request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://closure-compiler.appspot.com/compile',
      'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'js_code': fs.readFileSync(path.join(BUNDLE_PATH, BUNDLE_FILE), 'utf-8'),
        'compilation_level': 'ADVANCED_OPTIMIZATIONS',
        'output_format': 'text',
        'output_info': 'compiled_code'
      }
    };
    return new Promise((resolve, reject) => {
      request(options, (error, response, code) => {
        if (error) {
          reject(error);
          return;
        } else if (code.indexOf('Error(') === 0) {
          reject(code);
          return;
        }
        if (!fs.existsSync(COMPILE_PATH)) fs.mkdirSync(COMPILE_PATH);
        fs.writeFileSync(path.join(COMPILE_PATH, OUTFILE), `!function(window){${code}}(window)`);
        resolve();
      });
    });
  } else {
    const closureCompiler = require('google-closure-compiler').gulp();
    return gulp.src(BUNDLE_FILE, {cwd: BUNDLE_PATH})
            .pipe(closureCompiler({
              js_output_file: OUTFILE,
              warning_level: 'VERBOSE',
              compilation_level: 'ADVANCED',
              output_wrapper: '!function(window){%output%}(window);'
            }))
            .pipe(gulp.dest(COMPILE_PATH))
  }
}

module.exports = {css, javascript};
