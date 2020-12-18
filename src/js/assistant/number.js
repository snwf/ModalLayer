/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:16:13
* @Description         数字助手
*                      兼容的运算无法处理过大的数字
*                      如果需要处理大数字请引入mathjs
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-18 20:24:18
*/
class NumberAssistant {
  _value;

  constructor (n) {
    this._value = n;
  }

  add (n) {
    this._value = NumberAssistant['add'](this._value, n);
    return this;
  }

  subtract (n) {
    this._value = NumberAssistant['subtract'](this._value, n);
    return this;
  }

  multiply (n) {
    this._value = NumberAssistant['multiply'](this._value, n);
    return this;
  }

  divide (n) {
    this._value = NumberAssistant['divide'](this._value, n);
    return this;
  }

  floor () {
    this._value = NumberAssistant['floor'](this._value);
    return this;
  }

  /**
   * 获取结果
   *
   * @Author    wolf
   * @Datetime  2020-12-18T19:45:18+0800
   * @return    {Number}
   */
  done () {
    return this._value;
  }

  /**
   * 获取化整乘数
   *
   * @Author    wolf
   * @Datetime  2020-12-18T20:08:56+0800
   * @param    {Number}                 n1 数1
   * @param    {Number}                 n2 数2
   * @return   {Number}                    10的x次幂
   */
  static carry (n1, n2) {
    let s1, s2;

    s1 = n1.toString();
    s2 = n2.toString();

    return window.Math.pow(10, window.Math.max(s1.substring(s1.indexOf('.') + 1).length, s2.substring(s2.indexOf('.') + 1).length));
  }

  /**
   * 链式调用
   *
   * @Author    wolf
   * @Datetime  2020-12-18T19:42:16+0800
   * @param     {Number}                  n  数字
   * @return    {NumberAssistant}            NumberAssistant实例
   */
  static chain (n) {
    if (Number.isFinite(n))
      return new NumberAssistant(n);
    else
      throw TypeError('must a number.');
  }

  /**
   * 加法
   * 规避js处理浮点数不精确的问题.
   *
   * @Author    wolf
   * @Datetime  2020-12-18T19:52:11+0800
   * @param    {Number}                 n1 数1
   * @param    {Number}                 n2 数2
   * @return   {Number}                    和
   */
  static add (n1, n2) {
    let carry = NumberAssistant['carry'](n1, n2);

    return (n1 * carry + n2 * carry) / carry;
  }

  /**
   * 减法
   *
   * @Author    wolf
   * @Datetime  2020-12-18T19:51:39+0800
   * @param    {Number}                 n1 数1
   * @param    {Number}                 n2 数2
   * @return   {Number}                    差
   */
  static subtract (n1, n2) {
    let carry = NumberAssistant['carry'](n1, n2);

    return (n1 * carry - n2 * carry) / carry;
  }

  /**
   * 乘法
   * 规避js处理浮点数不精确的问题.
   *
   * @Author   Wolf
   * @DateTime 2020-09-22T03:07:57+0800
   * @param    {Number}                 n1 数1
   * @param    {Number}                 n2 数2
   * @return   {Number}                    积
   */
  static multiply (n1, n2) {
    let carry = NumberAssistant['carry'](n1, n2);

    return ((n1 * carry) * (n2 * carry)) / window.Math.pow(carry, 2);
  }

  /**
   * 除法
   * 规避js处理浮点数不精确的问题
   *
   * @Author   Wolf
   * @DateTime 2020-09-22T03:10:51+0800
   * @param    {Number}                 dividend 被除数
   * @param    {Number}                 divisor  除数
   * @return   {Number}                          商
   */
  static divide (dividend, divisor) {
    let carry = NumberAssistant['carry'](dividend, divisor);

    return (dividend * carry) / (divisor * carry);
  }

  /**
   * 舍去化整
   *
   * @Author    wolf
   * @Datetime  2020-12-18T20:23:15+0800
   * @param     {Number}                  num  数字
   * @return    {Number}                       整数
   */
  static floor (num) {
    return window.Math.floor(num);
  }

