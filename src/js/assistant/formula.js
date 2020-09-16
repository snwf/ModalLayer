/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-05 02:02:19
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-17 02:56:49
*/

class FormulaAssistant {
  static gaussian = {
    'sigma': 0,
    'cache': {},
    /**
     * 设置西格玛值
     * 保存公式中的常量, 加快速度.
     *
     * @Author   wolf
     *
     * @DateTime 2020-07-24T22:38:58+0800
     *
     * @param    {Number}                 sigma 西格玛
     */
    'setSigma': function (sigma) {
      if (this['sigma'] != sigma) {
        this['sigma'] = sigma;
        this['cache']['sigmaSquare'] = sigma * sigma;
        this['cache']['const'] = [
          1 / (sigma * window.Math.sqrt(2 * window.Math.PI)),
          (1 / (2 * window.Math.PI * this['cache']['sigmaSquare']))
        ]
      }
    },
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
    'getDistribution': function (position, sigma, dimension = 2) {
      let exp;
      if (sigma != this['sigma'])
        this['setSigma'](sigma);

      switch (dimension) {
        case 1:
          exp = window.Math.exp(-(position * position) / (2 * this['cache']['sigmaSquare']));
          break;
        case 2:
          exp = window.Math.exp(-(window.Math.pow(position[0], 2) + window.Math.pow(position[1], 2)) / (2 * this['cache']['sigmaSquare']));
        default:
          break;
      }

      return this['cache']['const'][dimension - 1] * exp;
    }
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'formula', {value: FormulaAssistant});