/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:20:26
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-16 17:27:37
*/

class CanvasAnimationAssistant {

  /**
   * canvas animation缓存
   *
   * @type {Object}
   */
  static cache = {};


  /**
   * 渐隐渐现动画
   *
   * @Author   Wolf
   * @DateTime 2020-08-26T22:50:10+0800
   * @param    {Object}                 options 属性
   * @return   {String}                         表示是否继续重绘的属性名称
   */
  // 优化思路:
  // 记录绘制透明度100%的图像将其存储起来作为缓存, 之后的绘制可以不停改变透明度达到渐变的效果.
  static fade (options) {
    let icon;
    let anmation;
    let repaintAttr;
    let cas, ctx, ccpt;
    let nowTime, startTime;
    let cache, useCache, cacheIndex;

    if (this.cache.fade === undefined || this.cache.fade === null)
      this.cache.fade = new Map;

    startTime = 0;
    cacheIndex = 0;
    repaintAttr = 'animation-fade-' + Date.now() + '-' + performance.now() + (options.sign ? ('-' + options.sign) : '');
    cas = options.canvas;
    ccpt = [cas.width / 2, cas.height / 2];
    ctx = cas.getContext('2d');

    options.char = options.char ?? '!?';
    options.size = options.size ? (Array.isArray(options.size) ? options.size : [options.size]) : ccpt[1];
    options.color = options.color ? (Array.isArray(options.color) ? options.color : [options.color]) : ['rgba(220, 53, 69'];
    options.speed = options.speed ? (Array.isArray(options.speed) ? options.speed : [options.speed]) : [250];
    options.family = options.family ? (Array.isArray(options.family) ? options.family : [options.family]) : ['Microsoft YaHei'];

    options.color.map(v =>  {
      if (v.indexOf('rgba') === 0)
        return v.substring(0, v.lastIndexOf(','));
      else if (v.indexOf('rgb') === 0)
        return 'rgba' + v.substring(3, v.lastIndexOf(','));
    });

    cache = this.cache.fade.get(JSON.stringify(options)) ?? [];
    useCache = cache.length ? true : false;

    icon = {
      direction: 1,
      text: options.text ?? '',
      opacity: {value: 0, max: 1000},
      size: {value: options.size, index: 0},
      char: {value: options.char, index: 0},
      color: {value: options.color, index: 0},
      speed: {value: options.speed, index: 0},
      family: {value: options.family, index: 0},
      round: {
        x: options.round.x ?? ccpt[0],
        y: options.round.y ?? ccpt[1] - 20,
        radius: options.round.radius ?? 48,
        color: options.round.color ?? '#ddd',
        lineWidth: options.round.lineWidth ?? 5
      },
      draw: function () {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // fade图案旁边的虚线圆
        ctx.lineWidth = this.round.lineWidth;
        ctx.strokeStyle = this.round.color;
        ModalLayer._assistant.canvas.drawDashRound(ctx, this.round.x, this.round.y, this.round.radius);
        // fade图案
        ctx.font = 'bold ' + this.size.value[this.size.index] + 'px ' + this.family.value[this.family.index];
        ctx.fillStyle = this.color.value[this.color.index] + ', ' + (this.opacity.value / this.opacity.max) + ')';
        ctx.fillText(this.char.value[this.char.index], ccpt[0], ccpt[1] - 10);
        // 提示文字
        ctx.font = 'bold 16px ' + this.family.value[this.family.index];
        ctx.fillStyle = this.color.value[this.color.index] + ')';
        ctx.fillText(this.text, ccpt[0], ccpt[1] + 55);
        ctx.restore();
      }
    };

    anmation = nowTime => {
      if (useCache) {
        ctx.putImageData(cache[cacheIndex++], 0, 0);
        cacheIndex = cacheIndex >= cache.length ? 0 :cacheIndex;
      } else {
        let timeDiff;

        icon.speed.index = 0;
        timeDiff = (nowTime - startTime) / 1000;

        for (let avgTime; icon.speed.index < icon.speed.value.length - 1; icon.speed.index++) {
          avgTime = 1 / icon.speed.value.length;
          if (timeDiff >= avgTime * icon.speed.index && timeDiff < avgTime * (icon.speed.index + 1))
            break;
        }

        icon.opacity.value += icon.speed.value[icon.speed.index] * icon.direction;
        if (icon.opacity.value >= icon.opacity.max || icon.opacity.value <= 0)
          icon.direction = -icon.direction;
        if (icon.opacity.value < 0)
          icon.opacity.value = 0;

        if (icon.opacity.value == 0) {
          startTime = nowTime;
          if (++icon.size.index === icon.size.value.length)
            icon.size.index = 0;
          if (++icon.color.index === icon.color.value.length)
            icon.color.index = 0;
          if (++icon.family.index === icon.family.value.length)
            icon.family.index = 0;
          if (++icon.char.index === icon.char.value.length) {
            useCache = true;
            icon.char.index = 0;
            this.cache.fade.set(JSON.stringify(options), cache);
          }
        }

        ctx.clearRect(0, 0, cas.width, cas.height);

        icon.draw();

        cache.push(ctx.getImageData(0, 0, cas.width, cas.height));
      }

      if (cas && Number(cas.getAttribute(repaintAttr)) !== 0)
        window.requestAnimationFrame(anmation);
      else
        cas.removeAttribute(repaintAttr);
    };

    cas.setAttribute(repaintAttr, 1) || anmation();

    return repaintAttr;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'canvasAnimation', {value: CanvasAnimationAssistant});