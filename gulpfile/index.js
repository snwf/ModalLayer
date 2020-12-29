/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-12-29 23:26:42
* @Description         gulp process
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-31 00:56:34
*/

'use strict';

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const minimist = require('minimist');

const BASE_PATH = path.resolve(__dirname, './');
const TASK_PATH = path.join(BASE_PATH, '/task');
const SCHEME_PATH = path.join(BASE_PATH, '/scheme');
const TEMP_PATH = path.join(BASE_PATH, 'temporary/');

var knownOptions = {
  string: 'env',
  default: {
    scheme: 'all',
    copy_file: false,
    compile_online: false,
    env: process.env.NODE_ENV || 'development'
  }
};

if (!fs.existsSync(TEMP_PATH)) fs.mkdirSync(TEMP_PATH);

const copy = require(path.join(TASK_PATH, 'copy.js'));
const clean = require(path.join(TASK_PATH, 'clean.js'));
const bundle = require(path.join(TASK_PATH, 'bundle.js'));
const compile = require(path.join(TASK_PATH, 'compile.js'));
const options = minimist(process.argv.slice(2), knownOptions);
const scheme = require(path.join(SCHEME_PATH, options.scheme + '.js'));

clean.clean = clean.clean.bind(undefined, TEMP_PATH);
clean.clean.displayName = 'clean';

copy.copy = copy.copy.bind(undefined, options);
copy.copy.displayName = 'copy file';

Object.keys(bundle).forEach(k => {
  bundle[k] = bundle[k].bind(undefined, scheme)
  bundle[k].displayName = `bundle ${k}`;
});
Object.keys(compile).forEach(k => {
  compile[k] = compile[k].bind(undefined, scheme, options)
  compile[k].displayName = `compile ${k}`;
});

let defaultTask = [clean.clean, gulp.parallel(Object.values(bundle))];
if (options.env === 'production') defaultTask.push(gulp.parallel(Object.values(compile)));
if (options.copy_file) defaultTask.push(copy.copy);
gulp.task('default', gulp.series(defaultTask));

gulp.task('clean', clean.clean);
