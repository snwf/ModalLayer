/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 16:56:54
* @Description
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-05 00:03:53
*/

class PageLayer extends ModalLayer {
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

    content = this['variable']['struct']['_backup']['content'];
    container = this['variable']['struct']['_build']['container'];
    title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
    action = this['variable']['struct']['_backup']['action'] = ModalLayer['_struct']['action'];
    contentPage = this['variable']['struct']['_backup']['content_page'] = ModalLayer['_struct']['content_page'];
    actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];

    action.innerHTML.push(actionButton['minimize'], actionButton['expand'], actionButton['close']);

    title.innerHTML.push(action);

    if (this['option']['title'] !== false)
      container.innerHTML.push(title);

    content.innerHTML.push(contentPage);

    container.innerHTML.push(content);
    
    if (this['option']['resize']['enable']) {
      resize = this['variable']['struct']['_backup']['resize_box'] = ModalLayer['_struct']['resize_box'];
      container.innerHTML.push(resize);
    }
    
    if (this['option']['progress']['enable']) {
      progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
      container.innerHTML.push(progress);
    }
  }

  /**
   * 初始化节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T17:56:59+0800
   */
  initNode () {
    let container;
    let pageNode, pageStyle;
    let scaleAnimationCss, scaleAnimationName, scaleAnimationChange;

    super.initNode();

    container = this['variable']['nodes']['container'];
    pageNode = container.querySelector('.modal-layer-page-content');
    pageStyle = 'display: block; width: ' + this['option']['layer']['area'][0] + 'px; height: ' + this['option']['layer']['area'][1] + 'px';

    Object.keys(this['option']['layer']).forEach(key => {
      if (ModalLayer['_assistant']['object']['isEmpty'](this['option']['layer'][key])) return;
      if (key === 'name')
        pageNode.setAttribute('name', this['option']['layer']['name'] + this['option']['index']);
      else
        pageNode.setAttribute(key, this['option']['layer'][key]);
    });
  }

 /**
  * 根据屏幕大小重绘模态层大小
  *
  * @Author   Wolf
  * @DateTime 2020-09-02T02:28:37+0800
  */
  resize () {
    let width, height;
    let page, content, container, children;

    height = 0;
    container = this['variable']['nodes']['container'];
    children = container.children;

    page = container.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');
    page.style.cssText =  `width: ${this['option']['layer']['area'][0]}px; height: ${this['option']['layer']['area'][1]}px;`;
    width = this['option']['layer']['area'][0] + (page.parentNode.offsetLeft * 2);
    for (let i = 0; i < children.length; i++)
      height = getComputedStyle(children[i], null).position == 'absolute' ? height : window.Math.max(ModalLayer['_assistant']['element']['getNodeHeight'](children[i]), height);
    container.style.cssText += `width: ${width}px; height: ${height}px;`;

    // 记录初始化后的最小值
    this['variable']['defaultRect']['width'] = width;
    this['variable']['defaultRect']['height'] = height;
    this['variable']['defaultArea'] = [width, height];
  }
}

ModalLayer['_achieve'].set('page', PageLayer);
