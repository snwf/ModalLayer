/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 17:48:27
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-17 02:46:26
*/

/**
 * 监听事件
 *
 * @type {Object}
 */
const EVENT = {};

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
    'cancel': function (self) {void self.remove();}
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
      if (v['status'] === ModalLayer['_ENUM']['STATUS']['SHOW']) showLayers++;
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
    let status;
    let nowTime;
    let mousePoint, mousemoveEvent;
    let target, trigger, targetRect;
    let boundary, parentWindow, parentWindowRect;

    status = this['status'];
    nowTime = Date.now();
    dEvent = dEvent ?? window.event;
    // 目标元素
    target = this['variable']['nodes']['container'];
    // 目标元素Rect
    targetRect = target.getBoundingClientRect();
    // 鼠标按下时的坐标
    mousePoint = [dEvent.screenX, dEvent.screenY];
    // 触发元素
    trigger = target.querySelector('.modal-layer-title');
    // 拖拽目标元素父窗体
    parentWindow = window.document.documentElement;
    // 父窗体Rect
    parentWindowRect = parentWindow.getBoundingClientRect();
    // 父窗体边界值(左右边界值, 上下边界值)
    boundary = [parentWindowRect.x, parentWindowRect.x + parentWindowRect.width, parentWindowRect.x, parentWindowRect.y + parentWindowRect.height]

    // 取消文字选中
    window.getSelection().empty();

    // 统一移动方法
    let targetMoveMethod = (movementX, movementY) => {
      if (mousemoveEvent.buttons !== 1) {
        mouseUpEvent();
      } else {
        if (!this['option']['drag']['overflow']) {
          if (targetRect.x + movementX < boundary[0])
            targetRect.x = boundary[0] - movementX;
          if (targetRect.right + movementX > boundary[1])
            targetRect.x = boundary[1] - targetRect.width - movementX;
          if (targetRect.y + movementY < boundary[2])
            targetRect.y = boundary[2] - movementY;
          if (targetRect.bottom + movementY > boundary[3])
            targetRect.y = boundary[3] - targetRect.height - movementY;
        }

        targetRect.x += movementX;
        targetRect.y += movementY;

        if (this['option']['resize']['enable'] && this['option']['content']['fullContainer']) {
          let resizeW, boundaryX, boundaryY;
          
          resizeW = 5;
          boundaryX = [resizeW, boundary[1] - targetRect.width - resizeW];
          boundaryY = [resizeW, boundary[3] - targetRect.height - resizeW];

          if (targetRect.x <= boundaryX[0])
            targetRect.x = boundaryX[0];
          else if (targetRect.x >= boundaryX[1])
            targetRect.x = boundaryX[1];

          if (targetRect.y <= boundaryY[0])
            targetRect.y = boundaryY[0];
          else if (targetRect.y >= boundaryY[1])
            targetRect.y = boundaryY[1];
        }

        target.style.marginLeft = targetRect.x + 'px';
        target.style.marginTop = targetRect.y + 'px';

        this['setStatus']('drag');
      }
    }

    // 鼠标移动事件
    let mouseMoveEvent = moveEvent => {
      moveEvent = mousemoveEvent = moveEvent ?? window.event;
      targetMoveMethod(moveEvent.movementX, moveEvent.movementY);
    };

    // 方向键调整
    let keyupEvent = kEvent => {
      let movement;

      movement = [];
      kEvent = kEvent ?? window.event;

      switch (kEvent.code) {
        // up
        case 'ArrowUp':
          movement[1] = -1;
          break;
        // doww
        case 'ArrowDown':
          movement[1] = 1;
          break;
        // left
        case 'ArrowLeft':
          movement[0] = -1;
          break;
        // right
        case 'ArrowRight':
          movement[0] = 1;
          break;
        default:
          return;
      }

      // 取消默认动作，从而避免处理两次
      kEvent.preventDefault();

      targetMoveMethod(movement[0], movement[1]);
    }
    
    // 放开鼠标事件
    let mouseUpEvent = () => {
      document.removeEventListener('keyup', keyupEvent, true);
      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mouseup', mouseUpEvent);

      this['setStatus'](status);
    };

    document.addEventListener('mouseup', mouseUpEvent);
    document.addEventListener('mousemove', mouseMoveEvent);
    document.addEventListener('keyup', keyupEvent, true);
  }
});

