/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:12:01
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-16 17:27:02
*/

class CanvasAssistant {
  /**
   * 下载图片超链接
   *
   * @type {Element}
   */
  static downloadNode = document.createElement('a');

  /**
   * 下载canvas中展示的图片
   *
   * @Author   wolf
   * @DateTime 2020-07-06T03:26:50+0800
   * @param    {Element}                canvas   画布对象
   * @param    {String}                 filename 图片名称
   * @param    {String}                 type     图片类型
   */
  static download (canvas, filename = 'canvas', type) {
    let link = canvas.toDataURL(type);

    CanvasAssistant.downloadNode = CanvasAssistant.downloadNode ?? document.createElement('a');

    CanvasAssistant.downloadNode.href = link;
    CanvasAssistant.downloadNode.download = filename;

    CanvasAssistant.downloadNode.click();
  }

  /**
   * 绘制虚线圆形
   *
   * @Author   Wolf
   * @DateTime 2020-08-27T01:59:16+0800
   * @param    {Object}                 ctx    CanvasRenderingContext2D对象
   * @param    {Number}                 x      圆心所在x轴位置
   * @param    {Number}                 y      圆心所在y轴距离
   * @param    {Number}                 radius 半径
   * @param    {Number}                 step   每段圆弧之间的间距
   */
  static drawDashRound (ctx, x, y, radius, step = 5) {
    let count = window.Math.floor(360 / step);
    step = 5 / 180 * window.Math.PI * 2;
    for (let b = 0, e = step / 2; e <= 360; b += step, e += step) {
      ctx.beginPath()
      ctx.arc(x, y, radius, b, e);
      ctx.stroke();
    }
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'canvas', {value: CanvasAssistant});