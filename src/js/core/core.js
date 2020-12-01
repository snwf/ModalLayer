/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 01:18:08
* @Description         一些常用的窗体的封装
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-01 22:27:52
*/

class ModalLayer {
  /**
   * 环境
   *
   * @type {Object}
   */
  static _env = ENV;

  /**
   * 枚举
   *
   * @type {Object}
   */
  static _enum = ENUM;

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
  static _option = OPTION;

  /**
   * 静态临时变量存放点
   *
   * @type {Map}
   */
  static _variable = new Map;

  /**
   * 需要在worker中执行的方法.
   *
   * @type {Map}
   */
  static _worker = window.Worker ? new Map : undefined;

  /**
   * 默认事件
   *
   * @type {Object}
   */
  static _event = EVENT;

  /**
   * 模态层版本
   *
   * @type {Number}
   */
  static _version = 1.0;

  /**
   * 模态层实现
   *
   * @type {Object}
   */
  static _achieve = new Map;

  /**
   * 工具类
   *
   * @type {Object}
   */
  static _assistant = Object.create(null);

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
   * 模态层相关事件
   *
   * @type {Object}
   */
  event = null;

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
    options['index'] = ModalLayer['_instance'].length;

    // 记录当前实例
    ModalLayer['_instance'][options['index']] = this;