/**
 * 调整容器大小事件
 *
 * @Author   Wolf
 * @DateTime 2020-09-04T00:04:17+0800
 * @param    {MouseEvent}                 dEvent 鼠标按下事件对象
 */
Object.defineProperty(EVENT, 'resize', {
  'enumerable': true,
  'value': function (dEvent) {
    let status;
    let nowTime;
    let windowRect;
    let mousePoint, mousemoveEvent;
    let target, trigger, targetArea, targetRect, targetMinArea;

    status = this['status'];
    nowTime = Date.now();
    dEvent = dEvent ?? window.event;
    // 触发元素
    trigger = dEvent.target;
    // 目标元素
    target = this['variable']['nodes']['container'];
    // 目标元素Rect
    targetRect = target.getBoundingClientRect();
    // 目标元素最小大小
    targetMinArea = this['variable']['defaultArea'];
    // 鼠标按下时的坐标
    mousePoint = [dEvent.screenX, dEvent.screenY];
    // 目标元素长宽
    targetArea = [targetRect.width, targetRect.height];
    // 窗口Rect
    windowRect = document.documentElement.getBoundingClientRect();

    // 取消文字选中
    window.getSelection().empty();

    // 伸缩之前加上遮罩层防止选中某些元素意外执行事件
    // 需要再外层也加上遮罩层, 否则可能会出现多个page层互相影响的情况.
    // let resizeMask = target.querySelector('.modal-layer-resize-mask');
    // let resizeBodyMask = document.querySelector('.modal-layer-resize-mask');
    // if (!resizeMask) {
    //   resizeMask = ModalLayer.utils.common.objectToDom([this.nodeData.resizeMask])[0];
    //   target.insertAdjacentElement('afterbegin', resizeMask);
    // }
    // if (resizeBodyMask.parentNode !== document.body || resizeMask === resizeBodyMask || !resizeBodyMask) {
    //   resizeBodyMask = ModalLayer.utils.common.objectToDom([this.nodeData.resizeMask])[0];
    //   resizeBodyMask.style.zIndex = parseInt(target.style.zIndex) - 1;
    //   resizeBodyMask.style.cssText += 'top: 0; left: 0; right: 0; bottom: 0; position: fixed;';
    //   document.body.insertAdjacentElement('afterbegin', resizeBodyMask);
    // }
    // resizeMask.style.visibility = 'visible';
    // resizeBodyMask.style.visibility = 'visible';

    let mouseMoveEvent = mEvent => {
      let resizePos;
      let moveNow, movementX, movementY;

      if (mEvent.buttons !== 1) {
        mouseUpEvent();
        return;
      } else {
        this['setStatus']('resize');

        mEvent = mEvent ?? window.event;
        movementX = mEvent.screenX - mousePoint[0];
        movementY = mEvent.screenY - mousePoint[1];
        resizePos = trigger.getAttribute('position-resize-bar');
        moveNow = [targetRect.x, targetRect.y, targetArea[0], targetArea[1]];

        if (resizePos.includes('top')) {
          moveNow[1] += movementY;
          moveNow[3] -= movementY;
          if (moveNow[1] < windowRect.y)
            moveNow[3] -= windowRect.y - moveNow[1];
          if (moveNow[3] < targetMinArea[1]) {
            moveNow[1] += moveNow[3] - targetMinArea[1];
            moveNow[3] = targetMinArea[1];
          }
        }
        if (resizePos.includes('bottom')) {
          moveNow[3] += movementY;
          if (moveNow[3] < targetMinArea[1])
            moveNow[3] = targetMinArea[1];
        }
        if (resizePos.includes('left')) {
          moveNow[0] += movementX;
          moveNow[2] -= movementX;
          if (moveNow[0] < windowRect.x)
            moveNow[2] -= windowRect.x - moveNow[0];
          if (moveNow[2] < targetMinArea[0]) {
            moveNow[0] += moveNow[2] - targetMinArea[0];
            moveNow[2] = targetMinArea[0];
          }
        }
        if (resizePos.includes('right')) {
          moveNow[2] += movementX;
          if (moveNow[2] < targetMinArea[0])
            moveNow[2] = targetMinArea[0];
        }

        this['resizeByXYWH'](Number(moveNow[0]), Number(moveNow[1]), Number(moveNow[2]), Number(moveNow[3]));
      }
    };


    // 放开鼠标事件
    let mouseUpEvent = () => {
      // 隐藏遮罩层
      // target.querySelector('.modal-layer-resize-mask').removeAttribute('style');
      // document.body.removeChild(document.querySelector('.modal-layer-resize-mask'));

      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mouseup', mouseUpEvent);

      this['setStatus'](status);
    };

    document.addEventListener('mouseup', mouseUpEvent);
    document.addEventListener('mousemove', mouseMoveEvent);
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
    'close': function (self) {void self.remove()},
    'expand': function (self) {
      let oldStatus;
      let nodes, pageNode;
      let fullscreenerrorListener, fullscreenchangeListener;

      oldStatus = self.status;
      nodes = self.variable.nodes;
      pageNode = nodes.container.querySelector('iframe[name=' + self.option.layer.name + self.option.index + ']');
      fullscreenchangeListener = event => {
        if (event.target === pageNode) {
          self.setStatus(ModalLayer['_ENUM']['STATUS'].EXPAND);
        } else if (event.target === false) {
          window.removeEventListener('fullscreenchange', fullscreenchangeListener);
          self.setStatus(oldStatus);
        }
      };

      fullscreenerrorListener = e => {
        ModalLayer.msg({
          mask: false,
          popupTime: 5,
          title: '错误',
          displayProgressBar: true,
          displayProgressBarPos: 'bottom',
          content: '<i class="fas fa-window-close" style="color: red"></i> 全屏失败, 错误原因: ' + e
        });
        window.removeEventListener('fullscreenerror', fullscreenerrorListener);
      };

      window.addEventListener('fullscreenerror', fullscreenerrorListener);
      window.addEventListener('fullscreenchange', fullscreenchangeListener);
      ModalLayer['_assistant']['element'].launchFullscreen(pageNode);
    },
    'minimize': function (self) {
      let index = ModalLayer['_minimizeQueue'].indexOf(self);
      if (index < 0)
        ModalLayer['_minimizeQueue'].push(self);
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
    'crop': function (self) {
      if (self['variable']['image']['status'] === ModalLayer['_ENUM']['LOAD_STATUS']['LOADED'])
        self['crop']();
    },
    // 旋转
    'spin': (self) => {
      if (self['variable']['image']['status'] === ModalLayer['_ENUM']['LOAD_STATUS']['LOADED'])
        self['spin']();
    },
    // 滤镜
    'filter': (self) => {
      if (self['variable']['image']['status'] === ModalLayer['_ENUM']['LOAD_STATUS']['LOADED'])
        self['filter'](window.event.target);
    },
    // 复位
    'revert': (self) => {
      if (self['variable']['image']['status'] === ModalLayer['_ENUM']['LOAD_STATUS']['LOADED'])
        self['revert']();
    },
    // 下载
    'download': (self) => {
      if (self['variable']['image']['status'] === ModalLayer['_ENUM']['LOAD_STATUS']['LOADED'])
        self['download']();
    }
  }
});