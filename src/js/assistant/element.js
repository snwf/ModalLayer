/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 23:25:15
* @Description         元素助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-11-14 00:44:14
*/

class ElementAssistant {
  /**
   * 子元素尺寸是否超出父元素所在区域
   *
   * @Author   wolf
   * @DateTime 2020-07-27T01:32:44+0800
   * @param    {Element}                 child  子元素
   * @param    {Element}                 parent 父元素
   * @return   {Boolean}
   */
  static isOverflow (child, parent) {
    let childRect, parentRect;

    childRect = child.getBoundingClientRect();
    parentRect = parent ? parent.getBoundingClientRect() : {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };

    if (childRect.x < parentRect.x || childRect.x + childRect.width > parentRect.x + parentRect.width)
      return true;
    if (childRect.y < parentRect.y || childRect.y + childRect.height > parentRect.y + parentRect.height)
      return true;

    return false;
  }


  /**
   * 根据给定的父元素获取该父元素下所有节点(包括子节点的子节点)
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:26:56+0800
   * @param    {Element}                 parentNode 父节点
   * @return   {Array}                             节点数组
   */
  static getAllElement (parentNode) {
    let nodeList, childrenNodeList;

    nodeList = [];
    childrenNodeList = parentNode.children;

    if (childrenNodeList.length !== 0) {
      for (let i = 0; i < childrenNodeList.length; i++) {
        nodeList.push(childrenNodeList[i]);
        nodeList = nodeList.concat(ElementAssistant['getAllElement'](childrenNodeList[i]));
      }
    }

    return nodeList;
  }

  /**
   * 获取元素相对于父元素的距离加元素本身的占位高度.
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:29:34+0800
   * @param    {Element}                 node 节点
   * @return   {Number}                       高度(像素)
   */
  static getNodeHeight (node) {
    let computedStyle, marginBottom;

    computedStyle = getComputedStyle(node, null);
    marginBottom = parseInt(computedStyle.marginBottom);

    return node.offsetTop + node.offsetHeight + marginBottom;
  }

  /**
   * 获取某元素前面所有兄弟元素的高总和
   * 会避开决定定位的元素
   *
   * @Author   wolf
   * @DateTime 2020-05-23T22:58:12+0800
   * @param    {Element}                 node 节点
   * @return   {Number}                       高度(像素)
   */
  static getBeforeElementHeight (node) {
    let h, prevNode;

    h = 0;
    prevNode = node;
    while ((prevNode = prevNode.previousElementSibling) && !['absolute', 'fixed'].includes(getComputedStyle(prevNode, null).position))
      h += prevNode.offsetHeight;

    return h;
  }

  /**
   * 获取给定父节点所有子节点合计大小
   * 会根据实际大小计算, 即使已经溢出.
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:34:54+0800
   * @param    {Element}                 node 节点
   * @return   {Array}                        [width, height]
   */
  static getNodeOriginalSize (node) {
    let area, childNodes;

    area = [0, 0];
    childNodes = ElementAssistant['getAllElement'](node);
    childNodes.forEach((n) => {
      if (getComputedStyle(n, null).position == 'absolute') return;
      area[0] = n.offsetWidth > area[0] ? n.offsetWidth : area[0];
      if (n.parentNode === node)
        area[1] += n.offsetHeight;
    });

    return area;
  }

  /**
   * 获取页面中的Z轴最大值
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:37:35+0800
   * @return   {Number}                 页面中Z轴最大值(只有通过position进行定位的元素z-index值才会被获取到)
   */
  static maxZIndex() {
    let allNodes = Array.from(document.all);

    return parseInt(allNodes.reduce(function(prev, currNode) {
      let currNodeZIndex = getComputedStyle(currNode, null).zIndex;
      return window.Math.max(prev, !isNaN(currNodeZIndex) ? currNodeZIndex : 0);
    }, 0));
  }

  /**
   * 根据对象构造节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:40:46+0800
   * @param    {Object}                 nodeList 构造数据
   * @return   {Object}                          Element对象集合
   */
  static objectToNode (nodeList) {
    let buildNode = {};
    for (let item in nodeList) {
      let node = document.createElement(nodeList[item]['nodeType']);
      if (typeof nodeList[item]['nodeType'] != 'undefined') {
        for (let attr in nodeList[item]) {
          if (attr == 'nodeType') {
            continue;
          } else if (attr.toLocaleLowerCase() == 'innerhtml') {
            let resNode = ElementAssistant['objectToNode'](nodeList[item][attr]);
            for (let nodeItem in resNode) {
              node.insertAdjacentElement('beforeend', resNode[nodeItem]);
            }
          } else if (attr.toLocaleLowerCase() == 'innertext') {
            node.insertAdjacentText('beforeend', nodeList[item][attr]);
          } else {
            node.setAttribute(attr, nodeList[item][attr]);
          }
        }
        buildNode[item] = node;
      }
    }
    return buildNode;
  }

  /**
   * 将某个节点全屏显示
   *
   * 全屏出错可能是以下几种原因:
   *   文档中包含的元素未完全激活，也就是说不是当前活动的元素。
   *   元素不在文档之内。
   *   因为功能策略限制配置或其他访问控制，元素不被允许使用"fullscreen"功能。
   *   元素和它的文档是同一个节点。
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:42:51+0800
   * @param    {Element}                 element 节点
   * @param    {Object}                  options 配置
   * @return   {Promise}                         Promise对象
   */
  static launchFullscreen (element, options = {navigationUI: 'show'}) {
    let requestFullscreen = element.requestFullscreen(options);
    return requestFullscreen;
  }

  /**
   * 退出全屏
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:59:31+0800
   */
  static exitFullscreen () {
    document.exitFullscreen();
  }

  /**
   * 获取当前全屏元素
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T00:00:48+0800
   * @return   {Element}                 全屏元素
   */
  static getFullscreenNode () {
    return document.fullscreenElement;
  }

  /**
   * 创建一个script节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-20T16:33:20+0800
   * @param    {Object}                 options 选项设置
   * @return   {Element}                        创建的script
   */
  static createScript (options) {
    let node, attrs;

    node = document.createElement('script');
    attrs = ['src', 'type', 'async', 'defer', 'charset', 'innerHTML'];
    attrs.forEach(attr => {
      options[attr] && (node[attr] = options[attr]);
    });

    return node;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'element', {value: ElementAssistant});
