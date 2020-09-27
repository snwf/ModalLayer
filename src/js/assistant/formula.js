/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-05 02:02:19
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-28 02:33:21
*/

class FormulaAssistant {
  /**
   * 高斯分布
   * 公式如下(化简后)
   * 一维: f(x) = (1 / (σ * (2 * π)^0.5)) * e^(-x^2 / (2 * σ^2))
   * 二维: f(x, y) = (1 / (2 * π * σ^2)) * e^(-(x^2 + y^2) / (2 * σ^2))
   * @Author   wolf
   *
   * @DateTime 2020-07-07T14:44:15+0800
   *
   * @param    {Mixed}                  position  相对于原点的位置
   * @param    {Number}                 sigma     西格玛
   * @param    {Number}                 dimension 维度
   *
   * @return   {Number}                           代入公式计算后的值
   */
  static getDistribution (position, sigma, dimension = 2) {
    let exp, cache, _cache;

    if (!(_cache = CacheAssistant['get']('gaussian', FormulaAssistant))) {
      _cache = new Map;
      CacheAssistant['set']('gaussian', _cache, FormulaAssistant);
    }

    if (!(cache = _cache.get(sigma))) {
      cache = Object.create(null);
      cache['square'] = sigma * sigma;
      cache['multiplier'] = [
        1 / (sigma * window.Math.sqrt(2 * window.Math.PI)),
        1 / (2 * window.Math.PI * cache['square'])
      ];
      _cache.set(sigma, cache);
    };

    switch (dimension) {
      case 1:
        exp = window.Math.exp(-(position * position) / (2 * cache['square']));
        break;
      case 2:
        exp = window.Math.exp(-(window.Math.pow(position[0], 2) + window.Math.pow(position[1], 2)) / (2 * cache['square']));
        break;
      default:
        break;
    }

    return cache['multiplier'][dimension - 1] * exp;
  }

}

Object.defineProperty(ModalLayer['_assistant'], 'formula', {value: FormulaAssistant});