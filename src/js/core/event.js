/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 17:48:27
* @Description
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-11-18 02:22:57
*/

/**
 * 监听事件
 *
 * @type {Object}
 */
const EVENT = Object.create(null);

/**
 * 点击遮罩层关闭模态层
 *
 * @type {Function}
 */
Object.defineProperty(EVENT, 'clickMask', {
  'enumerable': true,
  'value': function () {void this.remove()}
});

/**
 * 交互事件
 *
 * @type {Object}
 */
Object.defineProperty(EVENT, 'interaction', {
  'enumerable': true,
  'value': {
    'ok': null,
    'no': null,
    'cancel': function () {void this.remove();}
  }
});

/**
 * 活动层
 *
 * @Author   Wolf
 * @DateTime 2020-09-01T19:59:15+0800
 * @param    {Event}                 dEvent Event对象
 * @return   {Void}
 */
Object.defineProperty(EVENT, 'active', {
  'enumerable': true,
  'value': function (dEvent) {
    let nodes;
    let maxZIndex;
    let showLayers;

    showLayers = 0;
    nodes = this['variable']['nodes'];
    dEvent = dEvent ?? window.event;

    ModalLayer['_instance'].forEach(v => {
      if (v['status'] === ModalLayer['_enum']['STATUS']['SHOW']) showLayers++;
    });

    if (showLayers >= 2) {
      maxZIndex = ModalLayer['_assistant']['element']['maxZIndex']();
      if (nodes['container'].style.zIndex == maxZIndex) return;
      Object.keys(nodes).forEach(k => {
        nodes[k].style.zIndex = maxZIndex + 1;
      });

      nodes['container'].style.zIndex = parseInt(nodes['container'].style.zIndex) + 1;
    }
  }
});

/**
 * 容器拖拽事件
 *
 * @Author   Wolf
 * @DateTime 2020-09-04T00:03:38+0800
 * @param    {MouseEvent}                 dEvent 鼠标按下事件对象
 */
