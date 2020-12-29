/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-12-30 00:12:21
* @Description         Bundle
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-31 00:21:57
*/

'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpConcat = require('gulp-concat');
const gulpRename = require('gulp-rename');

const ROOT_PATH = path.join(__dirname, '../../');
const BASE_PATH = path.join(__dirname, '../');
const SOURCE_PATH = path.join(ROOT_PATH, 'src/');
const BUNDLE_PATH = path.join(BASE_PATH, 'temporary/bundle/');

if (!fs.existsSync(BUNDLE_PATH)) fs.mkdirSync(BUNDLE_PATH);

function css (scheme, done) {
  const BUNDLE_FILE = 'modallayer.bundle.css';
  return gulp.src(scheme.css, {cwd: path.join(SOURCE_PATH, 'css/')})
  .pipe(gulpConcat(BUNDLE_FILE))
  .pipe(gulp.dest(BUNDLE_PATH));
}

function javascript (scheme, done) {
  let file = [];
  let promise = [];
  let order = ['core', 'layer', 'assistant', 'worker', 'storage'];

  const OUTFILE = 'modallayer.babel.js';
  const BUNDLE_FILE = 'modallayer.bundle.js';
  const JAVASCRIPT_PATH = path.join(SOURCE_PATH, 'js/');
  const BABELRC = JSON.parse(fs.readFileSync(path.join(ROOT_PATH, '.babelrc'), 'utf-8'));

  order.forEach(k => {
    if (!scheme[k]) return;
    file.push(`${k}.bundle.js`);
    promise.push(new Promise(resolve => {
      gulp.src(scheme[k], {cwd: path.join(JAVASCRIPT_PATH, `${k}/`)})
      .pipe(gulpConcat(`${k}.bundle.js`))
      .pipe(gulp.dest(BUNDLE_PATH))
      .on('end', resolve);
    }));
  });

  // concat and babel.
  Promise.all(promise).then(() => {
    gulp.src(file, {cwd: BUNDLE_PATH})
    .pipe(gulpConcat(BUNDLE_FILE))
    .pipe(gulp.dest(BUNDLE_PATH))
    .pipe(babel(BABELRC))
    .pipe(gulpRename(OUTFILE))
    .pipe(gulp.dest(BUNDLE_PATH))
    .on('end', done);
  });
}

module.exports = {css, javascript};
