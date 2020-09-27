/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-15 17:44:59
* @Description         构建将要使用的js和css
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-25 23:39:24
*/

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const BASE_PATH = path.join(__dirname, '../');
const SOURCE_PATH = path.join(BASE_PATH, '/src');
const BUILD_PATH = path.join(BASE_PATH, '/build');

// js
const CORE_PATH = path.join(SOURCE_PATH, '/js/core');
const LAYER_PATH = path.join(SOURCE_PATH, '/js/layer');
const WORKER_PATH = path.join(SOURCE_PATH, '/js/worker');
const ASSISTANT_PATH = path.join(SOURCE_PATH, '/js/assistant');

// css
const CSS_CHARSET = 'utf-8';
const SKIN_PATH = path.join(SOURCE_PATH, '/css/skin');

// build_file
const BUILD_JS_NAME = 'modallayer.build.js';
const BUILD_CSS_NAME = 'modallayer.build.css';

var code, style;
var buildList, babelrc;
buildList = {
  'js': [
    path.join(CORE_PATH, '/env.js'),
    path.join(CORE_PATH, '/event.js'),
    path.join(CORE_PATH, '/option.js'),
    path.join(CORE_PATH, '/struct.js'),
    path.join(CORE_PATH, '/enum.js'),
    path.join(CORE_PATH, '/core.js'),
    path.join(ASSISTANT_PATH, '/css.js'),
    path.join(ASSISTANT_PATH, '/file.js'),
    path.join(ASSISTANT_PATH, '/cache.js'),
    path.join(ASSISTANT_PATH, '/event.js'),
    path.join(ASSISTANT_PATH, '/worker.js'),
    path.join(ASSISTANT_PATH, '/object.js'),
    path.join(ASSISTANT_PATH, '/number.js'),
    path.join(ASSISTANT_PATH, '/string.js'),
    path.join(ASSISTANT_PATH, '/element.js'),
    path.join(ASSISTANT_PATH, '/formula.js'),
    path.join(ASSISTANT_PATH, '/canvas.js'),
    // path.join(ASSISTANT_PATH, '/performance.js'),
    path.join(ASSISTANT_PATH, '/canvas-filter.js'),
    path.join(ASSISTANT_PATH, '/canvas-animation.js'),
    path.join(LAYER_PATH, '/page.js'),
    path.join(LAYER_PATH, '/alert.js'),
    path.join(LAYER_PATH, '/image.js'),
    path.join(LAYER_PATH, '/prompt.js'),
    path.join(LAYER_PATH, '/confirm.js'),
    path.join(LAYER_PATH, '/loading.js'),
    path.join(LAYER_PATH, '/message.js'),
    path.join(WORKER_PATH, '/canvas-filter.js'),
  ],
  'css': [
    path.join(SOURCE_PATH, '/css/core.css'),
    path.join(SKIN_PATH, '/default.css'),
    path.join(SOURCE_PATH, '/css/animation.css')
  ]
};

for (var i = 0, code = ''; i < buildList.js.length; i++)
  code += fs.readFileSync(buildList.js[i], 'utf-8') + '\n';

for (var i = 0, style = ''; i < buildList.css.length; i++)
  style += fs.readFileSync(buildList.css[i], 'utf-8') + '\n';

babelrc = JSON.parse(fs.readFileSync(path.join(BASE_PATH, '.babelrc'), 'utf-8'));
babel.transform('"use strict";\n\n' + code, babelrc, function(err, result) {
  if (err) console.error(err);
  fs.writeFileSync(path.join(BUILD_PATH, '/js/', BUILD_JS_NAME), result.code);
});

fs.writeFileSync(path.join(BUILD_PATH, '/css/', BUILD_CSS_NAME), '@charset "' + CSS_CHARSET + '";\n\n' + style);
