/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-04 16:52:21
* @Description         加载层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-11-13 23:26:15
*/

class LoadingLayer extends ModalLayer {
  /**
   * 初始化配置
   *
   * @Author   Wolf
   * @DateTime 2020-09-06T15:59:18+0800
   * @param    {Object}                 options 配置
   */
  initOption (options) {
    // 初始化公共配置
    super.initOption(options);

    // 初始化加载层特殊配置
    this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['loading']);

    this['option']['title'] = false;
    this['option']['drag']['enable'] = false;
    this['option']['resize']['enable'] = false;
    this['option']['progress']['enable'] = false;
  }

  /**
   * 配置兼容性处理
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:14:23+0800
   */
  compatibleOption (options) {
    let positionMap;
    
    positionMap = {
      'center': 'center',
      'right': 'flex-end',
      'left': 'flex-start'
    };

    super.compatibleOption(options);

    if (!ModalLayer['_assistant']['object']['isEmpty'](options['layer']['position'])) {
      if (!Array.isArray(options['layer']['position']))
        options['layer']['position'] = [options['layer']['position'], options['layer']['position']];

      for (let i = 0; i < 2; i++)
        options['layer']['position'][i] = positionMap[options['layer']['position'][i]];
    }
  }

  /**
   * 检查配置是否正确
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T12:22:48+0800
   */
  checkOption () {
    super.checkOption();

    if (!Array.isArray(this['option']['layer'].position) && !['left', 'center', 'right'].includes(this['option']['layer'].position))
      throw new Error('layer.position does not meet expectations');
  }

  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T22:45:37+0800
   */
  initStruct () {
    let content, container;
    let loading, loadingIcon;

    super.initStruct();

    container = this['variable']['struct']['_build']['container'];
    content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
    loading = this['variable']['struct']['_backup']['content_loading'] = ModalLayer['_struct']['content_loading'];
    loadingIcon = this['variable']['struct']['_backup']['content_loading_icon'] = ModalLayer['_struct']['content_loading_icon'];
    
    if (window.isNaN(Number(this['option']['layer'].icon)))
      loading.innerHTML[0].class += ' ' + this['option']['layer'].icon;
    else
      loading.innerHTML[0] = loadingIcon[this['option']['layer'].icon];

    content.innerHTML.push(loading);

    container.innerHTML.push(content);
  }

  /**
   * 根据节点结构构造节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:21:23+0800
   */
  initNodeFinally () {
    let content, container, loadingBox, loadingIcon;

    super.initNodeFinally();

    // 根据参数进行设置.
    container = this['variable']['nodes']['container'];
    content = container.querySelector('.modal-layer-content');
    loadingIcon = content.querySelector('.modal-layer-loading-icon');
    loadingBox = content.querySelector('.modal-layer-loading-box');

    container.style.cssText += 'background: transparent; box-shadow: none;';
    content.style.cssText += 'background: ' + this['option']['layer'].background;
    loadingBox.style.cssText = 'justify-content: ' + this['option']['layer'].position[0] + '; align-items: ' + this['option']['layer'].position[1];
    loadingIcon.style.cssText += 'font-size: ' + this['option']['layer']['size'] + 'px; width: ' + this['option']['layer']['area'][0] + 'px; height: ' + this['option']['layer']['area'][1] + 'px; color: ' + this['option']['layer'].color + '; animation-duration: ' + this['option']['layer'].duration + 's;';
    if (!ModalLayer['_assistant']['object']['isEmpty'](this['option']['layer']['rate']))
      loadingIcon.style.animationTimingFunction = this['option']['layer']['rate'];
  }
}

ModalLayer['_achieve'].set('loading', LoadingLayer);