Object.defineProperty(EVENT, 'drag', {
  'enumerable': true,
  'value': function (dEvent) {
    let status, moveMethod;
    let boundary, parentNode;
    let target, trigger, mousePoint, targetRect;
    let parentComputedStyle, parentComputedStyleObj;
    let mEvent, mouseupEvent, keydownEvent, mousemoveEvent;

    status = this['status'];
    dEvent = dEvent ?? window.event;
    // 目标元素
    target = this['variable']['nodes']['container'];
    // 目标元素Rect
    targetRect = target.getBoundingClientRect();
    // 鼠标按下时的坐标
    mousePoint = [dEvent.screenX, dEvent.screenY];
    // 触发元素
    trigger = target.querySelector('.modal-layer-title');

    if (this['option']['window']) {
      parentNode = this['option']['window'] === document.body ? document.documentElement : this['option']['window'];
      // 父节点计算后的样式
      parentComputedStyle = this['option']['window'] ? window.getComputedStyle(this['option']['window']) : null;
      parentComputedStyleObj = {
        marginTop: parseInt(parentComputedStyle?.marginTop ?? 0),
        paddingTop: parseInt(parentComputedStyle?.paddingTop ?? 0),
        marginLeft: parseInt(parentComputedStyle?.marginLeft ?? 0),
        paddingLeft: parseInt(parentComputedStyle?.paddingLeft ?? 0),
        marginRight: parseInt(parentComputedStyle?.marginRight ?? 0),
        paddingRight: parseInt(parentComputedStyle?.paddingRight ?? 0),
        marginBottom: parseInt(parentComputedStyle?.marginBottom ?? 0),
        paddingBottom: parseInt(parentComputedStyle?.paddingBottom ?? 0)
      }
      // 父窗体边界值(左右边界值, 上下边界值)
      boundary = [
        0,
        parentNode.offsetWidth - parentComputedStyleObj.marginLeft - parentComputedStyleObj.marginRight - parentComputedStyleObj.paddingLeft - parentComputedStyleObj.paddingRight,
        0,
        parentNode.offsetHeight - parentComputedStyleObj.marginTop - parentComputedStyleObj.marginBottom - parentComputedStyleObj.paddingTop - parentComputedStyleObj.paddingBottom
      ];

      // 若有滚动并且未定义position则加上.
      if (this['option']['position']) {
        targetRect.y = target.offsetTop;
        targetRect.x = target.offsetLeft;
      } else {
        targetRect.y += parentNode?.scrollTop ?? 0;
        targetRect.x += parentNode?.scrollLeft ?? 0;
      }
    } else {
      // 父窗体边界值(左右边界值, 上下边界值)
      boundary = [0, document.documentElement.clientWidth, 0, document.documentElement.clientHeight];
    }

    // 取消文字选中
    window.getSelection().empty();

    // 统一移动方法
    moveMethod = (movementX, movementY) => {
      targetRect.x += movementX;
      targetRect.y += movementY;

      if (!this['option']['drag']['overflow']) {
        if (
          targetRect.x < boundary[0] ||
          targetRect.x > boundary[1] - targetRect.width
        )
          targetRect.x -= movementX;

        if (
          targetRect.y < boundary[2] ||
          targetRect.y > boundary[3] - targetRect.height
        )
          targetRect.y -= movementY;
      }

      this.resizeBy(targetRect.x, targetRect.y, targetRect.width, targetRect.height);

      this['setStatus'](ModalLayer['_enum']['STATUS']['DRAG']);
    };

    // 鼠标移动事件
    mousemoveEvent = e => {
      mEvent = e ?? window.event;
      if (mEvent.buttons === 1) moveMethod(mEvent.movementX, mEvent.movementY);
    };

    // 方向键调整
    // 由于手边没有无冲突键盘, 不知道会不会冲突.
    // 之后换键盘了再验证.
    // TODO::CHECK
    keydownEvent = kEvent => {
      let movement;

      movement = [0, 0];
      kEvent = kEvent ?? window.event;

      // left
      if (kEvent.code === 'ArrowLeft') movement[0] = -1;
      // right
      if (kEvent.code === 'ArrowRight') movement[0] = 1;
      // up
      if (kEvent.code === 'ArrowUp') movement[1] = -1;
      // down
      if (kEvent.code === 'ArrowDown') movement[1] = 1;

      // 取消默认动作，从而避免处理两次
      kEvent.preventDefault();

      moveMethod(...movement);
    }
    
    // 放开鼠标事件
    mouseupEvent = () => {
      document.removeEventListener('keydown', keydownEvent, true);
      document.removeEventListener('mousemove', mousemoveEvent);
      document.removeEventListener('mouseup', mouseupEvent);

      this['setStatus'](status);
    };

    document.addEventListener('mouseup', mouseupEvent);
    document.addEventListener('mousemove', mousemoveEvent);
    document.addEventListener('keydown', keydownEvent, true);
  }
});

/**
 * 调整容器大小事件
 *
 * @Author   Wolf
 * @DateTime 2020-09-04T00:04:17+0800
 * @param    {MouseEvent}                 dEvent 鼠标按下事件对象
 */
