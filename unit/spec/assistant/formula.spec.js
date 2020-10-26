/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-27 00:26:40
* @Description         公式助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-27 01:17:06
*/

'use strict';

describe('FormulaAssistant —— 公式助手', function () {
  it('getDistribution —— 计算高斯分布值', function () {
    let gaussianDist = [
      [[0, 2, 1], 0.19947114020071635],
      [[-2, 2, 1], 0.12098536225957168],
      [[2, 2, 1], 0.12098536225957168],
      [[[0, 0], 2], 0.039788735772973836],
      [[[-5, 2], 2], 0.0010603338925045092],
      [[[5, 2], 2, 2], 0.0010603338925045092],
      [[[5, 2], 2, 2], 0.0010603338925045092],
      [[[-2, -2], 2, 2], 0.014637457881079792],
      [[[-7, 7], 10, 2], 0.0009750251890301378],
    ];
    for (let i = 0; i < gaussianDist.length; i++)
      expect(FormulaAssistant.getDistribution(...gaussianDist[i][0])).toBe(gaussianDist[i][1]);
  });
});
