/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:12:01
* @Description         画布助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-27 01:18:18
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
   * 绘制矩形
   *
   * @Author    wolf
   * @Datetime  2020-10-13T17:03:01+0800
   * @param     {CanvasRenderingContext2D} ctx       画布对象
   * @param     {Number}                   x         起始x轴
   * @param     {Number}                   y         起始y轴
   * @param     {Number}                   w         矩形宽度
   * @param     {Number}                   h         矩形高度
   * @param     {Number}                   size      线段粗细
   * @param     {String}                   color     填充/描边颜色
   * @param     {Array}                    lineDash  是否使用虚线描边, 传入一个数组, 默认为false
   */
  static drawRect (ctx, x = 0, y = 0, w, h, size = 1, color = 'white', lineDash = false) {
    ctx.save();
    ctx.lineWidth = size;
    if (Array.isArray(lineDash)){
      ctx.strokeStyle = color;
      ctx.setLineDash(lineDash);
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
  }

  /**
   * 绘制截取边框边角L形
   *
   * @Author    wolf
   * @Datetime  2020-10-13T00:54:03+0800
   * @param     {CanvasRenderingContext2D} ctx       画布对象
   * @param     {Number}                   x         起始x轴
   * @param     {Number}                   y         起始y轴
   * @param     {Number}                   w         矩形宽度
   * @param     {Number}                   h         矩形高度
   * @param     {Number}                   lW        边角L宽度
   * @param     {Number}                   lH        边角L高度
   * @param     {String}                   color     边角矩形填充颜色
   * @param     {Array}                    lineDash  是否使用虚线描边, 传入一个数组, 默认为false
   */
  static drawLBorder (ctx, x = 0, y = 0, w, h, lW = 25, lH = 5, color = '#0eb0f1', lineDash = false) {
    ctx.save();
    if (Array.isArray(lineDash)) {
      ctx.strokeStyle = color;
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, lW, lH);
      ctx.fillRect(x, y, lH, lW);

      ctx.fillRect(x + w, y, -lW, lH);
      ctx.fillRect(x + w, y, -lH, lW);

      ctx.fillRect(x + w, y + h, -lW, -lH);
      ctx.fillRect(x + w, y + h, -lH, -lW);

      ctx.fillRect(x, y + h, lW, -lH);
      ctx.fillRect(x, y + h, lH, -lW);
    }
    ctx.restore();
  }

  /**
   * 绘制截取网格
   *
   * @Author    wolf
   * @Datetime  2020-10-13T01:01:44+0800
   * @param     {CanvasRenderingContext2D} ctx      画布对象
   * @param     {Number}                   x        起始x轴
   * @param     {Number}                   y        起始y轴
   * @param     {Number}                   w        网格宽度
   * @param     {Number}                   h        网格高度
   * @param     {Number}                   size     网格线条粗细
   * @param     {String}                   color    网格填充颜色
   * @param     {String}                   cate     网格分类[quarter]
   * @param     {Array}                    lineDash 是否使用虚线描边, 传入一个数组, 默认为false
   */
  static drawGrid (ctx, x = 0, y = 0, w, h, size = 1, color = 'black', cate = 'quarter', lineDash = false) {
    if (CanvasAssistant['drawGrid' + StringAssistant['ucfirst'](cate)] instanceof Function)
      CanvasAssistant['drawGrid' + StringAssistant['ucfirst'](cate)](ctx,x, y, w ?? ctx.canvas.width, h ?? ctx.canvas.height, size, color, lineDash);
    else
      throw Error(cate + ' grid not detected');
  }

  /**
   * 绘制四等分网格
   *
   * @Author    wolf
   * @Datetime  2020-10-13T16:46:27+0800
   * @param     {CanvasRenderingContext2D} ctx      画布对象
   * @param     {Number}                   x        起始x轴
   * @param     {Number}                   y        起始y轴
   * @param     {Number}                   w        网格宽度
   * @param     {Number}                   h        网格高度
   * @param     {Number}                   size     网格线条粗细
   * @param     {String}                   color    网格填充颜色
   * @param     {Array}                    lineDash 是否使用虚线描边, 传入一个数组, 默认为false
   */
  static drawGridQuarter (ctx, x = 0, y = 0, w, h, size = 1, color = 'black', lineDash = false) {
    let cas, avg;
    cas = ctx.canvas;
    avg = [NumberAssistant['divide'](w, 4), NumberAssistant['divide'](h, 4)];
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    Array.isArray(lineDash) && ctx.setLineDash(lineDash);
    for (let i = 1; i < 4; i++) {
      ctx.moveTo(avg[0] * i + x, y);
      ctx.lineTo(avg[0] * i + x, y + h);
      ctx.moveTo(x, avg[1] * i + y);
      ctx.lineTo(x + w, avg[1] * i + y);
    }
    ctx.stroke();
    ctx.restore();
  }

  /**
   * 将source画布与destination画布内容按照compositeOperation方式进行合成并绘制到ctx上.
   *
   * @Author    wolf
   * @Datetime  2020-10-13T23:11:10+0800
   * @param     {CanvasRenderingContext2D} ctx                 最终绘制到的画布
   * @param     {Canvas}                   source              源图
   * @param     {Array}                    sourceVariable      源图参数, drawImage第二位开始的参数
   * @param     {Canvas}                   destination         新图
   * @param     {Array}                    destinationVariable 新图参数, drawImage第二位开始的参数
   * @param     {String}                   compositeOperation  采用什么方式合并
   */
  // TODO 这个方法还需调试.
  static layerMerge (ctx, source, sourceVariable, destination, destinationVariable, compositeOperation = 'source-over') {
    let cacheCas, cacheCtx;

    if (!(cacheCas = CacheAssistant['get']('mergeCas', CanvasAssistant))) {
      cacheCas = new OffscreenCanvas(ctx.canvas.width, ctx.canvas.height);
      CacheAssistant['set']('mergeCas', cacheCas, CanvasAssistant);
    }
    cacheCtx = cacheCas.getContext('2d');

    cacheCtx.save();
    cacheCtx.drawImage(source, ...sourceVariable);
    cacheCtx.globalCompositeOperation = compositeOperation;
    cacheCtx.drawImage(destination, ...destinationVariable);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(cacheCas, 0, 0);
    cacheCtx.restore();
    cacheCtx.clearRect(0, 0, cacheCas.width, cacheCas.height);
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
