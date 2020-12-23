/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-21 01:25:08
* @Description         环境变量
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-23 21:44:23
*/

const ENV = Object.create(null);

const handle = {
  set: function (target, property, value) {
    target[property.toLowerCase()] = value;
    return true;
  },
  get: function (target, property) {
    if (property in target) return target[property];
    else return target[property.toLowerCase()];
  }
};

// 获取当前环境的信息
ENV['browser'] = Object.create(null);
ENV['feature'] = new Proxy(Object.create(null), handle);

['Proxy', 'Symbol', 'Worker', 'Promise', 'SVGAnimatedString'].forEach(name => ENV['feature'][name] = name in window);

Object.freeze(ENV);
