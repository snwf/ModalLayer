/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 01:18:08
* @Description         一些常用的窗体的封装
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-17 02:37:57
*/

class ModalLayer {
  /**
   * 枚举
   *
   * @type {Object}
   */
  static _ENUM = ENUM;

  /**
   * 模态层版本
   *
   * @type {Number}
   */
  static _version = 1.0;

  /**
   * 默认节点结构
   *
   * @type {Object}
   */
  static _struct = STRUCT;

  /**
   * 默认选项设置
   *
   * @type {Object}
   */
  static _option = COMMON_OPTION;

  /**
   * 缓存空间
   * 主要用于重复的canvas animation性能优化.
   *
   * @type {Object}
   */
  static _cache = {};

  /**
   * 模态层实现
   *
   * @type {Object}
   */
  static _achieve = {};

  /**
   * 工具类
   *
   * @type {Object}
   */
  static _assistant = {};

  /**
   * 实例化的对象
   *
   * @type {Array}
   */
  static _instance = new Proxy([], {
    set: (obj, attr, val) => {
      if (val instanceof ModalLayer || attr === 'length') {
        obj[attr] = val;
        return true;
      }
      throw new TypeError('Must be of type ModalLayer');
    },
    deleteProperty: (obj, key) => {
      throw new Error('Illegal operation');
    }
  });

  /**
   * 最小化队列
   *
   * @type {Array}
   */
  static _minimizeQueue = new Proxy([], {
    // 处理push, splice
    set: (obj, key, val) => {
      if (val instanceof ModalLayer) {
        let valIndex = obj.indexOf(val);
        val['minimize']();
        if (valIndex < 0)
          obj[key] = val;
        else
          obj[valIndex] = val;
        return true;
      } else if (key === 'length') {
        obj[key] = val;
        return true;
      }
      return false;
    },
    deleteProperty: (obj, key) => {
      key = parseInt(key);
      if (Number.isInteger(key) && obj[key] instanceof ModalLayer) {
        obj[key]['revert']();
        if (obj[key + 1]) {
          for (let i = key; i < obj.length - 1; i++)
            obj[i] = obj[i + 1];
        }
        delete obj[obj.length - 1];
        obj.length--;
        return true;
      }
    }
  });

  /**
   * 模态层类型
   *
   * @type {ENUM.TYPE}
   */
  type = null;

  /**
   * 模态层当前状态
   *
   * @type {ENUM.STATUS}
   */
  status = null;

  /**
   * 模态层选项
   *
   * @type {Object}
   */
  option = null;

  /**
   * 局部变量存放点
   *
   * @type {Object}
   */
  variable = {};

  /**
   * 初始化配置
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T22:43:58+0800
   * @param    {Object}                 options 配置
   */
  initOption (options) {
    // 设置ID
    options.index = ModalLayer['_instance'].length;
    
    // 设置父窗口
    options.window = options['window'] ?? window.document.body;

    // 初始化配置
    this['option'] = ModalLayer['_assistant']['object']['merge'](options, ModalLayer['_option']);
  }

  /**
   * 配置兼容性处理
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:14:23+0800
   */
  compatibleOption (options) {
    if (typeof options['mask'] === 'boolean' || ['true', 'false'].includes(options['mask']))
      options['mask'] = {'enable': Boolean(options['mask']), 'clickRemove': true};

    if (!options['content'] || ModalLayer['_assistant']['object']['isEmpty'](options['content']['value']))
      options['content'] = {'value': options['content'], 'fullContainer': options['content']?.['fullContainer'] ?? false};
  }

  /**
   * 配置联动
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:15:59+0800
   */
  linkageOption () {
    if (this['option']['popupTime'] <= 0)
      this['option']['progress']['enable'] = false;

    if (this['option']['title'] === false)
      this['option']['drag']['enable'] = false;
  }

  /**
   * 检查配置是否正确
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T12:22:48+0800
   */
  checkOption () {}

