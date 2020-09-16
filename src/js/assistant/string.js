/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:17:31
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-16 17:25:12
*/

class StringAssistant {
  /**
   * 在str中搜索search并替换为replace
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T00:43:18+0800
   * @param    {String}                 str    原字符串
   * @param    {Mixed}                  search 检索值, 可以为数组
   * @param    {Mixed}                 replace 替换值, 可以为数组, 若为数组则长度必须与search长度一致
   * @return   {String}                        新的字符串
   */
  static str_replace (str, search, replace) {
    // TODO 
    // let nStr;
    // let isAry;

    // isAry = [Array.isArray(search),  Array.isArray(replace)];

    // if (str.length <= 0) return str;
    // if (isAry[0] && isAry[1] && search.length != replace.length) return str;

    
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