/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:16:13
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-16 17:26:08
*/

class NumberAssistant {
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

    if (window.isNaN(number = window.parseFloat(value)))
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
   * 根据最大尺寸获取合法尺寸
   * 该方法不会改变图片原有比例, 会根据比例进行缩放.
   *
   * @Author   wolf
   * @DateTime 2020-07-06T01:40:25+0800
   * @param    {Array}                 nowSize 当前尺寸[width, height]
   * @param    {Array}                 maxSize 最大尺寸[width, height]
   * @return   {Array}                         计算后的尺寸
   */
  static getLegalSize (nowSize, maxSize) {
    let newSize;
    let priority, notPriority;
    let aspectRatio, maxAspectRatio;

    if (!nowSize || !maxSize || (nowSize[0] <= maxSize[0] && nowSize[1] <= maxSize[1]))
      return nowSize;

    newSize = [];
    aspectRatio = nowSize[0] / nowSize[1];
    maxAspectRatio = maxSize[0] / maxSize[1];

    if (maxAspectRatio >= 1)
      priority = 1;
    else
      priority = 0;
    notPriority = Number(!priority);

    if (nowSize[priority] > maxSize[priority]) {
      newSize[priority] = maxSize[priority];
      newSize[notPriority] = priority === 0 ? (maxSize[priority] / aspectRatio) : (maxSize[priority] * aspectRatio);
    } else {
      newSize = nowSize;
    }

    return newSize;
  }

  /**
   * 判断一个数是否在区间内
   *
   * @Author   wolf
   * @DateTime 2020-08-08T00:26:25+0800
   * @param    {Number}                 number        数字
   * @param    {String}                 interregional 区间(小括号不包含, 中括号包含)
   * @return   {Boolean}                               
   */
  static intervalJudgment (number, interregional) {
    let expression;
    let legalSymbol, legalSymbolMap, leftSymbol, rightSymbol;

    interregional = interregional.replace(/ /g, '').toLowerCase();

    legalSymbolMap = {
      '(': '>',
      ')': '<',
      '[': '>=',
      ']': '<='
    };
    leftSymbol = interregional[0];
    rightSymbol = interregional.slice(-1);
    legalSymbol = Object.keys(legalSymbolMap);
    interregional = interregional.slice(1, -1).split(',');
    interregional[0] = Number(interregional[0]);
    interregional[1] = Number(interregional[1]);

    if (!legalSymbol.includes(leftSymbol) && !legalSymbol.includes(rightSymbol))
      return false;

    expression = number + legalSymbolMap[leftSymbol] + interregional[0] + '&&' + number + legalSymbolMap[rightSymbol] + interregional[1];

    return new Function('"use strict"; return ' + expression)();
  }

  /**
   * 判断一个点是否在矩形内
   *
   * @Author   wolf
   * @DateTime 2020-08-10T16:57:20+0800
   * @param    {Array}   point 点
   * @param    {Array}   rect  表示一个矩阵的数组(两个点, 从左上角到右下角)
   * @return   {Boolean}
   */
  static insideRect (point, rect) {
    let rectLT, rectRB;

    rectLT = rect[0];
    rectRB = rect[1];

    if (
      (point[0] < rectLT[0] || point[1] < rectLT[1]) || 
      (point[0] > rectRB[0] || point[1] > rectRB[1])
    )
      return false;
    
    return true;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'number', {value: NumberAssistant});