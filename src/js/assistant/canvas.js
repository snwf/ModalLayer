/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:12:01
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-27 23:59:29
*/

class CanvasAssistant {
  /**
   * 绘制文字
   *
   * @Author   Wolf
   * @DateTime 2020-09-25T23:41:05+0800
   * @param    {CanvasRenderingContext2D} ctx     画布对象
   * @param    {Object}                   options 相关设置
   */
  static drawText (ctx, options) {
    let _option, measureText;

    _option = {
      'text': null,
      'fill': true,
      'color': 'black',
      'direction': 'ltr',
      'textAlign': 'center',
      'textBaseline': 'middle',
      'font': 'normal 16px Microsoft YaHei, serif',
      'point': [ctx.canvas.width / 2, ctx.canvas.height / 2]
    };

    options = ObjectAssistant.merge(options, _option);

    if (!options['text']) return;

    ctx.save();

    ctx.font = options['font'];
    ctx.fillStyle = options['color'];
    ctx.direction = options['direction'];
    ctx.textAlign = options['textAlign'];
    ctx.textBaseline = options['textBaseline'];

    measureText = ctx.measureText(options['text']);
    options['point'][1] += measureText.actualBoundingBoxDescent / 2;

    if (options['fill'] === true)
      ctx.fillText(options['text'], ...options['point'], options['maxWidth']);
    else
      ctx.strokeText(options['text'], ...options['point'], options['maxWidth']);

    ctx.restore();
  }

  /**
   * 绘制一个圆
   *
   * @Author   Wolf
   * @DateTime 2020-09-25T23:26:29+0800
   * @param    {CanvasRenderingContext2D} ctx     画布对象
   * @param    {Object}                   options 相关设置
   */
  static drawRound (ctx, options) {
    let _option;

    _option = {
      'step': [],
      'radius': 5,
      'fill': true,
      'borderWidth': 5,
      'borderColor': 'black',
      'fillColor': 'transparent',
      'point': [ctx.canvas.width / 2, ctx.canvas.height / 2]
    }

    options = ObjectAssistant.merge(options, _option);

    ctx.save();

    ctx.fillStyle = options['fillColor'];
    ctx.lineWidth = options['borderWidth'];
    ctx.strokeStyle = options['borderColor'];

    ctx.beginPath();
    ctx.setLineDash(options['step']);
    ctx.arc(...options['point'], options['radius'], 0, 2 * window.Math.PI);
    ctx.stroke();

    if (options['fill'] === true) ctx.fill();

    ctx.restore();

  }

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
    let node;

    if (CacheAssistant['has']('downloadNode', CanvasAssistant)) {
      node = CacheAssistant['get']('downloadNode', CanvasAssistant)
    } else {
      node = document.createElement('a');
      CacheAssistant['set']('downloadNode', node, CanvasAssistant);
    }

    node.download = filename;
    node.href = canvas.toDataURL(type);

    node.click();
  }
}    

Object.defineProperty(ModalLayer['_assistant'], 'canvas', {value: CanvasAssistant});