  /**
   * 初始化局部变量
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T12:05:52+0800
   */
  initVariable () {
    this['variable']['event'] = {};
    this['variable']['timeout'] = {};
    this['variable']['struct'] = {
      '_build': {},
      '_backup': {}
    };
    this['variable']['interval'] = {};
    this['variable']['animationName'] = {};
  }

  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T22:45:37+0800
   */
  initStruct () {
    // 遮罩层
    if (this['option']['mask']?.['enable'])
      this['variable']['struct']['_build']['mask'] = ModalLayer['_struct']['mask'];

    // 容器
    this['variable']['struct']['_build']['container'] = ModalLayer['_struct']['container'];
  }

  /**
   * 根据节点结构构造节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:21:23+0800
   */
  initNode () {
    let okButton, noButton, cancelButton;
    let container, titleNode, titleChild;

    // 生成DOM
    this['variable']['nodes'] = ModalLayer['_assistant']['element']['objectToNode'](this['variable']['struct']['_build']);

    container = this['variable']['nodes']['container'];

    // interaction_button
    okButton = container.querySelector('.modal-layer-interaction-btn-ok');
    noButton = container.querySelector('.modal-layer-interaction-btn-no');
    cancelButton = container.querySelector('.modal-layer-interaction-btn-cancel');    

    // 设置属性
    container.setAttribute('modal-layer-popup-time', this['option']['popupTime']);
    container.setAttribute('content-full-container', Number(this['option']['content']['fullContainer']));
    container.setAttribute('modal-layer-type', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_ENUM']['TYPE'], this['type']).toLowerCase());

    container.setAttribute('allow-drag', Number(this['option']['drag']['enable']));
    container.setAttribute('allow-resize', Number(this['option']['resize']['enable']));

    // 展示进度条
    if (this['option']['progress']['enable']) {
      let posAry, progressNode;
      
      posAry = ['top', 'left', 'right', 'bottom'];
      progressNode = container.querySelector('.modal-layer-progress-bar');
      if (!posAry.includes(this['option']['progress']['position']))
        this['option']['progress']['position'] = posAry[3];
      progressNode.setAttribute('progress-bar-position', this['option']['progress']['position']);
      progressNode.querySelector('.modal-layer-progress-bar-progress').style.cssText += 'background: ' + this['option']['progress']['color'];
      progressNode.querySelector('.modal-layer-progress-bar-background').style.cssText += 'background: ' + this['option']['progress']['background'];
    }

    // 设置标题
    if (this['option']['title'] !== false) {
      titleNode = container.querySelector('.modal-layer-title-content');
      if (this['option']['title'] instanceof Object) {
        titleChild = ModalLayer['_assistant']['element']['objectToNode'](this['option']['title']);
        Object.keys(titleChild).forEach(function (k) {
          titleNode.appendChild(titleChild[k]);
        });
      } else {
        titleNode.innerHTML = this['option']['title'];
      }
    }

    // 设置interaction按钮文本
    okButton && (okButton.innerText = this['option']['text']['interaction']['ok']);
    noButton && (noButton.innerText = this['option']['text']['interaction']['no']);
    cancelButton && (cancelButton.innerText = this['option']['text']['interaction']['cancel']);
  }

  /**
   * 初始化节点完成后执行的操作
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T00:51:39+0800
   */
  initNodeFinally () {
    let ui, skinCls, hideCls, showCls, indexCls;
    let opacityAnimationCss, transformAnimationCss;
    let opacityAnimationName, transformAnimationName;
    let opacityAnimationChange, transformAnimationChange;

    ui = this['option']['ui'];
    hideCls = 'modal-layer-hide';
    skinCls = 'modal-layer-skin-' + this['option']['skin'];
    indexCls = 'modal-layer-index-' + this['option']['index'];

    // 构造css代码准备工作
    opacityAnimationName = 'transition-opacity-' + (this['option']['transition']['opacity'] * 100) + '-animation';
    transformAnimationName = 'transition-scale-' + (this['option']['transition']['scale'][0] * 100) + '-' + (this['option']['transition']['scale'][1] * 100) + '-animation';

    this['variable']['animationName']['transition_opacity'] = opacityAnimationName;
    this['variable']['animationName']['transition_scale'] = transformAnimationName;

    if (!ModalLayer['_assistant']['css']['hasCss'](opacityAnimationName)) {
      opacityAnimationChange = {
        'from': 'opacity: ' + this['option']['transition']['opacity'],
        'to': 'opacity: 1',
      };
      // 构造css动画
      opacityAnimationCss = ModalLayer['_assistant']['css']['createAnimation'](opacityAnimationName, opacityAnimationChange);
      // 将css代码插入到style中
      ModalLayer['_assistant']['css']['addCss'](opacityAnimationName, opacityAnimationCss);
      ModalLayer['_assistant']['css']['addCss'](opacityAnimationName + '-reverse', ModalLayer['_assistant']['css']['createAnimation'](opacityAnimationName + '-reverse', {'from': opacityAnimationChange.to, 'to': opacityAnimationChange.from}));
    }

    if (!ModalLayer['_assistant']['css']['hasCss'](transformAnimationName)) {
      transformAnimationChange = {
        'from': 'transform: scale(' + this['option']['transition']['scale'][0] + ', ' + this['option']['transition']['scale'][1] + ')',
        'to': 'transform: scale(1, 1)'
      };
      // 构造css动画
      transformAnimationCss = ModalLayer['_assistant']['css']['createAnimation'](transformAnimationName, transformAnimationChange);
      // 将css代码插入到style中
      ModalLayer['_assistant']['css']['addCss'](transformAnimationName, transformAnimationCss);
      ModalLayer['_assistant']['css']['addCss'](transformAnimationName + '-reverse', ModalLayer['_assistant']['css']['createAnimation'](transformAnimationName + '-reverse', {'from': transformAnimationChange.to, 'to': transformAnimationChange.from}));
    }

    // 统一设置
    Object.keys(this['variable']['nodes']).forEach(function (key) {
      let allNodes = ModalLayer['_assistant']['element']['getAllElement'](this['variable']['nodes'][key]);
      
      // 设置样式类
      for (let i = 0; i < allNodes.length; i++) {
        let classList = allNodes[i].classList;
        if (!classList.contains(ui));
          classList.add(ui);
      }

      // 设置默认class
      // 设置皮肤class
      // 设置索引class
      // 默认隐藏
      this['variable']['nodes'][key].className = ui + ' ' + skinCls + ' ' + indexCls + ' ' + this['variable']['nodes'][key].className.trim() + ' ' + hideCls;
    }, this);

    // 将设置完成的Node放入实例数组
    ModalLayer['_instance'].push(this);
  }

  /**
   * 初始化监听事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T01:17:32+0800
   */
  initEvent () {
    let okButton, noButton, cancelButton;

    // 点击遮罩层移除模态层
    if (this['option']['mask']['enable'] && this['option']['mask']['clickRemove'])
      this['variable']['nodes']['mask'].addEventListener('click', this['variable']['event']['clickMask'] = this['option']['event']['clickMask'].bind(this));

    // 拖拽模态层
    if (this['option']['drag']['enable'])
      this['variable']['nodes']['container'].querySelector('.modal-layer-title').addEventListener('mousedown', this['variable']['event']['drag'] = this['option']['event']['drag'].bind(this));

    // 模态层伸缩
    if (this['option']['resize']['enable'])
      ModalLayer['_assistant']['element']['eventTarget'](this['variable']['nodes']['container'], '.modal-layer-resize-bar', 'mousedown', this['variable']['event']['resize'] = this['option']['event']['resize'].bind(this));

    // 当点击模态层时如果有多个模态层为显示状态则点击的对象置于最上层
    this['variable']['nodes']['container'].addEventListener('mousedown', this['variable']['event']['active'] = this['option']['event']['active'].bind(this));

    // action 由于action使用了Font Awesome, 最好使用事件委托
    if (this['option']['event']['action']['close'])
      ModalLayer['_assistant']['element']['eventTarget'](this['variable']['nodes']['container'], '.modal-layer-action-btn-close', 'click', this['option']['event']['action']['close'], this);
    if (this['option']['event']['action']['expand'])
      ModalLayer['_assistant']['element']['eventTarget'](this['variable']['nodes']['container'], '.modal-layer-action-btn-expand', 'click', this['option']['event']['action']['expand'], this);
    if (this['option']['event']['action']['minimize'])
      ModalLayer['_assistant']['element']['eventTarget'](this['variable']['nodes']['container'], '.modal-layer-action-btn-minimize', 'click', this['option']['event']['action']['minimize'], this);
    
    // interaction 默认只绑定cancel
    okButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-ok');
    noButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-no');
    cancelButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-cancel');
    
    if (this['option']['event']['interaction']['ok'] && okButton)
      okButton.addEventListener('click', this['variable']['event']['interaction_ok'] = this['option']['event']['interaction']['ok'].bind(okButton, this));
    if (this['option']['event']['interaction']['no'] && noButton)
      noButton.addEventListener('click', this['variable']['event']['interaction_no'] = this['option']['event']['interaction']['no'].bind(noButton, this));
    if (cancelButton)
      cancelButton.addEventListener('click', this['variable']['event']['interaction_cancel'] = this['option']['event']['interaction']['cancel'].bind(cancelButton, this));

    // 模态层最小化还原
    ModalLayer['_assistant']['element']['eventTarget'](document, '#modal-layer-minimize-queue .modal-layer-minimize-queue-item', 'click', this['option']['event']['minimizeRevert']);      
  }

  /**
   * 将节点插入this['option']['window']中
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T00:58:14+0800
   */
  insertNode () {
    Object.keys(this['variable']['nodes']).forEach(key => {
      let parentWindow = this['option']['window'];
      if (parentWindow instanceof String || typeof parentWindow === 'string')
        parentWindow = this['option']['window'] = document.querySelector(parentWindow) ?? window.docuemnt.body;
      if (!parentWindow.insertAdjacentElement)
        parentWindow = this['option']['window'] = window.document.body;
      parentWindow.insertAdjacentElement('beforeend', this['variable']['nodes'][key]);
    }, this);
  }

  /**
   * 构造方法
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T20:14:28+0800
   */
  constructor (options, reject) {
    try {
      // 初始化开始时给用户介入的机会
      options['hook']?.['initStart']?.call?.(options);

      this['type'] = options['type'];
      this['status'] = ModalLayer['_ENUM']['STATUS']['HIDE'];

      // 配置兼容性处理
      this['compatibleOption'](options);

      // 初始化配置
      this['initOption'](options);

      // 检查配置
      this['checkOption']();

      // 配置联动
      this['linkageOption']();

      // 初始化变量
      this['initVariable']();

      // 初始化节点结构
      this['initStruct']();

      // 构造节点
      this['initNode']();

      // 构造节点后续处理
      this['initNodeFinally']();

      // 事件监听
      this['initEvent']();

      // 初始化结束后在插入Node之前给用户处理的机会
      this['option']['hook']?.['initEnded']?.call?.(this);

      // 插入节点
      this['insertNode']();
    } catch (e) {
      reject?.call(null, e);
    }
  }

  /**
   * 设置当前模态层状态
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T02:26:20+0800
   * @param    {Mixed}             status 状态
   */
  setStatus (status) {
    if (Object.values(ModalLayer['_ENUM']['STATUS']).includes(status)) {
      this['status'] = status;
      this['variable']['nodes']['container'].setAttribute('modal-layer-status', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_ENUM']['STATUS'], status));
    } else {
      status = status.toUpperCase();
      if (ModalLayer['_ENUM']['STATUS'][status] === undefined)
        throw Error('Illegal value');
      this['status'] = ModalLayer['_ENUM']['STATUS'][status];
      this['variable']['nodes']['container'].setAttribute('modal-layer-status', status.toLowerCase());
    }
  }

 /**
  * 根据屏幕大小重绘模态层大小
  *
  * @Author   Wolf
  * @DateTime 2020-09-02T02:28:37+0800
  */
  resize () {
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

    // 先设置宽度, 不然会出现高度不正确的现象
    newModalWidth = windowWidth * (10 * widthTmpNum * this['option']['areaProportion'][0]) / (10 * widthTmpNum);
    containerNode.style.width = newModalWidth + 'px';

    for (let i = 0; i < modalChildNodes.length; i++)
      newModalHeight = getComputedStyle(modalChildNodes[i], null).position == 'absolute' ? newModalHeight : window.Math.max(ModalLayer['_assistant']['element']['getNodeHeight'](modalChildNodes[i]), newModalHeight);
    containerNode.style.height = newModalHeight + 'px';

    // 记录初始化后的最小值
    this['variable']['defaultArea'] = [newModalWidth, newModalHeight];
  }

  /**
   * 根据给定的参数重绘模态层
   * 不允许溢出document边界
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T04:35:04+0800
   * @param    {Number}                 x x轴坐标
   * @param    {Number}                 y y轴坐标
   * @param    {Number}                 w 容器宽
   * @param    {Number}                 h 容器高
   */
  resizeByXYWH (x, y, w, h) {
    let containerNode, wBoundary;

    containerNode = this['variable']['nodes']['container'];
    wBoundary = document.documentElement.getBoundingClientRect();

    if (x < wBoundary.x)
      x = wBoundary.x;
    if (x + w > wBoundary.right)
      w = wBoundary.right - x;
    if (y < wBoundary.y)
      y = wBoundary.y;
    if (y + h > wBoundary.bottom)
      h = wBoundary.bottom - y;

    containerNode.style.marginLeft = x + 'px';
    containerNode.style.marginTop = y + 'px';

    containerNode.style.width = w + 'px';
    containerNode.style.height = h + 'px';

    // 如果为页面层则跟随模态层变化
    if ([ModalLayer['_ENUM']['TYPE']['PAGE'], ModalLayer['_ENUM']['TYPE']['VIDEO'], ModalLayer['_ENUM']['TYPE']['AUDIO']].includes(this.type)) {
      let pageNode = containerNode.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');
      pageNode.style.width = this['option']['layer']['area'][0] + w - this['variable']['defaultArea'][0] + 'px';
      pageNode.style.height = this['option']['layer']['area'][1] + h - this['variable']['defaultArea'][1] + 'px';
    }
  }

  /**
   * 显示模态层
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T02:31:44+0800
   * @return   {Promise}                Promise对象
   */
  show () {
    let promise;
    let nodes, zIndex;
    let showCls, hideCls;
    let opacityAnimation, transformAnimation;

    nodes = this['variable']['nodes'];
    showCls = 'modal-layer-show';
    hideCls = 'modal-layer-hide';
    zIndex = ModalLayer['_assistant']['element']['maxZIndex']();
    if (Object.keys(nodes).length === 0 || this['status'] === ModalLayer['_ENUM']['STATUS']['SHOW']) return false;

    // 过渡动画
    opacityAnimation = this['variable']['animationName']['transition_opacity'] + ' ' + this['option']['transition']['time'] + 's ease forwards';
    transformAnimation = this['variable']['animationName']['transition_scale'] + ' ' + this['option']['transition']['time'] + 's ease forwards';

    // 置于最上层
    Object.keys(nodes).forEach(k => {
      nodes[k].style.zIndex = zIndex + 1;
    });

    promise = new Promise(resolve => {
      nodes['container']['onanimationend'] = e => {
        // 自动关闭模态层
        if (this['option']['popupTime'] > 0)
          this['option']['event']['autoShutdown'].call(this);
        
        // 只执行一次.
        nodes['container']['onanimationend'] = null;

        resolve();
      }
    });

    // 执行过渡动画
    if (nodes['mask'])
      nodes['mask'].style.animation = opacityAnimation;
    nodes['container'].style.animation = opacityAnimation + ', ' + transformAnimation;

    Object.keys(nodes).forEach((key) => {
      if (nodes[key].classList.contains(hideCls))
        nodes[key].classList.replace(hideCls, showCls);
    }, this);

    // 更改当前状态
    this['setStatus']('show');

    return promise;
  }

  /**
   * 隐藏模态层
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T00:55:32+0800
   * @return   {Promise}                 Promise对象
   */
  hide () {
    let nodes;
    let promise;
    let hideCls, showCls;
    let opacityAnimation, transformAnimation;

    nodes = this['variable']['nodes'];
    hideCls = 'modal-layer-hide';
    showCls = 'modal-layer-show';
    if (Object.keys(nodes).length === 0 || this['status'] === ModalLayer['_ENUM']['STATUS']['HIDE']) return false;

    // 取消自动关闭
    if (Number.isInteger(this['variable']['timeout']['auto_shutdown']))
      window.clearTimeout(this['variable']['timeout']['auto_shutdown']);

    // 过渡动画
    opacityAnimation = this['variable']['animationName']['transition_opacity'] + '-reverse ' + this['option']['transition']['time'] + 's ease forwards';
    transformAnimation = this['variable']['animationName']['transition_scale'] + '-reverse ' + this['option']['transition']['time'] + 's ease forwards';

    promise = new Promise(resolve => {
      nodes['container']['onanimationend'] = e => {
        Object.keys(nodes).forEach((key) => {
          if (nodes[key].classList.contains(showCls))
            nodes[key].classList.replace(showCls, hideCls);
        });
        
        // 更改当前状态
        this['setStatus']('hide');

        // 只执行一次.
        nodes['container']['onanimationend'] = null;

        // 如果父模态层存在则展示
        if (this['option']['parentModalLayer'] !== null)
          this['option']['parentModalLayer'].show();

        resolve();
      }
    });

    // 执行动画
    if (nodes['mask'])
      nodes['mask'].style.animation = opacityAnimation;
    nodes['container'].style.animation = opacityAnimation + ', ' + transformAnimation;

    return promise;
   }

  /**
   * 最小化模态层
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T23:35:17+0800
   */
  minimize () {
    let index;
    let title;
    let tmpClock, animationDur;
    let queueNode, queueItemNode;
    
    if (this['status'] === ModalLayer['_ENUM']['STATUS']['MINIMIZE']) return;

    animationDur = 0.3;
    queueNode = document.querySelector('#modal-layer-minimize-queue');
    if (!queueNode) {
      queueNode = ModalLayer['_assistant']['element']['objectToNode']([ModalLayer['_struct']['minimize_queue']])[0];
      document.body.insertAdjacentElement('beforeend', queueNode);
    }

    animationDur = 0.3;
    title = this['variable']['nodes']['container'].querySelector('.modal-layer-title-content').innerHTML;
    queueItemNode = ModalLayer['_assistant']['element']['objectToNode']([ModalLayer['_struct']['minimize_queue_item']])[0];

    queueItemNode.setAttribute('modal-layer-index', this['option']['index']);
    queueItemNode.querySelector('.modal-layer-minimize-queue-item-title').innerHTML = title;
    queueNode.insertAdjacentElement('beforeend', queueItemNode);

    tmpClock = setInterval(() => {
      if (queueItemNode.parentNode) {
        queueItemNode.style.animation = 'opacity ' + animationDur + 's ease forwards, ' + this['variable']['animationName']['minimize_queue_transition_scale'] + ' ' + animationDur + 's ease forwards';
        clearInterval(tmpClock);
      }
    }, 10);

    this['hide']().then(() => void this['setStatus']('minimize'));
   }
  
  /**
   * 将模态层状态还原
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T23:36:22+0800
   * @return   {Promise}                Promise对象
   */
  revert () {
    let promise;
    let queueNode, queueItemNode;
    let animationDur, animationHalfDur;

    animationDur = 0.3;
    animationHalfDur = animationDur * 100 / 2 / 100;
    queueNode = document.querySelector('#modal-layer-minimize-queue');
    queueItemNode = queueNode.querySelector('.modal-layer-minimize-queue-item[modal-layer-index="' + this['option']['index'] + '"]');

    if (![ModalLayer['_ENUM']['STATUS']['MINIMIZE']].includes(this['status'])) return;

    queueItemNode['onanimationstart'] = e => {
      setTimeout(() => {
        this.show();
        queueItemNode['onanimationstart'] = null;
      }, animationHalfDur * 1000);
    }

    promise = new Promise(resolve => {
      queueItemNode['onanimationend'] = e => {
        queueItemNode.remove();
        if (ModalLayer['_minimizeQueue'].length <= 0)
          queueNode.remove();
        resolve();
      }
    });

    queueItemNode.style.animation = 'opacity-reverse ' + animationDur + 's ease forwards, ' + this['variable']['animationName']['minimize_queue_transition_scale'] + '-reverse ' + animationDur + 's ease forwards';

    return promise;
  }

  /**
   * 移除模态层
   */
  remove () {
    let nodes;
    
    nodes = this['variable']['nodes'];
    if (Object.keys(nodes).length === 0 || [ModalLayer['_ENUM']['STATUS']['REMOVING'], ModalLayer['_ENUM']['STATUS']['REMOVED']].includes(this['status'])) return false;

    // 如果当前层处于最小化状态则移出最小化任务栏.
    if (this['status'] === ModalLayer['_ENUM']['STATUS']['MINIMIZE']) {
      let index = ModalLayer['_minimizeQueue'].indexOf(this);
      delete ModalLayer['_minimizeQueue'][index];
    }

    // 将当前状态置为removing
    this['setStatus']('removing');

    // 隐藏模态层
    this['hide']().then(() => {
      // 移除绑定事件
      this['removeAllEvent']();

      // 删除模态层
      Object.keys(nodes).forEach((key) => {
        nodes[key].remove();
      });

      // 将当前状态置为removed
      this['setStatus']('removed');
    });
  }

  /**
   * 移除所有模态层
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T01:56:21+0800
   */
  static removeAll () {
    for (let i = 0; i < ModalLayer['_instance'].length; i++)
      ModalLayer['_instance'][i].remove();
  }

  /**
   * 移除初始化时绑定的事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T02:03:40+0800
   */
  removeAllEvent () {
    let nodes;
    let okButton, noButton, cancelButton;

    if (Object.keys(nodes = this['variable']['nodes']).length === 0) return false;

    okButton = nodes['container'].querySelector('.modal-layer-interaction-btn-ok');
    noButton = nodes['container'].querySelector('.modal-layer-interaction-btn-no');
    cancelButton = nodes['container'].querySelector('.modal-layer-interaction-btn-cancel');

    // 移除遮罩层点击事件
    if (this['option']['mask']['enable'] && this['option']['mask']['clickRemove'])
      nodes['mask'].removeEventListener('click', this['variable']['event']['clickMask']);

    // 移除模态层拖拽事件
    if (this['option']['drag']['enable'])
      nodes['container'].querySelector('.modal-layer-title').removeEventListener('mousedown', this['variable']['event']['drag']);

    // 移除模态层伸缩事件
    if (this['option']['resize']['enable'])
      nodes['container'].removeEventListener('mousedown', this['variable']['event']['resize']);

    // 移除活动层事件
    nodes['container'].removeEventListener('mousedown', this['variable']['event']['active']);
    
    // 移除action事件
    nodes['container'].removeEventListener('click', this['option']['event']['action']['close']);
    nodes['container'].removeEventListener('click', this['option']['event']['action']['expand']);
    nodes['container'].removeEventListener('click', this['option']['event']['action']['minimize']);

    // 移除interaction事件
    okButton && okButton.removeEventListener('click', this['variable']['event']['interaction_ok']);
    noButton && noButton.removeEventListener('click', this['variable']['event']['interaction_no']);
    cancelButton && cancelButton.removeEventListener('click', this['variable']['event']['interaction_cancel']);

    // 移除监听模态层最小化还原事件
    document.removeEventListener('click', this['option']['event']['minimizeRevert']);
  }

  /**
   * 消息层
   * 
   * @param  {Mixed}      options 模态层设置
   * @param  {Function}   reject  当出现错误时调用方法
   * 
   * @return {ModalLayer}         模态层实例
   */
  static msg (options, reject) {
    ModalLayer['message'](options, reject);
  }
  static message (options, reject) {
    let layer = null;

    if (typeof options === 'string')
      options = {
        'content': options,
        'type': ModalLayer['_ENUM']['TYPE']['MESSAGE']
      }
    else 
      options.type = ModalLayer['_ENUM']['TYPE']['MESSAGE'];

    // 实例化
    layer = new ModalLayer['_achieve']['message'](options, reject);

    // 重绘模态层大小
    layer.resize();

    // 显示
    layer.show();

    return layer;    
  }

  /**
   * 警报层
   * 
   * @param  {Mixed}      options 模态层设置
   * @param  {Function}   reject  当出现错误时调用方法
   * 
   * @return {ModalLayer}         模态层实例
   */
  static alert (options, reject) {
    let layer = null;

    // 设置模态层类型
    options.type = ModalLayer['_ENUM']['TYPE']['ALERT'];

    // 实例化
    layer = new ModalLayer['_achieve']['alert'](options, reject);

    // 重绘模态层大小
    layer.resize();

    // 显示
    layer.show();

    return layer;
  }

  /**
   * 确认层
   * 
   * @param  {Mixed}      options 模态层设置
   * @param  {Function}   reject  当出现错误时调用方法
   * 
   * @return {ModalLayer}         模态层实例
   */
  static confirm (options, reject) {
    let layer = null;

    // 设置模态层类型
    options.type = ModalLayer['_ENUM']['TYPE']['CONFIRM'];

    // 实例化
    layer = new ModalLayer['_achieve']['confirm'](options, reject);

    // 重绘模态层大小
    layer.resize();

    // 显示
    layer.show();

    return layer;    
  }

  /**
   * 提示层
   * 
   * @param  {Mixed}      options 模态层设置
   * @param  {Function}   reject  当出现错误时调用方法
   * 
   * @return {ModalLayer}         模态层实例
   */
  static prompt (options, reject) {
    let layer = null;

    // 设置模态层类型
    options.type = ModalLayer['_ENUM']['TYPE']['PROMPT'];

    // 实例化
    layer = new ModalLayer['_achieve']['prompt'](options, reject);

    // 重绘模态层大小
    layer.resize();

    // 显示
    layer.show();

    return layer;    
  }

  /**
   * 页面层
   * 
   * @param  {Mixed}      options 模态层设置
   * @param  {Function}   reject  当出现错误时调用方法
   * 
   * @return {ModalLayer}         模态层实例
   */
  static page (options, reject) {
    let layer = null;

    // 设置模态层类型
    options.type = ModalLayer['_ENUM']['TYPE']['PAGE'];

    // 实例化
    layer = new ModalLayer['_achieve']['page'](options, reject);

    // 重绘模态层大小
    layer.resize();

    // 显示
    layer.show();

    return layer;    
  }

  /**
   * 图片层
   * 
   * @param  {Mixed}      options 模态层设置
   * @param  {Function}   reject  当出现错误时调用方法
   * 
   * @return {ModalLayer}         模态层实例
   */
  static image (options, reject) {
    let layer = null;

    // 设置模态层类型
    options.type = ModalLayer['_ENUM']['TYPE']['IMAGE'];

    // 实例化
    layer = new ModalLayer['_achieve']['image'](options, reject);

    layer['variable']['image']['finish']

    .catch(e => reject?.(e))

    // 重绘模态层大小
    .then(() => layer.resize())

    // 显示
    .then(() => layer.show());

    return layer;    
  }

  /**
   * 加载层
   * 
   * @param  {Mixed}      options 模态层设置
   * @param  {Function}   reject  当出现错误时调用方法
   * 
   * @return {ModalLayer}         模态层实例
   */
  static loading (options, reject) {
    let layer = null;

    // 设置模态层类型
    options.type = ModalLayer['_ENUM']['TYPE']['LOADING'];

    // 实例化
    layer = new ModalLayer['_achieve']['loading'](options, reject);

    // 重绘模态层大小
    layer.resize();

    // 显示
    layer.show();

    return layer;
  }


}

if (Object.is(window['ModalLayer'], ModalLayer)) {
  console.log('ModalLayer already exists.');
  console.log('Already version: ' + window['ModalLayer']['_version'].toFixed(1) + '. Try to introduce version: ' + ModalLayer['_version'].toFixed(1));
} else {
  Object.preventExtensions(ModalLayer);
  Object.defineProperty(window, 'ModalLayer', {'value': ModalLayer});
}
