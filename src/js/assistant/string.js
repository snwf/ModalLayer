/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:17:31
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-22 04:23:09
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
   * 注意: 该方法的从头部开始查找.
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T00:43:18+0800
   * @param    {Mixed}                  str     若传入的是一个数组则返回也是一个数组
   * @param    {Mixed}                  search  检索值, 可以为数组
   * @param    {Mixed}                  replace 替换值, 可以为数组, 若为数组则长度必须与search长度一致
   * @param    {Number}                 count   替换次数, 如果为0则不限制
   * @return   {Mixed}                         新的字符串
   */
  static replace (str, search, replace, count = 0) {
    let nStr, times;
    let offset, strOffset, searchOffset;
    let dealStr, dealSearch, dealReplace;
    let strArray, searchArray, replaceArray;

    strArray = Array.isArray(str);
    searchArray = Array.isArray(search);
    replaceArray = Array.isArray(replace);

    if (searchArray && replaceArray && search.length !== replace.length)
      throw Error('The number of search strings does not match the number of replacement strings.');

    nStr = [];
    str = strArray ? str : [str];
    search = searchArray ? search : [search];
    replace = replaceArray ? replace : [replace];
    times = offset = strOffset = searchOffset = 0;

    do {
      let start, ended;

      dealSearch = search[searchOffset];
      dealReplace = replace[replaceArray ? searchOffset : 0];
      dealStr = searchOffset === 0 ? str[strOffset] : nStr[strOffset];

      start = offset;
      ended = dealStr.indexOf(dealSearch, offset);

      if (ended === -1) {
        if (searchArray && searchOffset < search.length - 1) {
          offset = 0;
          searchOffset++;
          continue;
        } else if (strArray && strOffset < str.length - 1) {
          strOffset++;
          offset = searchOffset = 0;
          continue;
        }
        offset = false;
      } else {
        offset = ended + dealSearch.length;
        nStr[strOffset] = dealStr.substring(start, ended) + dealReplace + dealStr.substring(offset);
      }

    } while (offset !== false || (count !== 0 && times < count));

    return strArray ? nStr : nStr.shift();
  }

  /**
   * 将16进制颜色字符串转换为十进制颜色字符串或相反
   *
   * @Author   Wolf
   * @DateTime 2020-08-27T00:31:34+0800
   * @param    {String} str 颜色字符串
   * @return   {String}     转换之后的颜色字符串
   */
  static colorConvert (str) {
    let hex;
    let color, error;

    str = str.toLowerCase();
    error = new Error('Not a legal color.');

    // 16进制转十进制
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