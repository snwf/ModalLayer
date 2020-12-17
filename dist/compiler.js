/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-15 21:31:36
* @Description         压缩/编译构建好的js和css文件
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-18 03:16:18
*/

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const execFile = require('child_process').execFile;
const compiler = require('google-closure-compiler-windows');

const buildJS = path.join(__dirname, '../build/js/modallayer.build.js');
const buildCSS = path.join(__dirname, '../build/css/modallayer.build.css')

const compilerJS = path.join(__dirname, 'js/modallayer.min.js');
const compilerCSS = path.join(__dirname, 'css/modallayer.min.css');

var args = [
  '--js=' + buildJS,
  '--js_output_file=' + compilerJS,
  // '--formatting=PRETTY_PRINT',
  // '--compilation_level=SIMPLE_OPTIMIZATIONS',
  '--compilation_level=ADVANCED_OPTIMIZATIONS',
  '--output_wrapper="!function(window){"use strict";%output%}(window);"'
]

execFile(compiler, args, function (err, stdout, stderr) {
  if (err) console.error(err);
});

var options = {
  level: {
    1: {
      all: true
    },
    2: {
      all: true,
      removeUnusedAtRules: false
    }
  }
};
var output = new CleanCSS(options).minify(fs.readFileSync(buildCSS, 'utf-8'));
fs.writeFileSync(compilerCSS, output.styles);