  /**
   * 得到中位数
   *
   * @Author   Wolf
   * @DateTime 2020-09-22T04:18:44+0800
   * @param    {Array}                  num 数组
   * @return   {Number}                     中位数
   */
  static median (num) {
    let median;
    let ascAry, medianIdx;

    ascAry = num.map(n => n).sort((a, b) => a - b);
    if (ascAry.length % 2 === 1) {
      medianIdx = window.parseInt(ascAry.length / 2);
      median = ascAry[medianIdx];
    } else {
      medianIdx = window.parseInt(ascAry.length / 2);
      median = (ascAry[medianIdx - 1] + ascAry[medianIdx]) / 2;
    }

    return median;
  }

  /**
   * 得到众数
   *
   * @Author   Wolf
   * @DateTime 2020-09-22T04:36:38+0800
   * @param    {Array}                  num 数组
   * @return   {Array}                      众数数组
   */
  static mode (num) {
    let mode;
    let max, findTime, findTimes;

    max = 0;
    mode = [];
    findTimes = new Map;

    num.forEach(n => {
      findTime = findTimes.get(n) ?? 0;
      findTimes.set(n, findTime + 1);
    });

    max = window.Math.max(...findTimes.values());

    findTimes.forEach((t, n) => {
      if (t === max)
        mode.push(n);
    });

    return mode;
  }

  /**
   * 判断是否为浮点数
   * 百分数、千分数也属于浮点数.
   *
   * @Author   Wolf
   * @DateTime 2020-09-06T23:24:41+0800
   * @param    {Mixed}                  value
   * @return   {Boolean}
   */
  static isFloat (value) {
    let number;

    value += '';

    if (!Number.isFinite(number = window.parseFloat(value)))
      return false;

    if (window.Math.floor(number) == number)
      return false;

    if (value.endsWith('%')) {
      if (number > 100)
        return false;
    } else if (value.endsWith('‰')) {
      if (number > 1000)
        return false;
    } else
      return false;

    return true;
  }

  /**
   * 根据最小尺寸获取合法尺寸
   * 该方法不会改变图片原有比例, 会根据比例进行缩放.
   *
   * @Author   Wolf
   * @DateTime 2020-09-23T02:32:17+0800
   * @param    {Array}                 nowSize 当前尺寸[width, height]
   * @param    {Array}                 minSize 最小尺寸[width, height]
   * @return   {Array}                         计算后的尺寸
   */
  static getMinLegalSize (nowSize, minSize) {
    let newSize;
    let priority, notPriority;
    let aspectRatio, minAspectRatio;

    newSize = [];
    aspectRatio = nowSize[0] / nowSize[1];
    minAspectRatio = minSize[0] / minSize[1];

    priority = aspectRatio < 1 ? 0 : 1;
    notPriority = Number(!priority);

    if (nowSize[priority] < minSize[priority]) {
      newSize[priority] = minSize[priority];
      newSize[notPriority] = priority === 0 ? (minSize[priority] / aspectRatio) : (minSize[priority] * aspectRatio);
    } else {
      newSize = nowSize;
    }

    return newSize;
  }

  /**
   * 根据最大尺寸获取合法尺寸
   * 该方法不会改变图片原有比例, 会根据比例进行缩放.
   *
   * @Author   wolf
   * @DateTime 2020-07-06T01:40:25+0800
   * @param    {Array}                 nowSize 当前尺寸[width, height]
   * @param    {Array}                 maxSize 最大尺寸[width, height]
   * @return   {Array}                         计算后的尺寸
   */
  static getMaxLegalSize (nowSize, maxSize) {
    let newSize;
    let priority, notPriority;
    let aspectRatio, maxAspectRatio;

    if (!nowSize || !maxSize || (nowSize[0] <= maxSize[0] && nowSize[1] <= maxSize[1]))
      return nowSize;

    newSize = [];
    aspectRatio = nowSize[0] / nowSize[1];
    maxAspectRatio = maxSize[0] / maxSize[1];

    priority = maxAspectRatio >= 1 ? 1 : 0;
    notPriority = Number(!priority);

    if (nowSize[priority] > maxSize[priority]) {
      newSize[priority] = maxSize[priority];
      newSize[notPriority] = priority === 0 ? (maxSize[priority] / aspectRatio) : (maxSize[priority] * aspectRatio);
    } else {
      newSize = nowSize;
    }

    return newSize;
  }
}

window['math'] && (NumberAssistant = Object.assign(NumberAssistant, window['math']));

Object.defineProperty(ModalLayer['_assistant'], 'number', {value: NumberAssistant});
