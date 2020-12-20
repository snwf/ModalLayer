/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 21:30:18
* @Description         性能助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-20 02:13:56
*/

class PerformanceAssistant {
  /**
   * 返回一个函数的性能
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T21:31:51+0800
   * @param    {Function}                 f 函数对象
   * @param    {Array}                    v 函数参数
   * @param    {Number}                   c 执行次数
   * @param    {Mixed}                    t this对象
   * @return   {Array}                    PerformanceMeasure对象数组
   */
  static functionMeasure (f, v, c = 1, t = null) {
    let measure, measureList;
    let markStart, markEnded;

    measureList = [];
    measure = 'function';
    markStart = 'function-start';
    markEnded = 'function-ended';

    for (let i = 0; i < c; i++) {
      performance.mark(markStart);
      f.apply(t, v);
      performance.mark(markEnded);
      performance.measure(measure, markStart, markEnded);
      measureList.push(performance.getEntriesByName(measure)[0]);
      performance.clearMarks();
      performance.clearMeasures();
    }

    return measureList;
  }

  /**
   * 获取性能分析数据
   *
   * @Author   Wolf
   * @DateTime 2020-09-22T02:56:35+0800
   * @param    {Array}                  list PerformanceMeasure 对象数组
   * @return   {Array}                       各项数据对象数组
   */
  static getAnalysis (list) {
    let analysis;
    let totalTime;


    analysis = Object.create(null);
    analysis['measures'] = list;
    analysis['duration'] = [];
    analysis['totalTime'] = 0;

    for (let i = 0; i < list.length; i++) {
      analysis['duration'][i] = list[i].duration;
      analysis['totalTime'] = NumberAssistant['add'](analysis['totalTime'], list[i].duration);
    }

    analysis['modeTime'] = NumberAssistant['mode'](analysis['duration']);
    analysis['medianTime'] = NumberAssistant['median'](analysis['duration']);
    analysis['avgTime'] = NumberAssistant['divide'](analysis['totalTime'], list.length);

    return analysis;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'performance', {value: PerformanceAssistant});
