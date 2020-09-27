/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-25 22:27:56
* @Description         缓存助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-26 02:44:50
*/

class CacheAssistant {
  /**
   * 缓存符号
   *
   * @type {Symbol}
   */
  static _symbol = new Map;

  /**
   * 查询缓存是否存在
   *
   * @Author   Wolf
   * @DateTime 2020-09-25T23:21:16+0800
   * @param    {Mixed}                  k 缓存名称
   * @param    {Object}                 o 专属对象
   * @return   {Boolean}                  
   */
  static has (k, o = null) {
    let symbol;

    o = o ?? CacheAssistant;
    symbol = CacheAssistant['_symbol'].get(o);

    return symbol ? o[symbol].has(k) : false;
  }

  /**
   * 获取缓存
   *
   * @Author   Wolf
   * @DateTime 2020-09-25T23:01:44+0800
   * @param    {Mixed}                  k 缓存名称
   * @param    {Object}                 o 专属对象
   * @return   {Mixed}                    缓存内容
   */
  static get (k, o = null) {
    let symbol;

    o = o ?? CacheAssistant;
    symbol = CacheAssistant['_symbol'].get(o);

    return symbol ? o[symbol].get(k) : undefined;
  }

  /**
   * 设置缓存
   *
   * @Author   Wolf
   * @DateTime 2020-09-25T22:30:41+0800
   * @param    {Mixed}                  k 缓存名称
   * @param    {Mixed}                  v 缓存内容
   * @param    {Object}                 o 专属对象
   */
  static set (k, v, o = null) {
    let symbol;

    o = o ?? CacheAssistant;

    if (!CacheAssistant['_symbol'].has(o)) {
      symbol = Symbol('cache');
      CacheAssistant['_symbol'].set(o, symbol)
    } else {
      symbol = CacheAssistant['_symbol'].get(o);
    }

    if (!o.hasOwnProperty(symbol))
      Object.defineProperty(o, symbol, {
        'value': new Map,
        'writable': false,
        'enumerable': false,
        'configurable': false
      });

    o[symbol].set(k, v);
  }

  /**
   * 删除缓存
   *
   * @Author   Wolf
   * @DateTime 2020-09-25T23:10:56+0800
   * @param    {Mixed}                  k 缓存名称, 如果为空则删除当前对象的所有缓存
   * @param    {Object}                 o 专属对象
   */
  static delete (k = null, o = null) {
    let _o, symbol;

    o = o ?? CacheAssistant;
    symbol = CacheAssistant['_symbol'].get(o);

    if (k) {
      o[symbol].delete(k);
    } else {
      o[symbol].forEach((v, k) => {
        o[symbol].delete(k);
      });
    }
  }

  /**
   * 清除所有缓存
   *
   * @Author   Wolf
   * @DateTime 2020-09-25T23:12:31+0800
   */
  static clear () {
    CacheAssistant['_symbol'].forEach((v, k) => {
      CacheAssistant['delete'](null, k);
    });
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'cache', {value: CacheAssistant});