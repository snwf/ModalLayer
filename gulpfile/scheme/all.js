/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-12-29 23:53:25
* @Description         Full Package
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-30 23:00:18
*/

'use strict';

const core = ['env.js', 'enum.js', 'struct.js', 'event.js', 'option.js', 'core.js'];

const assistant = ['*.js', '!performance.js'];

const layer = ['*.js'];

const storage = ['*.js'];

const worker = ['*.js'];

const css = ['animation.css', 'core.css', '**/*.css'];

// const less = ['*.less'];

module.exports = {css, core, assistant, layer, storage, worker};
