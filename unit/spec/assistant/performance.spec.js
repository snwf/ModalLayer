/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-24 04:31:02
* @Description         性能助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-24 04:47:38
*/

'use strict';

describe('PerformanceAssistant —— 性能助手', function () {

  it('functionMeasure —— 方法性能测试', function () {
    let count = 1000;
    let per = PerformanceAssistant.functionMeasure(String.prototype.replace, [/(rgb\(|rgba\(|\)| )/g, ''], count, 'rgba(255, 255, 255, 1)');
    expect(per).toBeInstanceOf(Array);
    expect(per.length).toBe(count);
    per.forEach(function(p) {
      expect(p).toBeInstanceOf(PerformanceMeasure);
    });
  });

  it('getAnalysis —— 获取性能分析', function () {
    let count = 1000;
    let per = PerformanceAssistant.functionMeasure(String.prototype.replace, [/(rgb\(|rgba\(|\)| )/g, ''], count, 'rgba(255, 255, 255, 1)');
    let analysis = PerformanceAssistant.getAnalysis(per);
    // 耗时众数
    expect(analysis.modeTime).toBeDefined();
    expect(analysis.modeTime).toBeInstanceOf(Array);
    analysis.modeTime.forEach(function (n) {
      expect(n).toBeInstanceOf(Number);
    });
    // 耗时中位数
    expect(analysis.medianTime).toBeDefined();
    expect(analysis.medianTime).toBeInstanceOf(Number);
    // 平均耗时
    expect(analysis.avgTime).toBeDefined();
    expect(analysis.avgTime).toBeInstanceOf(Number);
    // 总耗时
    expect(analysis.totalTime).toBeDefined();
    expect(analysis.totalTime).toBeInstanceOf(Number);
  });

});