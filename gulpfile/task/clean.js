/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-12-30 00:12:42
* @Description         Clean
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-30 06:42:47
*/

'use strict';

const del = require('del');
const path = require('path');

function clean (root, done) {
  return del([path.join(root, '/*')]);
}

module.exports = {clean};
