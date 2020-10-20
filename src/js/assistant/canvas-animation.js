/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:20:26
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-28 01:47:04
*/
class CanvasAnimationAssistant {
  /**
   * 图片加载失败动画
   *
   * @Author   Wolf
   * @DateTime 2020-09-28T00:04:44+0800
   * @param    {CanvasRenderingContext2D} ctx     画布对象
   * @param    {Object}                   options 选项设置
   * @return   {String}                           停止动画重绘的属性名称
   */
  static loadFailedFade (ctx, options) {
    let start, elapse, interval;
    let _fps, _opacity, _repaint;
    let iconKey, textKey, roundKey;
    let _cache, _option, frameAnimation;
    let speed, casIdx, opacity, direction;
    let casCenter, textCenter, roundCenter;
    let iconOption, textOption, roundOption, defaultOption;
    let iconCas, iconCtx, textCas, textCtx, roundCas, roundCtx;

    if (!(ctx instanceof CanvasRenderingContext2D))
      throw Error('Requires a value of type "CanvasRenderingContext2D"');

    if (ObjectAssistant.isEmpty(options))
      options = Object.create(null);

    _fps = 60;
    _opacity = 1;
    _repaint = 'animation-loadFailedFade-' + Date.now() + '-' + performance.now() + (options['sign'] ? ('-' + options['sign']) : '');

    iconOption = {
      'size': 72,
      'char': ['!', '?'],
      'color': 'rgba(220, 53, 69)',
      'font': 'bold 72px Microsoft YaHei, serif',
    };

    textOption = {
      'size': 16,
      'color': 'black',
      'text': 'Load Failed',
      'font': 'normal 16px Microsoft YaHei, serif',
    }

    roundOption = {
      'step': [5],
      'radius': 48,
      'fill': false,
      'borderWidth': 5,
      'fillColor': '#ddd',
      'borderColor': '#ddd'
    };

    defaultOption = {
      'duration': 4,
      'speed': null,
      'icon': iconOption,
      'text': textOption,
      'round': roundOption
    }

    _option = ObjectAssistant.merge(options, defaultOption);
    iconKey = JSON.stringify(_option['icon']);
    textKey = JSON.stringify(_option['text']);
    roundKey = JSON.stringify(_option['round']);
    _option['speed'] = _option['speed'] ?? _option['duration'] / (_option['icon']['char'].length * 2 * _opacity);

    if (!(_cache = CacheAssistant['get']('loadFailedFade', CanvasAnimationAssistant))) {
      _cache = new Map;
      CacheAssistant['set']('loadFailedFade', _cache, CanvasAnimationAssistant);
    }

    if (!(iconCas = _cache.get(iconKey))) {
      iconCas = [];
      for (let i = 0; i < _option['icon']['char'].length; i++) {
        iconCas[i] = new OffscreenCanvas(_option['icon']['size'], _option['icon']['size']);
        iconCtx = iconCas[i].getContext('2d');
        _option['icon']['text'] = _option['icon']['char'][i];
        CanvasAssistant['drawText'](iconCtx, _option['icon']);
      }
      _cache.set(iconKey, iconCas);
    }

    if (!(textCas = _cache.get(textKey))) {
      textCas = new OffscreenCanvas(_option['text']['size'] * _option['text']['text'].length, _option['text']['size'] * 2);
      textCtx = textCas.getContext('2d');
      CanvasAssistant['drawText'](textCtx, _option['text']);
      _cache.set(textKey, textCas);
    }

    if (!(roundCas = _cache.get(roundKey))) {
      let w, h;
      w = h = (_option['round']['radius'] + _option['round']['borderWidth']) * 2;
      roundCas = new OffscreenCanvas(w, h);
      roundCtx = roundCas.getContext('2d');
      CanvasAssistant['drawRound'](roundCtx, _option['round']);
      _cache.set(roundKey, roundCas);
    }

    direction = 1;
    casIdx = opacity = 0;
    interval = 1000 / _fps;
    casCenter = [ctx.canvas.width / 2, ctx.canvas.height / 2];
    roundCenter = [roundCas.width / 2, (roundCas.height + textCas.height) / 2];
    textCenter = [textCas.width / 2, (roundCas.height - textCas.height) / 2];
    speed = _opacity / (_option['duration'] / iconCas.length / 2 * 1000 / interval);
    frameAnimation = function (timestamp) {
      let plusNum = speed * direction;
      let repaint = Number(ctx.canvas.getAttribute(_repaint));
      let iconCenter = [iconCas[casIdx].width / 2, (iconCas[casIdx].height + textCas.height) / 2];

      if (repaint === undefined || repaint === 0) return;

      ctx.clearRect(casCenter[0] - iconCenter[0], casCenter[1] - iconCenter[1], iconCas[casIdx].width, iconCas[casIdx].height);

      if (opacity + plusNum > 1) {
        opacity = 1;
        direction = -direction;
      } else if (opacity + plusNum < 0) {
        opacity = 0;
        direction = -direction;
        casIdx = casIdx + 1 < iconCas.length ? casIdx + 1 : 0;
      } else {
        opacity += plusNum;
      }

      ctx.globalAlpha = opacity;
      ctx.drawImage(iconCas[casIdx], casCenter[0] - iconCenter[0], casCenter[1] - iconCenter[1]);

      window.requestAnimationFrame(frameAnimation);
    }

    ctx.globalAlpha = 1;
    ctx.drawImage(roundCas, casCenter[0] - roundCenter[0], casCenter[1] - roundCenter[1]);
    ctx.drawImage(textCas, casCenter[0] - textCenter[0], casCenter[1] + textCenter[1]);

    ctx.canvas.setAttribute(_repaint, 1);
    window.requestAnimationFrame(frameAnimation);

    return _repaint;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'canvasAnimation', {value: CanvasAnimationAssistant});