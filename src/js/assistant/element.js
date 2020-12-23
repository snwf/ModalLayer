/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 23:25:15
* @Description         元素助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-24 03:00:27
*/

class ElementAssistant {
  /**
   * 判断当前
   *
   * @Author    wolf
   * @Datetime  2020-12-06T01:40:15+0800
   * @param     {[type]}                  node  [description]
   * @return    {Boolean}                 [description]
   */
  static isMarginFolding (node) {
    let computedStyle = getComputedStyle(node, null);
    if (computedStyle.position === 'absolute' || computedStyle.position === 'fixed') return false;
    return (
      parseInt(computedStyle.padding) === 0 &&
      parseInt(computedStyle.borderWidth) === 0 &&
      (node.offsetTop > 0 || node.offsetLeft > 0) &&
      (computedStyle.overflow === 'unset' || computedStyle.overflow === 'visible')
    )
  }

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
   * @return   {Array}                              节点数组
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
   * @param    {Element}                 node   节点
   * @param    {String}                  pseudo 伪类
   * @return   {Number}                         高度(像素)
   */
  static getNodeHeight (node, pseudo = null) {
    let computedStyle, marginBottom;

    computedStyle = getComputedStyle(node, pseudo);
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
   * 获取最大的z-index值
   * 若传入一个节点则获取该节点下面的最大z-index
   *
   * @Author    wolf
   * @Datetime  2020-11-14T02:57:05+0800
   * @param     {Element}                  node  获取该节点下最大的z-index
   * @return    {Number}                         最大的z-index值(只有通过position进行定位的元素z-index值才会被获取到)
   */
  static maxZIndex (node) {
    let max, allNodes;

    if (node) allNodes = ElementAssistant.getAllElement(node);
    else allNodes = Array.from(document.all);

    max = 0;
    allNodes.forEach(function (currNode) {
      let zIndex = parseInt(getComputedStyle(currNode).zIndex);
      max = window.Math.max(max, Number.isInteger(zIndex) ? zIndex : 0);
    });

    return max;
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
   * 构建节点/元素
   *
   * @Author    wolf
   * @Datetime  2020-12-21T01:57:45+0800
   * @param     {Mixed}                  struct  结构
   * @return    {Mixed}                          构造好的节点/元素
   */
  static build (struct) {
    // 判断是否为合法结构
    if (
      !Array.isArray(struct) &&
      !(ObjectAssistant['isOnlyObject'](struct))
    )
      throw TypeError('Not a valid structure.');

    let kws, stack;
    let handle, single, elements;

    stack = [];
    single = false;
    kws = {
      text: 'text',
      html: 'html',
      child: 'child'
    };
    // 兼容性处理
    if (struct['type'] && typeof struct['type'] === 'string') {
      single = true;
      struct = [struct];
    }
    elements = struct.constructor ? new struct.constructor : Object.create(null);

    // 构建方法
    handle = function (_struct) {
      if (!_struct['type']) throw Error('Need a type.');

      let element;

      if (_struct['namespace'])
        element = document.createElementNS(_struct['namespace'], _struct['type']);
      else
        element = document.createElement(_struct['type']);

      if (_struct.id) element.id = _struct.id;
      if (_struct.class) {
        if (typeof element.className === 'object' && 'baseVal' in element.className)
          element.className['baseVal'] = _struct.class;
        else
          element.className = _struct.class;
      }
      _struct['attribute']?.forEach(o => {
        if (o['namespace'] === undefined)
          element.setAttribute(o['key'], o['value']);
        else
          element.setAttributeNS(o['namespace'], o['key'], o['value']);
      });

      return element;
    }

    Object.keys(struct).forEach(k => {
      elements[k] = handle(struct[k]);
      if (!struct[k][kws.child]) return;
      // 如果存在子节点则广度优先遍历结构.
      struct[k][kws.child].forEach(v => stack.push([elements[k], v]));
      for (let _parent, _struct, _element; stack.length > 0;) {
        [_parent, _struct] = stack.shift();
        _element = _parent.appendChild(handle(_struct));

        if (_struct[kws.html]) {
          _element.innerHTML = _struct[kws.html];
        } else if (_struct[kws.text]) {
          _element.innerText = _struct[kws.text];
        } else if (_struct[kws.child]) {
          _struct[kws.child].forEach(v => stack.push([_element, v]));
        }
      }
    });

    return single ? elements.pop() : elements;
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
