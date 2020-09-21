/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-21 01:25:08
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-21 01:27:53
*/

const ENV = Object.create(null);

// 获取当前环境的信息
ENV['browser'] = Object.create(null);
ENV['feature'] = Object.create(null);

['proxy', 'symbol', 'worker', 'promise'].forEach(function (name) {
  name = name[0].toUpperCase() + name.substring(1);
  ENV['feature'][name] = window[name] ? true : false;
});