/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:17:31
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-24 03:26:37
*/

class StringAssistant {
  /**
   * base64编码
   * 解决js原生base64无法编码中文
   *
   * @Author   Wolf
   * @DateTime 2020-09-22T04:20:38+0800
   * @param    {String}                 str 字符串
   * @return   {String}                     编码后的字符串
   */
  static base64Encode (str) {
    return window.btoa(window.unescape(window.encodeURIComponent(str)));
  }

  /**
   * base64解码
   * 解决js原生base64无法解码中文
   *
   * @Author   Wolf
   * @DateTime 2020-09-22T04:20:38+0800
   * @param    {String}                 str 字符串
   * @return   {String}                     解码后的字符串
   */
  static base64Decode (str) {
    return window.decodeURIComponent(window.escape(window.atob(str)));
  }

  /**
   * 将字符串首字母转换为大写并返回
   *
   * @Author    wolf
   * @Datetime  2020-10-13T17:32:42+0800
   * @param     {String}                  str  带转换的字符串
   * @return    {String}                       转换后的字符串
   */
  static ucfirst (str) {
    return str[0].toUpperCase() + str.substring(1);
  }

  /**
   * 在str中搜索search并替换为replace
   * 小数据情况下直接使用javascript原生replace性能会略微好一点儿.
   * 注意:
   *   检索目标是有顺序的.
   *   该方法的从头部开始查找
   *
   * @Author    wolf
   * @Datetime  2020-10-24T02:45:00+0800
   * @param    {Mixed}                  str     若传入的是一个数组则返回也是一个数组
   * @param    {Mixed}                  search  检索值, 可以为数组
   * @param    {Mixed}                  replace 替换值, 可以为数组, 若为数组则长度必须与search长度一致
   * @param    {Number}                 count   替换次数, 如果为0则不限制(多检索条件请务必注意, 并不是所有条件都替换一次)
   * @return   {Mixed}                          新的字符串
   */
  static replace (str, search, replace, count = 0) {
    let findIndex;
    let returnArray;
    let start, ended, times, rTime, offset;
    let nStr, dealStr, dealSearch, dealReplace;

    search = Array.isArray(search) ? search : [search];
    replace = Array.isArray(replace) ? replace : [replace];
    Array.isArray(str) ? (returnArray = true) : (str = [str], returnArray = false);

    if (replace.length > 1 && (search.length !== replace.length))
      throw Error('The number of search strings does not match the number of replacement strings.');

    offset = {
      start: 0,
      ended: 0,
      search: 0,
      replace: 0,
    };

    for (nStr = [], offset.str = 0; offset.str < str.length; offset.str++) {
      nStr[offset.str] = '';
      dealStr = str[offset.str];
      rTime = offset.start = offset.ended = offset.search = offset.replace = 0;
      for (; offset.search < search.length; offset.search++, offset.replace += (replace.length > 1) ? 1 : 0) {
        findIndex = [];
        dealSearch = search[offset.search];
        dealReplace = replace[offset.replace];
        for (let start = 0; start >= 0 && (count === 0 || (count > 0 && rTime < count));) {
          start = dealStr.indexOf(dealSearch, (start === 0 && rTime === 0) ? 0 : start + 1);
          rTime += start >= 0 ? 1 : 0;
          findIndex.push(start);
        }

        if (findIndex[findIndex.length - 1] !== -1)
          findIndex.push(-1);

        for (let i = 0; findIndex.length > 0; i++) {
          offset.ended = findIndex.shift();
          nStr[offset.str] += offset.ended >= 0 ?
                              dealStr.substring(offset.start, offset.ended) + dealReplace :
                              dealStr.substring(offset.start);
          offset.start = offset.ended + dealSearch.length;
        }
        offset.start = offset.ended = 0;
        dealStr = nStr[offset.str];
        nStr[offset.str] = '';
      }
      nStr[offset.str] = dealStr;
    }

    return returnArray ? nStr : nStr.shift();
  }

  /**
   * 将16进制颜色字符串转换为十进制颜色字符串或相反
   *
   * @Author    wolf
   * @Datetime  2020-10-24T02:49:04+0800
   * @param     {String}                  str  颜色字符串
   * @return    {String}                       转换之后的颜色字符串
   */
  static colorConvert (str) {
    let hex;
    let color, error;

    str = str.toLowerCase();
    error = new Error('Not a legal color.');

    // 十六进制转十进制
    if (str.indexOf('#') === 0) {
      color = 'rgba(';
      str = str.substring(1);
      if (str.length === 3) {
        str = str.split('').reduce(function (s, c) {
          return s + c + c;
        }, '');
      }

      if (str.length === 6) {
        for (let i = 0; i < 3; i++)
          color += Number('0x' + str[i * 2] + str[i * 2 + 1]) + ', ';
      } else {
        throw error;
      }

      color += '255)';
    // 十进制转十六进制
    } else if (str.indexOf('rgb') === 0) {
      color = '#';
      str = str.replace(/(rgb\(|rgba\(|\)| )/g, '').split(',');
      for (let i = 0; i < 3; i++) {
        hex = Number(str[i]).toString(16);
        color += hex.length === 1 ? (hex + hex) : hex;
      }
    } else {
      throw error;
    }

    return color;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'string', {value: StringAssistant});