// TODO 无法满足新的定位实现.
Object.defineProperty(EVENT, 'resize', {
  'enumerable': true,
  'value': function (dEvent) {
    let status;
    let boundary, parentNode;
    let target, trigger, targetArea, targetRect;
    let mousePoint, mouseupEvent, mousemoveEvent;
    let parentComputedStyle, parentComputedStyleObj;

    status = this['status'];
    dEvent = dEvent ?? window.event;
    // 触发元素
    trigger = dEvent.target;
    // 鼠标按下时的坐标
    mousePoint = [dEvent.x, dEvent.y];
    // 目标元素
    target = this['variable']['nodes']['container'];
    // 目标元素Rect
    targetRect = target.getBoundingClientRect();
    // 目标元素长宽
    targetArea = [targetRect.width, targetRect.height];
    // 父节点
    parentNode = this['option']['window'] === document.body ? document.documentElement : this['option']['window'];
    // 父节点计算后的样式
    parentComputedStyle = this['option']['window'] ? window.getComputedStyle(this['option']['window']) : null;
    parentComputedStyleObj = {
      marginTop: parseInt(parentComputedStyle?.marginTop ?? 0),
      paddingTop: parseInt(parentComputedStyle?.paddingTop ?? 0),
      marginLeft: parseInt(parentComputedStyle?.marginLeft ?? 0),
      paddingLeft: parseInt(parentComputedStyle?.paddingLeft ?? 0)
    }
    // 父节点Rect
    boundary = {x: 0, y: 0, width: parentNode?.offsetWidth ?? window.innerWidth, height: parentNode?.offsetHeight ?? window.innerHeight};

    // 取消文字选中
    window.getSelection().empty();

    // 若有滚动则加上.
    if (this['option']['position']) {
      targetRect.y = target.offsetTop;
      targetRect.x = target.offsetLeft;
    } else {
      targetRect.y += parentNode ? parentNode.scrollTop - parentComputedStyleObj.marginTop - parentComputedStyleObj.paddingTop : 0;
      targetRect.x += parentNode ? parentNode.scrollLeft - parentComputedStyleObj.marginLeft - parentComputedStyleObj.paddingLeft  : 0;
    }
    mousemoveEvent = mEvent => {
      let resizePos;
      let moveNow, movementX, movementY;

      mEvent = mEvent ?? window.event;
      if (mEvent.buttons !== 1) {
        mouseupEvent();
        return;
      }

      this['setStatus']('resize');

      resizePos = trigger.getAttribute('position-resize-bar');

      if (resizePos.includes('top')) {
        if (
            targetRect.y + mEvent.movementY > boundary.y &&
            targetRect.height - mEvent.movementY > this['variable']['defaultRect']['height']
          ) {
          targetRect.y += mEvent.movementY;
          targetRect.height -= mEvent.movementY;
        }
      }
      if (resizePos.includes('bottom')) {
        targetRect.height += mEvent.movementY;
        if (
          targetRect.y + targetRect.height > boundary.height ||
          targetRect.height < this['variable']['defaultRect']['height']
        )
          targetRect.height -= mEvent.movementY;
      }
      if (resizePos.includes('left')) {
        if (
            targetRect.x + mEvent.movementX > boundary.x &&
            targetRect.width - mEvent.movementX > this['variable']['defaultRect']['width']
          ) {
          targetRect.x += mEvent.movementX;
          targetRect.width -= mEvent.movementX;
        }
      }
      if (resizePos.includes('right')) {
        targetRect.width += mEvent.movementX;
        if (
          targetRect.x + targetRect.width > boundary.width ||
          targetRect.width < this['variable']['defaultRect']['width']
        )
          targetRect.width -= mEvent.movementX;
      }
      this.resizeBy(targetRect.x, targetRect.y, targetRect.width, targetRect.height);
    };


    // 放开鼠标事件
    mouseupEvent = () => {

      document.removeEventListener('mousemove', mousemoveEvent);
      document.removeEventListener('mouseup', mouseupEvent);

      this['setStatus'](status);
    };

    document.addEventListener('mouseup', mouseupEvent);
    document.addEventListener('mousemove', mousemoveEvent);
  }
});

/**
 * 模态层最小化还原监听
 *
 * @Author   Wolf
 * @DateTime 2020-09-04T00:03:26+0800
 */
