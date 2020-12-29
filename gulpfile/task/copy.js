/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-12-30 04:19:02
* @Description         Copy File
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-31 00:18:41
*/

'use strict';

const gulp = require('gulp');
const path = require('path');

const BASE_PATH = path.join(__dirname, '../');
const ROOT_PATH = path.join(__dirname, '../../');
const BUNDLE_PATH = path.join(BASE_PATH, 'temporary/bundle/');
const COMPILE_PATH = path.join(BASE_PATH, 'temporary/compile/');

function copy (options) {
  let promise = [];

  // build
  promise.push(new Promise(resolve => {
    gulp.src(['modallayer.bundle.js', 'modallayer.bundle.css'], {cwd: BUNDLE_PATH})
    .pipe(gulp.dest(path.join(ROOT_PATH, 'bundle/')))
    .on('end', resolve);
  }));

  // compile
  promise.push(new Promise(resolve => {
    gulp.src(['*.min.js', '*.min.css'], {cwd: COMPILE_PATH})
    .pipe(gulp.dest(path.join(ROOT_PATH, 'dist/')))
    .on('end', resolve);
  }));

  return Promise.all(promise);
}

module.exports = {copy};
