/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 16:56:54
* @Description
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-28 23:43:54
*/

class PageLayer extends ModalLayer {

  /**
   * 配置兼容性处理
   *
   * @Author    wolf
   * @Datetime  2020-12-28T22:43:02+0800
   * @param     {Object}                  options  配置
   */
  compatibleOption (options) {
    super.compatibleOption(options);
    
    if (Array.isArray(options['layer']['area'])) {
      if (options['layer']['area'].length === 1)
        options['layer']['area'].push(null);
      else if (options['layer']['area'].length > 2)
        options['layer']['area'] = options['layer']['area'].splice(0, 2);
    }
  }

  /**
   * 初始化配置
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T18:06:33+0800
   * @param    {Object}                 options 配置
   */
  initOption (options) {
    super.initOption(options);
    // 初始化页面层独有的配置
    this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['page']);
  }

  /**
   * 配置联动
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:15:59+0800
   */
  linkageOption () {
    super.linkageOption();

    // 如果src与srcdoc属性一起存在则使用src属性
    if (this['option']['layer'].src !== null && this['option']['layer'].srcdoc !== null)
      this['option']['layer'].srcdoc = null;
  }

  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:10:16+0800
   */
  initStruct () {
    let contentPage;
    let action, actionButton;
    let title, content, resize, progress, container;

    super.initStruct();

    action = this['variable']['struct']['_backup']['action']
    content = this['variable']['struct']['_backup']['content'];
    container = this['variable']['struct']['_build']['container'];
    title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
    contentPage = this['variable']['struct']['_backup']['content_page'] = ModalLayer['_struct']['content_page'];
    actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];

    title['child'].push(action);

    if (this['option']['title'] !== false)
      container['child'].push(title);

    if (action['child'].length === 0) {
      actionButton['minimize']['attribute'].push({'key': 'data-index', 'value': 0});
      action['child'].push(actionButton['minimize']);
      actionButton['expand']['attribute'].push({'key': 'data-index', 'value': 1});
      action['child'].push(actionButton['expand']);
      actionButton['close']['attribute'].push({'key': 'data-index', 'value': 2});
      action['child'].push(actionButton['close']);
    }

    content['child'].push(contentPage);

    container['child'].push(content);
    
    if (this['option']['resize']['enable']) {
      resize = this['variable']['struct']['_backup']['resize_box'] = ModalLayer['_struct']['resize_box'];
      container['child'].push(resize);
    }
    
    if (this['option']['progress']['enable']) {
      progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
      container['child'].push(progress);
    }
  }

  /**
   * 初始化节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T17:56:59+0800
   */
  initNode () {
    let page, container;

    super.initNode();

    container = this['variable']['nodes']['container'];
    page = container.querySelector('.modal-layer-page-content');

    Object.keys(this['option']['layer']).forEach(key => {
      if (ModalLayer['_assistant']['object']['isEmpty'](this['option']['layer'][key]) || Array.isArray(this['option']['layer'][key])) return;
      if (key === 'name')
        page.setAttribute('name', this['option']['layer']['name'] + this['option']['index']);
      else
        page.setAttribute(key, this['option']['layer'][key]);
    });
  }

  /**
   * 初始化事件
   *
   * @Author    wolf
   * @Datetime  2020-12-09T22:32:57+0800
   */
  initEvent () {
    super.initEvent();

    Object.keys(this['event']['presetAction']).forEach(k => {
      let index = this['variable']['struct']['_backup']['action']['child'].indexOf(this['variable']['struct']['_backup']['action_button'][k]);
      if (!this['event']['action'][index]) this['event']['action'][index] = this['event']['presetAction'][k];
    });
  }

 /**
  * 根据屏幕大小重绘模态层大小
  * 页面层优先判断, 如果layer.area与option.area都设置了则优先使用layer.area.
  *
  * @Author   Wolf
  * @DateTime 2020-09-02T02:28:37+0800
  */
  resize () {
    let page, content, container;

    container = this['variable']['nodes']['container'];
    content = container.querySelector('.modal-layer-content');
    page = content.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');

    if (this['option']['layer']['area']) {
      page.style.cssText =  `width: ${this['option']['layer']['area'][0]}px; height: ${this['option']['layer']['area'][1]}px;`;
    } else if (this['option']['area']) {
      content.style.cssText = 'height: 100%;';
      page.style.cssText = 'width: 100%; height: 100%';
      super.resize();
    } else {
      page.style.cssText = 'width: 800px; height: 600px;';
    }

    // 记录初始化后的最小值
    this['variable']['defaultRect']['width'] = container.offsetWidth;
    this['variable']['defaultRect']['height'] = container.offsetHeight;
  }
}

ModalLayer['_achieve'].set('page', PageLayer);
