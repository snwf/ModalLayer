/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 16:56:54
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-19 00:23:42
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
    // 设置ID
    options.index = ModalLayer['_instance'].length;
    // 设置父窗口
    options.window = options.window ?? document.body;
    
    // 初始化公共配置
    this['option'] = ModalLayer['_assistant']['object']['merge'](options, ModalLayer['_option']);

    // 初始化页面层独有的配置
    this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], PAGE_OPTION);
  }

  /**
   * 配置联动
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:15:59+0800
   */
  linkageOption () {
    ModalLayer['_assistant']['object']['getMethod'](this, ModalLayer, 'linkageOption').call(this);
    
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

    ModalLayer['_assistant']['object']['getMethod'](this, ModalLayer, 'initStruct').call(this);

    container = this['variable']['struct']['_build']['container'];
    title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
    action = this['variable']['struct']['_backup']['action'] = ModalLayer['_struct']['action'];
    content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
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

    ModalLayer['_assistant']['object']['getMethod'](this, ModalLayer, 'initNode').call(this);

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
    pageNode.style = pageStyle;
    
    // 构造css代码准备工作
    scaleAnimationName = 'transition-scale-50-50-animation';

    this['variable']['animationName']['minimize_queue_transition_scale'] = scaleAnimationName;

    if (!ModalLayer['_assistant']['css']['hasCss'](scaleAnimationName)) {
      scaleAnimationChange = {
        'from': 'transform: scale(0.5, 0.5)',
        'to': 'transform: scale(1, 1)'
      };
      // 构造css动画
      scaleAnimationCss = ModalLayer['_assistant']['css']['createAnimation'](scaleAnimationName, scaleAnimationChange);
      // 将css代码插入到style中
      ModalLayer['_assistant']['css']['addCss'](scaleAnimationName, scaleAnimationCss);
      ModalLayer['_assistant']['css']['addCss'](scaleAnimationName + '-reverse', ModalLayer['_assistant']['css']['createAnimation'](scaleAnimationName + '-reverse', {from: scaleAnimationChange.to, to: scaleAnimationChange.from}));
    }
  }

  resize () {
    let pageNode;
    let widthTmpNum, heightTmpNum;
    let containerNode, modalChildNodes;
    let windowWidth, windowHeight, newModalWidth, newModalHeight;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    newModalWidth = newModalHeight = 0;
    containerNode = this['variable']['nodes']['container'];
    modalChildNodes = containerNode.children;
    widthTmpNum = this['option']['areaProportion'][0].toString().length - (this['option']['areaProportion'][0].toString().indexOf('.') + 1);
    heightTmpNum = this['option']['areaProportion'][1].toString().length - (this['option']['areaProportion'][1].toString().indexOf('.') + 1);

    pageNode = containerNode.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');
    newModalWidth = pageNode.offsetWidth + (pageNode.parentNode.offsetLeft * 2);
    for (let i = 0; i < modalChildNodes.length; i++) 
      newModalHeight = getComputedStyle(modalChildNodes[i], null).position == 'absolute' ? newModalHeight : window.Math.max(ModalLayer['_assistant']['element']['getNodeHeight'](modalChildNodes[i]), newModalHeight);
    containerNode.style.width = newModalWidth + 'px';
    containerNode.style.height = newModalHeight + 'px';

    // 记录初始化后的最小值
    this['variable']['defaultArea'] = [newModalWidth, newModalHeight];
  }
}

Object.defineProperty(ModalLayer['_achieve'], 'page', {value: PageLayer});