    // 初始化配置
    this['option'] = ModalLayer['_assistant']['object']['merge'](options, ModalLayer['_option']['common']);
  }

  /**
   * 配置兼容性处理
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:14:23+0800
   */
  compatibleOption (options) {
    // 父容器
    if (ModalLayer['_assistant']['object']['isString'](options['window']))
      options['window'] = document.querySelector(options['window']);

    // 定位配置
    if (options['position']) {
      if (!Array.isArray(options['position'])) {
        if (Number.isInteger(options['position']))
          options['position'] = [options['position'], options['position']];
        else
          options['position'] = null;
      }
    }

    // 遮罩层
    if (typeof options['mask'] === 'boolean' || ['true', 'false'].includes(options['mask']))
      options['mask'] = {'enable': Boolean(options['mask']), 'clickRemove': true};

    // 内容
    if (!ModalLayer['_assistant']['object']['isOnlyObject'](options['content']))
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
  checkOption () {
    // 检查过渡动画是否正确设置
    if (Number.isFinite(this['option']['transition']['animation'])) {
      if (!Object.values(ModalLayer['_enum']['TRANSITION_ANIMATION_PRESET']).includes(this['option']['transition']['animation']))
        throw Error('No preset animation found.');
    } else if (this['option']['transition']['animation'] !== null) {
      if (
        !Array.isArray(this['option']['transition']['animation']) &&
        !(this['option']['transition']['animation'] instanceof Animation)
      )
        throw Error('Expects a css animation name or Animation object.');
    }
  }

  /**
   * 初始化局部变量
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T12:05:52+0800
   */
  initVariable () {
    this['variable']['struct'] = Object.create(null);
    this['variable']['timeout'] = Object.create(null);
    this['variable']['interval'] = Object.create(null);
    this['variable']['animation'] = Object.create(null);
    this['variable']['eventSymbol'] = Object.create(null);
    this['variable']['defaultRect'] = Object.create(null);
    this['variable']['struct']['_build'] = Object.create(null);
    this['variable']['struct']['_backup'] = Object.create(null);
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
    let mask, container, titleNode, titleChild;

    // 生成DOM
    this['variable']['nodes'] = ModalLayer['_assistant']['element']['objectToNode'](this['variable']['struct']['_build']);

    mask = this['variable']['nodes']['mask'];
    container = this['variable']['nodes']['container'];

    // interaction_button
    okButton = container.querySelector('.modal-layer-interaction-btn-ok');
    noButton = container.querySelector('.modal-layer-interaction-btn-no');
    cancelButton = container.querySelector('.modal-layer-interaction-btn-cancel');

    // 设置属性
    if (this['option']['window'] !== null) {
      mask?.setAttribute('has-window', '');
      container.setAttribute('has-window', '');
    }
    container.setAttribute('modal-layer-popup-time', this['option']['popupTime']);
    container.setAttribute('content-full-container', Number(this['option']['content']['fullContainer']));
    container.setAttribute('modal-layer-type', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['TYPE'], this['type']).toLowerCase());

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

    ui = this['option']['ui'];
    hideCls = 'modal-layer-hide';
    skinCls = 'modal-layer-skin-' + this['option']['skin'];
    indexCls = 'modal-layer-index-' + this['option']['index'];

    // 统一设置
    Object.keys(this['variable']['nodes']).forEach(function (key) {
      let allNodes = ModalLayer['_assistant']['element']['getAllElement'](this['variable']['nodes'][key]);

      // 设置样式类
      for (let i = 0; i < allNodes.length; i++) {
        if (allNodes[i].classList.contains(ui)) allNodes[i].classList.remove(ui);
        allNodes[i].className = `${ui} ${allNodes[i].className}`;
      }

      // 设置默认class
      // 设置皮肤class
      // 设置索引class
      // 默认隐藏
      this['variable']['nodes'][key].className = ui + ' ' + skinCls + ' ' + indexCls + ' ' + this['variable']['nodes'][key].className.trim() + ' ' + hideCls;
    }, this);
  }

  /**
   * 设置过渡动画
   *
   * @Author    wolf
   * @Datetime  2020-11-18T02:37:12+0800
   */
  initAnimation () {
    let nodes;
    let animation;
    let preset, option;

    preset = Object.create(null);
    nodes = this['variable']['nodes'];

    if (this['option']['transition']['animation'] === null) return;

    animation = this['option']['transition']['animation'];

    preset.other = [
      {'opacity': 0},
      {'opacity': 1}
    ];
    preset['container'] = [
      // 正拉伸
      [
        {'opacity': 0, 'transform': 'scale(.45)'},
        {'opacity': 1, 'transform': 'scale(1)'}
      ],
      // 向下位移
      [
        {'opacity': 0, 'transform': 'translateY(-100%)'},
        {'opacity': 1, 'transform': 'translateY(0)'}
      ],
      // 展开X轴
      [
        {'opacity': 0, 'transform': 'rotateY(-120deg)'},
        {'opacity': 1, 'transform': 'rotateY(0)'}
      ],
      // 对角拉伸
      [
        {'opacity': 0, 'transform': 'skewX(-100deg)'},
        {'opacity': 1, 'transform': 'skewX(0deg)'}
      ],
      // 向上弹出
      [
        {'opacity': 0, 'transform': 'translateY(200%) scale(.45)'},
        {'opacity': 1, 'transform': 'translateY(0) scale(1)'}
      ]
    ];

    option = {
      'fill': 'both',
      'id': 'modal-layer-transition-animation',
      'easing': this['option']['transition']['easing'],
      'duration': this['option']['transition']['duration'] * 1000
    };

    this['variable']['animation']['transition'] = Object.create(null);
    Object.keys(nodes).forEach(k => {
      if (k === 'container') {
        if (animation instanceof Animation) {
          animation.effect.target = nodes[k];
        } else {
          animation = Array.isArray(animation) ? animation : preset[k][animation];
          animation = nodes[k].animate(animation, option);
        }
        this['variable']['animation']['transition'][k] = animation;
      } else {
        this['variable']['animation']['transition'][k] = nodes[k].animate(preset.other, option);
      }
      this['variable']['animation']['transition'][k].cancel();
    });
  }

  /**
   * 初始化事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T01:17:32+0800
   */
  initEvent () {
    this['event'] = ModalLayer['_assistant']['object']['merge'](this['option']['event'] ?? {}, ModalLayer['_event']);
  }

  /**
   * 绑定事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-21T00:15:00+0800
   */
  bindEvent () {
    let options;
    let okButton, noButton, cancelButton;

    options = {
      'once': false,
      'capture': false,
      'passive': false,
      'mozSystemGroup': false
    };

    // 点击遮罩层移除模态层
    if (this['option']['mask']['enable'] && this['option']['mask']['clickRemove'])
      this['variable']['eventSymbol']['maskClickRemove'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['mask'], 'click', null, this['event']['clickMask'], this, null, options);

    // 拖拽模态层
    if (this['option']['drag']['enable'])
      this['variable']['eventSymbol']['drag'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'].querySelector('.modal-layer-title'), 'mousedown', null, this['event']['drag'], this, null, options);

    // 模态层伸缩
    if (this['option']['resize']['enable'])
      this['variable']['eventSymbol']['resize'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'mousedown', '.modal-layer-resize-bar', this['event']['resize'], this, null, options);

    // 当点击模态层时如果有多个模态层为显示状态则点击的对象置于最上层
    this['variable']['eventSymbol']['active'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'mousedown', null, this['event']['active'], this, null, options);

    // action 由于action使用了Font Awesome, 最好使用事件委托
    if (this['event']['action']['close'] instanceof Function)
      this['variable']['eventSymbol']['actionClose'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'click', '.modal-layer-action-btn-close', this['event']['action']['close'], this, null, options);
    if (this['event']['action']['expand'] instanceof Function)
      this['variable']['eventSymbol']['actionExpand'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'click', '.modal-layer-action-btn-expand', this['event']['action']['expand'], this, null, options);
    if (this['event']['action']['minimize'] instanceof Function)
      this['variable']['eventSymbol']['actionMinimize'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'click', '.modal-layer-action-btn-minimize', this['event']['action']['minimize'], this, null, options);

    // interaction 默认只绑定cancel
    okButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-ok');
    noButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-no');
    cancelButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-cancel');

    if (this['event']['interaction']['ok'] && okButton)
      this['variable']['eventSymbol']['interactionOk'] = ModalLayer['_assistant']['event']['add'](okButton, 'click', null, this['event']['interaction']['ok'], this, null, options);
    if (this['event']['interaction']['no'] && noButton)
      this['variable']['eventSymbol']['interactionNo'] = ModalLayer['_assistant']['event']['add'](noButton, 'click', null, this['event']['interaction']['no'], this, null, options);
    if (cancelButton)
      this['variable']['eventSymbol']['interactionCancel'] = ModalLayer['_assistant']['event']['add'](cancelButton, 'click', null, this['event']['interaction']['cancel'], this, null, options);
  }

  /**
   * 将节点插入父容器(this.option.window)中
   * 若用户没有指定或在body中没有找到用户指定的容器则将 document.body 作为父容器.
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T00:58:14+0800
   */
  insertNode () {
    let fragment = document.createDocumentFragment();
    let parentWindow = this['option']['window'] ?? window.document.body;
    Object.keys(this['variable']['nodes']).forEach(key => fragment.appendChild(this['variable']['nodes'][key]), this);
    parentWindow.appendChild(fragment);
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
      this['status'] = ModalLayer['_enum']['STATUS']['HIDE'];

      // // 创建配置副本
      // options = ModalLayer['_assistant']['object']['deepCopy'](options);

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

      // 设置过渡动画
      this['initAnimation']();

      // 初始化事件
      this['initEvent']();

      // 绑定事件
      this['bindEvent']();

      // 初始化结束后在插入Node之前给用户处理的机会
      this['option']['hook']?.['initEnded']?.call?.(this);

      // 插入节点
      this['insertNode']();
    } catch (e) {
      ModalLayer['_instance'].splice(ModalLayer['_instance'].indexOf(this), 1);
      reject?.call(null, e);
    }
  }

  /**
   * 设置当前模态层状态
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T02:26:20+0800
   * @param    {Mixed}             status 模态层状态
   */
  setStatus (status) {
    let text;
    if (!Object.values(ModalLayer['_enum']['STATUS']).includes(status)) {
      text = status.toUpperCase();
      if ((status = ModalLayer['_enum']['STATUS'][text]) === undefined)
        throw Error('Illegal value');
    } else {
      text = ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['STATUS'], status);
    }
    this['status'] = status;
    this['variable']['nodes']['container'].setAttribute('modal-layer-status', text.toLowerCase());
  }

 /**
  * 根据屏幕大小重绘模态层大小
  *
  * @Author   Wolf
  * @DateTime 2020-09-02T02:28:37+0800
  */
  resize () {
    let defaultArea;
    let container, modalChildNodes;

    defaultArea = [0, 0];
    container = this['variable']['nodes']['container'];
    modalChildNodes = container.children;

    // 先设置宽度, 不然会出现高度不正确的现象
    defaultArea[0] = ModalLayer['_assistant']['number']['multiply'](window.innerWidth, this['option']['areaProportion'][0]);
    container.style.width = defaultArea[0] + 'px';

    for (let i = 0; i < modalChildNodes.length; i++)
      defaultArea[1] = getComputedStyle(modalChildNodes[i]).position == 'absolute' ? defaultArea[1] : window.Math.max(ModalLayer['_assistant']['element']['getNodeHeight'](modalChildNodes[i]), defaultArea[1]);
    container.style.height = defaultArea[1] + 'px';

    // 记录初始化后的最小值
    this['variable']['defaultArea'] = defaultArea;
    this['variable']['defaultRect']['width'] = defaultArea[0];
    this['variable']['defaultRect']['height'] = defaultArea[1];
  }

  /**
   * 根据给定的参数调整模态层的位置/大小
   *
   * @Author    wolf
   * @Datetime  2020-11-16T21:10:10+0800
   * @param    {Number}                   x x轴坐标
   * @param    {Number}                   y y轴坐标
   * @param    {Number}                   w 容器宽
   * @param    {Number}                   h 容器高
   */
  resizeBy (x, y, w, h) {
    let container = this['variable']['nodes']['container'];
    container.style.cssText += `top: ${y}px; left: ${x}px; width: ${w}px; height: ${h}px;`;

    // 如果为页面层则跟随模态层变化
    if ([ModalLayer['_enum']['TYPE']['PAGE'], ModalLayer['_enum']['TYPE']['VIDEO'], ModalLayer['_enum']['TYPE']['AUDIO']].includes(this.type)) {
      let pageNode = container.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');
      pageNode.style.cssText += `width: ${this['option']['layer']['area'][0] + w - this['variable']['defaultRect']['width']}px; height: ${this['option']['layer']['area'][1] + h - this['variable']['defaultRect']['height']}px;`;
    }
  }

  /**
   * 根据配置项定位模态层
   *
   * @Author    wolf
   * @Datetime  2020-11-16T02:55:39+0800
   */
  positioning () {
    let container, parentNode;
    let posX, posY, width, height, parent;

    container = this['variable']['nodes']['container'];
    parentNode = this['option']['window'] === document.body ? document.documentElement : this['option']['window'];

    if (this['option']['position']) {
      [posX, posY] = this['option']['position'];
    }
    // 若 this.option.position 未设置或为Falsely则自动居中.
    else {
      width = this['variable']['defaultRect']['width'];
      height = this['variable']['defaultRect']['height'];

      parent = {
        scrollY: parentNode?.scrollTop ?? 0,
        scrollX: parentNode?.scrollLeft ?? 0,
        width: parentNode ? parentNode.clientWidth : window.innerWidth,
        height: parentNode ? parentNode.clientHeight : window.innerHeight
      }

      posX = ModalLayer['_assistant']['number']['chain'](parent.width)['subtract'](width)['divide'](2)['add'](parent.scrollX).floor().done();
      posY = ModalLayer['_assistant']['number']['chain'](parent.height)['subtract'](height)['divide'](2)['add'](parent.scrollY).floor().done();

      // 若父容器存在则直接计算当前屏幕的中心位置.
      // 否则需要将滚动距离列入考虑.
      // if (this['option']['window']) {
        // posX += window.scrollX ?? window.pageXOffset;
        // posY += window.scrollY ?? window.pageYOffset;
        // posY += this['option']['window'].scrollTop;
        // posX += this['option']['window'].scrollLeft;
      // }
    }

    container.style.cssText += `top: ${posY}px; left: ${posX}px;`;

    this['variable']['defaultRect']['top'] = posY;
    this['variable']['defaultRect']['left'] = posX;
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
    let animations;
    let showCls, hideCls;
    let nodes, zIndex, nodeKeys;

    showCls = 'modal-layer-show';
    hideCls = 'modal-layer-hide';
    nodes = this['variable']['nodes'];
    nodeKeys = Object.keys(nodes);
    animations = this['variable']['animation']['transition'];
    zIndex = ModalLayer['_assistant']['element']['maxZIndex']();
    if (Object.keys(nodes).length === 0 || this['status'] === ModalLayer['_enum']['STATUS']['SHOW']) return Promise.resolve();

    promise = new Promise(resolve => {
      let fn = e => {
        // 自动关闭模态层
        if (this['option']['popupTime'] > 0)
          this['event']['autoShutdown'].call(this);

        resolve();
      };
      if (this['option']['transition']['animation'] !== null)
        animations['container'].onfinish = fn;
      else
        fn();
    });

    // 置于最上层
    // 执行过渡动画
    nodeKeys.forEach(k => {
      let method = animations[k].playbackRate < 0 ? 'reverse' : 'play';
      nodes[k].style.zIndex = zIndex + 1;
      if (nodes[k].classList.contains(hideCls))
        nodes[k].classList.replace(hideCls, showCls);
      if (animations?.[k]) animations[k][method]();
    });

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
    let promise;
    let animations;
    let nodes, nodeKeys;
    let hideCls, showCls;
    let opacityAnimation, transformAnimation;

    hideCls = 'modal-layer-hide';
    showCls = 'modal-layer-show';
    nodes = this['variable']['nodes'];
    nodeKeys = Object.keys(nodes);
    animations = this['variable']['animation']['transition'];
    if (Object.keys(nodes).length === 0 || this['status'] === ModalLayer['_enum']['STATUS']['HIDE']) return Promise.resolve();

    // 取消自动关闭
    if (Number.isInteger(this['variable']['timeout']['auto_shutdown']))
      window.clearTimeout(this['variable']['timeout']['auto_shutdown']);

    promise = new Promise(resolve => {
      let fn = e => {
        nodeKeys.forEach(k => {
          if (nodes[k].classList.contains(showCls))
            nodes[k].classList.replace(showCls, hideCls);
        });
        // 如果父模态层存在则展示
        if (this['option']['parentModalLayer'] instanceof ModalLayer)
          this['option']['parentModalLayer'].show();

        // 更改当前状态
        this['setStatus']('hide');

        resolve();
      };
      if (this['option']['transition']['animation'] !== null)
        animations['container'].onfinish = fn;
      else
        fn();
    });

    // 执行过渡动画
    nodeKeys.forEach(k => {
      let method = animations[k].playbackRate > 0 ? 'reverse' : 'play';
      if (animations?.[k]) animations[k][method]();
    });

    return promise;
   }

  /**
   * 最小化模态层
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T23:35:17+0800
   */
  minimize () {
    let title;
    let keyframes, option;
    let queueNode, queueItemNode;
    let animation, animations, animationDur;

    if (this['status'] === ModalLayer['_enum']['STATUS']['MINIMIZE']) return;

    animationDur = this['option']['transition']['duration'];
    queueNode = document.querySelector('#modal-layer-minimize-queue');

    if (!queueNode) {
      queueNode = ModalLayer['_assistant']['element']['objectToNode']([ModalLayer['_struct']['minimize_queue']])[0];
      queueNode.classList.add(this['option']['ui'], `modal-layer-skin-${this['option']['skin']}`);
      // 模态层最小化还原
      ModalLayer['_assistant']['cache']['set']('minimizeQueueEvent', ModalLayer['_assistant']['event']['add'](queueNode, 'click', '.modal-layer-minimize-queue-item', this['event']['minimizeRevert'], null, null, false));
      document.body.insertAdjacentElement('beforeend', queueNode);
    }

    title = this['variable']['nodes']['container'].querySelector('.modal-layer-title-content').innerHTML;
    queueItemNode = ModalLayer['_assistant']['element']['objectToNode']([ModalLayer['_struct']['minimize_queue_item']])[0];

    queueItemNode.classList.add(this['option']['ui']);
    queueItemNode.setAttribute('modal-layer-index', this['option']['index']);
    queueItemNode.querySelector('.modal-layer-minimize-queue-item-title').innerHTML = title;
    queueNode.insertAdjacentElement('beforeend', queueItemNode);

    if (!(animations = ModalLayer['_assistant']['cache']['get']('minimizeQueueAnimations'))) {
      animations = new Map;
      ModalLayer['_assistant']['cache']['set']('minimizeQueueAnimations', animations);
    }

    if (animation = (animations.get(this['option']['index']))) {
      animation.reverse();
    } else {
      // 动画关键帧
      keyframes = [
        {'opacity': 0, 'transform': 'scale(.45)'},
        {'opacity': 1, 'transform': 'scale(1)'}
      ];

      // 动画设定
      option = {
        'fill': 'both',
        'id': 'modal-layer-minimize-queue-transition-animation',
        'easing': this['option']['transition']['easing'],
        'duration': animationDur * 1000
      };

      animation = queueItemNode.animate(keyframes, option);
      animations.set(this['option']['index'], animation);
    }

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
    let animation, animationDur, animationHalfDur;

    animationDur = this['option']['transition']['duration'];
    queueNode = document.querySelector('#modal-layer-minimize-queue');
    animationHalfDur = ModalLayer['_assistant']['number']['divide'](animationDur, 2);
    queueItemNode = queueNode.querySelector('.modal-layer-minimize-queue-item[modal-layer-index="' + this['option']['index'] + '"]');

    if (![ModalLayer['_enum']['STATUS']['MINIMIZE']].includes(this['status'])) return;

    animation = ModalLayer['_assistant']['cache']['get']('minimizeQueueAnimations').get(this['option']['index']);

    setTimeout(() => {
      this.show();
    }, animationHalfDur * 1000);

    promise = new Promise(resolve => {
      animation.onfinish = e => {
        queueItemNode.remove();
        if (ModalLayer['_minimizeQueue'].length <= 0) {
          queueNode.remove();
          ModalLayer['_assistant']['cache']['has']('minimizeQueueEvent') && ModalLayer['_assistant']['event']['remove'](ModalLayer['_assistant']['cache']['get']('minimizeQueueEvent'));
        }
        animation.onfinish = null;
        resolve();
      };
    });

    animation.reverse();

    return promise;
  }

  /**
   * 移除模态层
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T23:42:52+0800
   * @return   {Promise}                 Promise对象
   */
  remove () {
    let nodes, status;

    status = this['status'];
    nodes = this['variable']['nodes'];

    // 如果当前层处于最小化状态则移出最小化任务栏.
    if (status === ModalLayer['_enum']['STATUS']['MINIMIZE']) {
      let index = ModalLayer['_minimizeQueue'].indexOf(this);
      delete ModalLayer['_minimizeQueue'][index];
    }

    // 将当前状态更改为removing.
    this['setStatus'](ModalLayer['_enum']['STATUS']['REMOVING']);

    if (Object.keys(nodes).length === 0 || [ModalLayer['_enum']['STATUS']['HIDE'], ModalLayer['_enum']['STATUS']['REMOVING'], ModalLayer['_enum']['STATUS']['REMOVED']].includes(status)) return Promise.resolve();

    // 隐藏模态层
    return this['hide']().then(() => {
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
   * 彻底删除模态层
   * 此方法用于释放当前实例占用内存.
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T22:03:21+0800
   */
  delete () {
    // 移除节点以及移除监听事件
    this.remove()
    .then(() => {
      let index = ModalLayer._instance.indexOf(this);
      // 删除实例
      ModalLayer._instance.splice(index, 1);

      // 解除相关变量引用.
      ModalLayer['_assistant']['object']['dereference'](this['event']);
      ModalLayer['_assistant']['object']['dereference'](this['option']);
      ModalLayer['_assistant']['object']['dereference'](this['variable']);
      this['event'] = this['option'] = this['variable'] = null;
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

    if (Object.keys(nodes = this['variable']['nodes']).length === 0) return;

    // 移除所有事件
    Object.values(this['variable']['eventSymbol']).forEach(symbol => ModalLayer['_assistant']['event']['remove'](symbol));
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
        'type': ModalLayer['_enum']['TYPE']['MESSAGE']
      }
    else
      options.type = ModalLayer['_enum']['TYPE']['MESSAGE'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('message'))(options, reject);

    // 初始化模态层大小
    layer.resize();

    // 初始化模态层位置
    layer['positioning']();

    // 显示
    layer.show();

    return layer;
  }

  /**
   * tips层
   *
   * @param   {Mixed}      options 模态层设置
   * @param   {Function}   reject  当出现错误时调用方法
   *
   * @return  {ModalLayer}         模态层实例
   */
  static tips(options,reject){
    let layer = null;
    if(typeof options === 'string')
      options = {
        'content': options,
        'type': ModalLayer['_enum']['TYPE']['TIPS']
      }
    else
      options.type = ModalLayer['_enum']['TYPE']['TIPS'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('tips'))(options,reject);

    // 重绘模态层大小
    layer.resize();

    //初始化模态层定位
    layer['positioning']();

    //显示
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
    options.type = ModalLayer['_enum']['TYPE']['ALERT'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('alert'))(options, reject);

    // 初始化模态层大小
    layer.resize();

    // 初始化模态层位置
    layer['positioning']();

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
    options.type = ModalLayer['_enum']['TYPE']['CONFIRM'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('confirm'))(options, reject);

    // 初始化模态层大小
    layer.resize();

    // 初始化模态层位置
    layer['positioning']();

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
    options.type = ModalLayer['_enum']['TYPE']['PROMPT'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('prompt'))(options, reject);

    // 初始化模态层大小
    layer.resize();

    // 初始化模态层位置
    layer['positioning']();

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
    options.type = ModalLayer['_enum']['TYPE']['PAGE'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('page'))(options, reject);

    // 初始化模态层大小
    layer.resize();

    // 初始化模态层位置
    layer['positioning']();

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
    options.type = ModalLayer['_enum']['TYPE']['IMAGE'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('image'))(options, reject);

    layer['variable']['image']['finish']

    // 初始化模态层大小
    .then(() => {
      layer.resize();
      layer['variable']['image']['layer'].resize();
    })

    // 初始化模态层位置
    .then(() => {
      layer['positioning']();
      layer['variable']['image']['layer']['positioning']();
    })

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
    options.type = ModalLayer['_enum']['TYPE']['LOADING'];

    // 实例化
    layer = new (ModalLayer['_achieve'].get('loading'))(options, reject);

    // 初始化模态层大小
    layer.resize();

    // 初始化模态层位置
    layer['positioning']();

    // 显示
    layer.show();

    return layer;
  }
}
// 密封类
Object.seal(ModalLayer);

if (Object.is(window['ModalLayer'], ModalLayer)) {
  console.group('ModalLayer already exists');
  console.log(`Already version ${window['ModalLayer']['_version']}`);
  console.log(`Try to introduce version: ${ModalLayer['_version']}`);
  console.groupEnd();
} else {
  Object.preventExtensions(ModalLayer);
  Object.defineProperty(window, 'ModalLayer', {'value': ModalLayer});
}