Object.defineProperty(EVENT, 'minimizeRevert', {
  'enumerable': true,
  'value': function () {
    let modalIndex;

    if (this.getAttribute('clicked') == '1') return;
    
    this.setAttribute('clicked', 1);

    modalIndex = Number(this.getAttribute('modal-layer-index'));

    delete ModalLayer['_minimizeQueue'][ModalLayer['_minimizeQueue'].indexOf(ModalLayer['_instance'][modalIndex])];
  }
});

/**
 * 自动关闭模态层
 *
 * @type {Function}
 */
Object.defineProperty(EVENT, 'autoShutdown', {
  'enumerable': true,
  'value': function (e) {
    let interval, showCls, totalTime;

    showCls = 'modal-layer-show';
    totalTime = this['option']['popupTime'] * 1000;

    interval = setInterval(() => {
      if (this['variable']['nodes']['container'].classList.contains(showCls)) {
        if (this['option']['progress']['enable']) {
          let animationName, progressNode;
          progressNode = this['variable']['nodes']['container'].querySelector('.modal-layer-progress-bar-progress');
          switch (this['option']['progress']['position']) {
            case 'top':
            case 'bottom':
              animationName = 'widthFull';
              break;
            case 'left':
            case 'right':
              animationName = 'heightFull';
              break;
            default:
              break;
          }
          progressNode.style.animation = animationName + ' ' + this['option']['popupTime'] + 's linear forwards';
        }

        this['variable']['timeout']['auto_shutdown'] = setTimeout(() => void this.remove(), totalTime);

        window.clearInterval(interval);
      }
    }, 10);
  }
});

/**
 * action事件
 *
 * @type {Object}
 */
Object.defineProperty(EVENT, 'action', {
  'enumerable': true,
  'value': {
    'close': function (e) {void this.remove()},
    'expand': function (e) {
      let oldStatus;
      let pageNode, container;
      let fullscreenerrorListener, fullscreenchangeListener;

      oldStatus = this.status;
      container = this['variable']['nodes']['container'];
      pageNode = container.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');
      fullscreenchangeListener = event => {
        if (event.target === pageNode)
          this['setStatus'](ModalLayer['_enum']['STATUS']['EXPAND']);
        else if (event.target === false)
          this['setStatus'](oldStatus);
        window.removeEventListener('fullscreenerror', fullscreenerrorListener);
        window.removeEventListener('fullscreenchange', fullscreenchangeListener);
      };

      fullscreenerrorListener = error => {
        ModalLayer.msg({
          mask: false,
          popupTime: 5,
          title: '错误',
          displayProgressBar: true,
          displayProgressBarPos: 'bottom',
          content: '<i class="fas fa-window-close" style="color: red"></i> 全屏失败, 错误原因: ' + error
        });
        window.removeEventListener('fullscreenerror', fullscreenerrorListener);
        window.removeEventListener('fullscreenchange', fullscreenchangeListener);
      };

      window.addEventListener('fullscreenerror', fullscreenerrorListener);
      window.addEventListener('fullscreenchange', fullscreenchangeListener);
      ModalLayer['_assistant']['element']['launchFullscreen'](pageNode);
    },
    'minimize': function (e) {
      let index = ModalLayer['_minimizeQueue'].indexOf(this);
      if (index < 0)
        ModalLayer['_minimizeQueue'].push(this);
      else
        ModalLayer['_minimizeQueue'].splice(index, 1);
    },
  }
});

/**
 * 图片层工具栏相关监听事件
 *
 * @type {Object}
 */
Object.defineProperty(EVENT, 'imageTools', {
  'enumerable': true,
  'value': {
    // 裁剪
    'crop': function () {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED'])
        this['crop']();
    },
    // 旋转
    'spin': function () {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED'])
        this['spin']();
    },
    // 滤镜
    'filter': function (e) {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED'])
        this['filter']((e ?? window.event).target);
    },
    // 复位
    'revert': function () {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED'])
        this['revert']();
    },
    // 下载
    'download': function () {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED'])
        this['download']();
    }
  }
});

Object.freeze(EVENT);
