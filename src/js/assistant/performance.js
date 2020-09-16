/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 21:30:18
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-16 17:25:43
*/

class PerformanceAssistant {
  /**
   * 返回一个函数的性能
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T21:31:51+0800
   * @param    {Function}                 f 函数对象
   * @param    {Array}                    v 函数参数
   * @return   {Array}                    PerformanceMeasure对象数组
   */
  static functionMeasure (f, v) {
    let measure, measureList;
    let markStart, markEnded;

    measure = 'function';
    markStart = 'function-start';
    markEnded = 'function-ended';

    performance.mark(markStart);
    f.apply(null, v);
    performance.mark(markEnded);
    performance.measure(measure, markStart, markEnded);
    measureList = performance.getEntriesByName(measure);
    performance.clearMarks();
    performance.clearMeasures();

    return measureList[0];
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'performance', {value: PerformanceAssistant});