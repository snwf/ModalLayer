"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ENV = Object.create(null);
ENV['browser'] = Object.create(null);
ENV['feature'] = Object.create(null);
['proxy', 'symbol', 'worker', 'promise'].forEach(function (name) {
  name = name[0].toUpperCase() + name.substring(1);
  ENV['feature'][name] = window[name] ? true : false;
});
Object.freeze(ENV);
var EVENT = Object.create(null);
Object.defineProperty(EVENT, 'clickMask', {
  'enumerable': true,
  'value': function value() {
    void this.remove();
  }
});
Object.defineProperty(EVENT, 'interaction', {
  'enumerable': true,
  'value': {
    'ok': null,
    'no': null,
    'cancel': function cancel() {
      void this.remove();
    }
  }
});
Object.defineProperty(EVENT, 'active', {
  'enumerable': true,
  'value': function value(dEvent) {
    var _dEvent;

    var nodes;
    var maxZIndex;
    var showLayers;
    showLayers = 0;
    nodes = this['variable']['nodes'];
    dEvent = (_dEvent = dEvent) !== null && _dEvent !== void 0 ? _dEvent : window.event;
    ModalLayer['_instance'].forEach(function (v) {
      if (v['status'] === ModalLayer['_enum']['STATUS']['SHOW']) showLayers++;
    });

    if (showLayers >= 2) {
      maxZIndex = ModalLayer['_assistant']['element']['maxZIndex']();
      if (nodes['container'].style.zIndex == maxZIndex) return;
      Object.keys(nodes).forEach(function (k) {
        nodes[k].style.zIndex = maxZIndex + 1;
      });
      nodes['container'].style.zIndex = parseInt(nodes['container'].style.zIndex) + 1;
    }
  }
});
Object.defineProperty(EVENT, 'drag', {
  'enumerable': true,
  'value': function value(dEvent) {
    var _dEvent2,
        _this = this;

    var status, moveMethod;
    var boundary, parentNode;
    var target, trigger, mousePoint, targetRect;
    var parentComputedStyle, parentComputedStyleObj;

    var mEvent, _mouseupEvent, keydownEvent, mousemoveEvent;

    status = this['status'];
    dEvent = (_dEvent2 = dEvent) !== null && _dEvent2 !== void 0 ? _dEvent2 : window.event;
    target = this['variable']['nodes']['container'];
    targetRect = target.getBoundingClientRect();
    mousePoint = [dEvent.screenX, dEvent.screenY];
    trigger = target.querySelector('.modal-layer-title');

    if (this['option']['window']) {
      var _parentComputedStyle$, _parentComputedStyle, _parentComputedStyle$2, _parentComputedStyle2, _parentComputedStyle$3, _parentComputedStyle3, _parentComputedStyle$4, _parentComputedStyle4, _parentComputedStyle$5, _parentComputedStyle5, _parentComputedStyle$6, _parentComputedStyle6, _parentComputedStyle$7, _parentComputedStyle7, _parentComputedStyle$8, _parentComputedStyle8;

      parentNode = this['option']['window'] === document.body ? document.documentElement : this['option']['window'];
      parentComputedStyle = this['option']['window'] ? window.getComputedStyle(this['option']['window']) : null;
      parentComputedStyleObj = {
        marginTop: parseInt((_parentComputedStyle$ = (_parentComputedStyle = parentComputedStyle) === null || _parentComputedStyle === void 0 ? void 0 : _parentComputedStyle.marginTop) !== null && _parentComputedStyle$ !== void 0 ? _parentComputedStyle$ : 0),
        paddingTop: parseInt((_parentComputedStyle$2 = (_parentComputedStyle2 = parentComputedStyle) === null || _parentComputedStyle2 === void 0 ? void 0 : _parentComputedStyle2.paddingTop) !== null && _parentComputedStyle$2 !== void 0 ? _parentComputedStyle$2 : 0),
        marginLeft: parseInt((_parentComputedStyle$3 = (_parentComputedStyle3 = parentComputedStyle) === null || _parentComputedStyle3 === void 0 ? void 0 : _parentComputedStyle3.marginLeft) !== null && _parentComputedStyle$3 !== void 0 ? _parentComputedStyle$3 : 0),
        paddingLeft: parseInt((_parentComputedStyle$4 = (_parentComputedStyle4 = parentComputedStyle) === null || _parentComputedStyle4 === void 0 ? void 0 : _parentComputedStyle4.paddingLeft) !== null && _parentComputedStyle$4 !== void 0 ? _parentComputedStyle$4 : 0),
        marginRight: parseInt((_parentComputedStyle$5 = (_parentComputedStyle5 = parentComputedStyle) === null || _parentComputedStyle5 === void 0 ? void 0 : _parentComputedStyle5.marginRight) !== null && _parentComputedStyle$5 !== void 0 ? _parentComputedStyle$5 : 0),
        paddingRight: parseInt((_parentComputedStyle$6 = (_parentComputedStyle6 = parentComputedStyle) === null || _parentComputedStyle6 === void 0 ? void 0 : _parentComputedStyle6.paddingRight) !== null && _parentComputedStyle$6 !== void 0 ? _parentComputedStyle$6 : 0),
        marginBottom: parseInt((_parentComputedStyle$7 = (_parentComputedStyle7 = parentComputedStyle) === null || _parentComputedStyle7 === void 0 ? void 0 : _parentComputedStyle7.marginBottom) !== null && _parentComputedStyle$7 !== void 0 ? _parentComputedStyle$7 : 0),
        paddingBottom: parseInt((_parentComputedStyle$8 = (_parentComputedStyle8 = parentComputedStyle) === null || _parentComputedStyle8 === void 0 ? void 0 : _parentComputedStyle8.paddingBottom) !== null && _parentComputedStyle$8 !== void 0 ? _parentComputedStyle$8 : 0)
      };
      boundary = [0, parentNode.offsetWidth - parentComputedStyleObj.marginLeft - parentComputedStyleObj.marginRight - parentComputedStyleObj.paddingLeft - parentComputedStyleObj.paddingRight, 0, parentNode.offsetHeight - parentComputedStyleObj.marginTop - parentComputedStyleObj.marginBottom - parentComputedStyleObj.paddingTop - parentComputedStyleObj.paddingBottom];

      if (this['option']['position']) {
        targetRect.y = target.offsetTop;
        targetRect.x = target.offsetLeft;
      } else {
        var _parentNode$scrollTop, _parentNode, _parentNode$scrollLef, _parentNode2;

        targetRect.y += (_parentNode$scrollTop = (_parentNode = parentNode) === null || _parentNode === void 0 ? void 0 : _parentNode.scrollTop) !== null && _parentNode$scrollTop !== void 0 ? _parentNode$scrollTop : 0;
        targetRect.x += (_parentNode$scrollLef = (_parentNode2 = parentNode) === null || _parentNode2 === void 0 ? void 0 : _parentNode2.scrollLeft) !== null && _parentNode$scrollLef !== void 0 ? _parentNode$scrollLef : 0;
      }
    } else {
      boundary = [0, document.documentElement.clientWidth, 0, document.documentElement.clientHeight];
    }

    window.getSelection().empty();

    moveMethod = function moveMethod(movementX, movementY) {
      targetRect.x += movementX;
      targetRect.y += movementY;

      if (!_this['option']['drag']['overflow']) {
        if (targetRect.x < boundary[0] || targetRect.x > boundary[1] - targetRect.width) targetRect.x -= movementX;
        if (targetRect.y < boundary[2] || targetRect.y > boundary[3] - targetRect.height) targetRect.y -= movementY;
      }

      _this.resizeBy(targetRect.x, targetRect.y, targetRect.width, targetRect.height);

      _this['setStatus'](ModalLayer['_enum']['STATUS']['DRAG']);
    };

    mousemoveEvent = function mousemoveEvent(e) {
      mEvent = e !== null && e !== void 0 ? e : window.event;
      if (mEvent.buttons === 1) moveMethod(mEvent.movementX, mEvent.movementY);
    };

    keydownEvent = function keydownEvent(kEvent) {
      var _kEvent;

      var movement;
      movement = [0, 0];
      kEvent = (_kEvent = kEvent) !== null && _kEvent !== void 0 ? _kEvent : window.event;
      if (kEvent.code === 'ArrowLeft') movement[0] = -1;
      if (kEvent.code === 'ArrowRight') movement[0] = 1;
      if (kEvent.code === 'ArrowUp') movement[1] = -1;
      if (kEvent.code === 'ArrowDown') movement[1] = 1;
      kEvent.preventDefault();
      moveMethod.apply(void 0, _toConsumableArray(movement));
    };

    _mouseupEvent = function mouseupEvent() {
      document.removeEventListener('keydown', keydownEvent, true);
      document.removeEventListener('mousemove', mousemoveEvent);
      document.removeEventListener('mouseup', _mouseupEvent);

      _this['setStatus'](status);
    };

    document.addEventListener('mouseup', _mouseupEvent);
    document.addEventListener('mousemove', mousemoveEvent);
    document.addEventListener('keydown', keydownEvent, true);
  }
});
Object.defineProperty(EVENT, 'resize', {
  'enumerable': true,
  'value': function value(dEvent) {
    var _dEvent3,
        _parentComputedStyle$9,
        _parentComputedStyle9,
        _parentComputedStyle$10,
        _parentComputedStyle10,
        _parentComputedStyle$11,
        _parentComputedStyle11,
        _parentComputedStyle$12,
        _parentComputedStyle12,
        _parentNode$offsetWid,
        _parentNode3,
        _parentNode$offsetHei,
        _parentNode4,
        _this2 = this;

    var status;
    var boundary, parentNode;
    var target, trigger, targetArea, targetRect;

    var mousePoint, _mouseupEvent2, mousemoveEvent;

    var parentComputedStyle, parentComputedStyleObj;
    status = this['status'];
    dEvent = (_dEvent3 = dEvent) !== null && _dEvent3 !== void 0 ? _dEvent3 : window.event;
    trigger = dEvent.target;
    mousePoint = [dEvent.x, dEvent.y];
    target = this['variable']['nodes']['container'];
    targetRect = target.getBoundingClientRect();
    targetArea = [targetRect.width, targetRect.height];
    parentNode = this['option']['window'] === document.body ? document.documentElement : this['option']['window'];
    parentComputedStyle = this['option']['window'] ? window.getComputedStyle(this['option']['window']) : null;
    parentComputedStyleObj = {
      marginTop: parseInt((_parentComputedStyle$9 = (_parentComputedStyle9 = parentComputedStyle) === null || _parentComputedStyle9 === void 0 ? void 0 : _parentComputedStyle9.marginTop) !== null && _parentComputedStyle$9 !== void 0 ? _parentComputedStyle$9 : 0),
      paddingTop: parseInt((_parentComputedStyle$10 = (_parentComputedStyle10 = parentComputedStyle) === null || _parentComputedStyle10 === void 0 ? void 0 : _parentComputedStyle10.paddingTop) !== null && _parentComputedStyle$10 !== void 0 ? _parentComputedStyle$10 : 0),
      marginLeft: parseInt((_parentComputedStyle$11 = (_parentComputedStyle11 = parentComputedStyle) === null || _parentComputedStyle11 === void 0 ? void 0 : _parentComputedStyle11.marginLeft) !== null && _parentComputedStyle$11 !== void 0 ? _parentComputedStyle$11 : 0),
      paddingLeft: parseInt((_parentComputedStyle$12 = (_parentComputedStyle12 = parentComputedStyle) === null || _parentComputedStyle12 === void 0 ? void 0 : _parentComputedStyle12.paddingLeft) !== null && _parentComputedStyle$12 !== void 0 ? _parentComputedStyle$12 : 0)
    };
    boundary = {
      x: 0,
      y: 0,
      width: (_parentNode$offsetWid = (_parentNode3 = parentNode) === null || _parentNode3 === void 0 ? void 0 : _parentNode3.offsetWidth) !== null && _parentNode$offsetWid !== void 0 ? _parentNode$offsetWid : window.innerWidth,
      height: (_parentNode$offsetHei = (_parentNode4 = parentNode) === null || _parentNode4 === void 0 ? void 0 : _parentNode4.offsetHeight) !== null && _parentNode$offsetHei !== void 0 ? _parentNode$offsetHei : window.innerHeight
    };
    window.getSelection().empty();

    if (this['option']['position']) {
      targetRect.y = target.offsetTop;
      targetRect.x = target.offsetLeft;
    } else {
      targetRect.y += parentNode ? parentNode.scrollTop - parentComputedStyleObj.marginTop - parentComputedStyleObj.paddingTop : 0;
      targetRect.x += parentNode ? parentNode.scrollLeft - parentComputedStyleObj.marginLeft - parentComputedStyleObj.paddingLeft : 0;
    }

    mousemoveEvent = function mousemoveEvent(mEvent) {
      var _mEvent;

      var resizePos;
      var moveNow, movementX, movementY;
      mEvent = (_mEvent = mEvent) !== null && _mEvent !== void 0 ? _mEvent : window.event;

      if (mEvent.buttons !== 1) {
        _mouseupEvent2();

        return;
      }

      _this2['setStatus']('resize');

      resizePos = trigger.getAttribute('position-resize-bar');

      if (resizePos.includes('top')) {
        if (targetRect.y + mEvent.movementY > boundary.y && targetRect.height - mEvent.movementY > _this2['variable']['defaultRect']['height']) {
          targetRect.y += mEvent.movementY;
          targetRect.height -= mEvent.movementY;
        }
      }

      if (resizePos.includes('bottom')) {
        targetRect.height += mEvent.movementY;
        if (targetRect.y + targetRect.height > boundary.height || targetRect.height < _this2['variable']['defaultRect']['height']) targetRect.height -= mEvent.movementY;
      }

      if (resizePos.includes('left')) {
        if (targetRect.x + mEvent.movementX > boundary.x && targetRect.width - mEvent.movementX > _this2['variable']['defaultRect']['width']) {
          targetRect.x += mEvent.movementX;
          targetRect.width -= mEvent.movementX;
        }
      }

      if (resizePos.includes('right')) {
        targetRect.width += mEvent.movementX;
        if (targetRect.x + targetRect.width > boundary.width || targetRect.width < _this2['variable']['defaultRect']['width']) targetRect.width -= mEvent.movementX;
      }

      _this2.resizeBy(targetRect.x, targetRect.y, targetRect.width, targetRect.height);
    };

    _mouseupEvent2 = function mouseupEvent() {
      document.removeEventListener('mousemove', mousemoveEvent);
      document.removeEventListener('mouseup', _mouseupEvent2);

      _this2['setStatus'](status);
    };

    document.addEventListener('mouseup', _mouseupEvent2);
    document.addEventListener('mousemove', mousemoveEvent);
  }
});
Object.defineProperty(EVENT, 'minimizeRevert', {
  'enumerable': true,
  'value': function value() {
    var modalIndex;
    if (this.getAttribute('clicked') == '1') return;
    this.setAttribute('clicked', 1);
    modalIndex = Number(this.getAttribute('modal-layer-index'));
    delete ModalLayer['_minimizeQueue'][ModalLayer['_minimizeQueue'].indexOf(ModalLayer['_instance'][modalIndex])];
  }
});
Object.defineProperty(EVENT, 'autoShutdown', {
  'enumerable': true,
  'value': function value(e) {
    var _this3 = this;

    var interval, showCls, totalTime;
    showCls = 'modal-layer-show';
    totalTime = this['option']['popupTime'] * 1000;
    interval = setInterval(function () {
      if (_this3['variable']['nodes']['container'].classList.contains(showCls)) {
        if (_this3['option']['progress']['enable']) {
          var animationName, progressNode;
          progressNode = _this3['variable']['nodes']['container'].querySelector('.modal-layer-progress-bar-progress');

          switch (_this3['option']['progress']['position']) {
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

          progressNode.style.animation = animationName + ' ' + _this3['option']['popupTime'] + 's linear forwards';
        }

        _this3['variable']['timeout']['auto_shutdown'] = setTimeout(function () {
          return void _this3.remove();
        }, totalTime);
        window.clearInterval(interval);
      }
    }, 10);
  }
});
Object.defineProperty(EVENT, 'action', {
  'enumerable': true,
  'value': {
    'close': function close(e) {
      void this.remove();
    },
    'expand': function expand(e) {
      var _this4 = this;

      var oldStatus;
      var pageNode, container;

      var _fullscreenerrorListener, _fullscreenchangeListener;

      oldStatus = this.status;
      container = this['variable']['nodes']['container'];
      pageNode = container.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');

      _fullscreenchangeListener = function fullscreenchangeListener(event) {
        if (event.target === pageNode) _this4['setStatus'](ModalLayer['_enum']['STATUS']['EXPAND']);else if (event.target === false) _this4['setStatus'](oldStatus);
        window.removeEventListener('fullscreenerror', _fullscreenerrorListener);
        window.removeEventListener('fullscreenchange', _fullscreenchangeListener);
      };

      _fullscreenerrorListener = function fullscreenerrorListener(error) {
        ModalLayer.msg({
          mask: false,
          popupTime: 5,
          title: '错误',
          displayProgressBar: true,
          displayProgressBarPos: 'bottom',
          content: '<i class="fas fa-window-close" style="color: red"></i> 全屏失败, 错误原因: ' + error
        });
        window.removeEventListener('fullscreenerror', _fullscreenerrorListener);
        window.removeEventListener('fullscreenchange', _fullscreenchangeListener);
      };

      window.addEventListener('fullscreenerror', _fullscreenerrorListener);
      window.addEventListener('fullscreenchange', _fullscreenchangeListener);
      ModalLayer['_assistant']['element']['launchFullscreen'](pageNode);
    },
    'minimize': function minimize(e) {
      var index = ModalLayer['_minimizeQueue'].indexOf(this);
      if (index < 0) ModalLayer['_minimizeQueue'].push(this);else ModalLayer['_minimizeQueue'].splice(index, 1);
    }
  }
});
Object.defineProperty(EVENT, 'imageTools', {
  'enumerable': true,
  'value': {
    'crop': function crop() {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED']) this['crop']();
    },
    'spin': function spin() {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED']) this['spin']();
    },
    'filter': function filter(e) {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED']) this['filter']((e !== null && e !== void 0 ? e : window.event).target);
    },
    'revert': function revert() {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED']) this['revert']();
    },
    'download': function download() {
      if (this['variable']['image']['status'] === ModalLayer['_enum']['LOAD_STATUS']['LOADED']) this['download']();
    }
  }
});
Object.freeze(EVENT);
var OPTION = Object.create(null);
Object.defineProperty(OPTION, 'page', {
  'value': {
    'src': null,
    'srcdoc': null,
    'frameborder': 0,
    'scrolling': 'no',
    'area': [800, 600],
    'allowfullscreen': true,
    'name': 'modal-layer-page-'
  }
});
Object.defineProperty(OPTION, 'tips', {
  'value': {
    'location': null,
    'position': 3,
    'iconSize': 10
  }
});
Object.defineProperty(OPTION, 'loading', {
  'value': {
    'icon': 0,
    'size': 48,
    'rate': null,
    'duration': 2,
    'area': [48, 48],
    'color': 'white',
    'background': 'transparent',
    'position': ['center', 'center']
  }
});
Object.defineProperty(OPTION, 'image', {
  'value': {
    'image': [],
    'size': null,
    'sizeRange': {
      'min': [0.15625, 0.160257],
      'max': [0.9, 0.9]
    },
    'toolbar': {
      'enable': false,
      'config': {
        'crop': {
          'enable': false,
          'title': 'crop',
          'grid': 'quarter',
          'icon': 'fas fa-crop-alt'
        },
        'spin': {
          'enable': false,
          'title': 'spin',
          'icon': 'fas fa-redo-alt'
        },
        'filter': {
          'enable': false,
          'config': {
            'blur': {
              'enable': false,
              'title': 'blur',
              'icon': null,
              'textIcon': '模'
            },
            'gray': {
              'enable': false,
              'title': 'gray',
              'icon': null,
              'textIcon': '灰'
            },
            'mirror': {
              'enable': false,
              'title': 'mirror',
              'icon': null,
              'textIcon': '镜'
            }
          },
          'title': 'filter',
          'icon': 'fas fa-filter'
        },
        'revert': {
          'enable': false,
          'title': 'revert',
          'icon': 'fas fa-sync-alt'
        },
        'download': {
          'enable': false,
          'name': 'picture-',
          'mime': 'image/png',
          'title': 'download',
          'icon': 'fas fa-download'
        }
      }
    }
  }
});
Object.defineProperty(OPTION, 'common', {
  'value': {
    'index': 0,
    'ui': 'modal-layer-ui',
    'title': null,
    'window': null,
    'position': null,
    'popupTime': 5,
    'skin': 'default',
    'parentModalLayer': null,
    'areaProportion': [0.18, 0.21],
    'content': {
      'value': null,
      'fullContainer': false
    },
    'text': {
      'action': {
        'close': '关闭',
        'expand': '全屏',
        'minimize': '最小化'
      },
      'interaction': {
        'ok': '确定',
        'no': '拒绝',
        'cancel': '取消'
      }
    },
    'transition': {
      'duration': 0.2,
      'animation': 0,
      'easing': 'ease'
    },
    'mask': {
      'enable': true,
      'clickRemove': true
    },
    'drag': {
      'enable': true,
      'overflow': false
    },
    'resize': {
      'enable': true
    },
    'progress': {
      'enable': false,
      'position': 'bottom',
      'color': 'deepskyblue',
      'background': '#cecece'
    },
    'layer': {},
    'hook': {
      'initStart': null,
      'initEnded': null
    }
  }
});
Object.freeze(OPTION);
var STRUCT = Object.create(null);
Object.defineProperty(STRUCT, 'mask', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'nodeType': 'div',
      'class': 'modal-layer-mask'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'container', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'innerHTML': [],
      'nodeType': 'div',
      'class': 'modal-layer-container'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'action', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'innerHTML': [],
      'nodeType': 'div',
      'class': 'modal-layer-action'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'action_button', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'minimize': {
        'nodeType': 'span',
        'data-fa-transform': 'up-4 shrink-2',
        'class': 'fas fa-window-minimize modal-layer-action-btn modal-layer-action-btn-minimize'
      },
      'expand': {
        'nodeType': 'span',
        'data-fa-transform': 'shrink-2',
        'class': 'fas fa-expand-arrows-alt modal-layer-action-btn modal-layer-action-btn-expand'
      },
      'close': {
        'nodeType': 'span',
        'data-fa-transform': 'rotate-45 grow-1',
        'class': 'fas fa-plus modal-layer-action-btn modal-layer-action-btn-close'
      }
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'title', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'nodeType': 'div',
      'class': 'modal-layer-title',
      'innerHTML': [{
        'nodeType': 'h4',
        'class': 'modal-layer-title-content'
      }]
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'content', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'innerHTML': [],
      'nodeType': 'div',
      'class': 'modal-layer-content'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'content_text', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'nodeType': 'div',
      'class': 'modal-layer-text-content'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'content_page', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'name': '',
      'frameborder': 0,
      'scrolling': 'no',
      'nodeType': 'iframe',
      'class': 'modal-layer-page-content'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'content_image', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'load-status': 2,
      'nodeType': 'canvas',
      'class': 'modal-layer-image-canvas'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'content_loading', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'nodeType': 'div',
      'class': 'modal-layer-loading-box',
      'innerHTML': [{
        'nodeType': 'span',
        'class': 'modal-layer-loading-icon'
      }]
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'content_loading_icon', {
  get: function get() {
    return JSON.parse(JSON.stringify([{
      'nodeType': 'span',
      'class': 'modal-layer-loading-icon fas fa-spinner fa-spin fa-fw'
    }, {
      'nodeType': 'span',
      'class': 'modal-layer-loading-icon fas fa-circle-notch fa-spin fa-fw'
    }, {
      'nodeType': 'span',
      'class': 'modal-layer-loading-icon fas fa-sync fa-spin fa-fw'
    }, {
      'nodeType': 'span',
      'class': 'modal-layer-loading-icon fas fa-cog fa-spin fa-fw'
    }]));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'toolbar', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'innerHTML': [],
      'nodeType': 'div',
      'class': 'modal-layer-toolbar'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'interaction', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'innerHTML': [],
      'nodeType': 'div',
      'class': 'modal-layer-interaction'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'interaction_button', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'ok': {
        'nodeType': 'span',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-ok'
      },
      'no': {
        'nodeType': 'span',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-no'
      },
      'cancel': {
        'nodeType': 'span',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-cancel'
      }
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'progress_bar', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'nodeType': 'div',
      'class': 'modal-layer-progress-bar',
      'innerHTML': [{
        'nodeType': 'div',
        'class': 'modal-layer-progress-bar-background',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-progress-bar-progress'
        }]
      }]
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'resize_box', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'nodeType': 'div',
      'class': 'modal-layer-resize-box',
      'innerHTML': [{
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'top'
      }, {
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'left'
      }, {
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'right'
      }, {
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'bottom'
      }, {
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'left-top'
      }, {
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'right-top'
      }, {
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'left-bottom'
      }, {
        'nodeType': 'div',
        'class': 'modal-layer-resize-bar',
        'position-resize-bar': 'right-bottom'
      }]
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'minimize_queue', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'innerHTML': [],
      'nodeType': 'div',
      'id': 'modal-layer-minimize-queue'
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'minimize_queue_item', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'nodeType': 'div',
      'class': 'modal-layer-minimize-queue-item',
      'innerHTML': [{
        'nodeType': 'h4',
        'class': 'modal-layer-minimize-queue-item-title'
      }]
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'image_tools', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'crop': {
        'title': 'crop',
        'nodeType': 'div',
        'tool-type': 'crop',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
      },
      'spin': {
        'title': 'spin',
        'nodeType': 'div',
        'tool-type': 'spin',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
      },
      'revert': {
        'title': 'revert',
        'nodeType': 'div',
        'tool-type': 'revert',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
      },
      'filter': {
        'title': 'filter',
        'nodeType': 'div',
        'tool-type': 'filter',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }, {
          'innerHTML': [],
          'nodeType': 'div',
          'class': 'modal-layer-toolbar-item-child-list'
        }],
        'class': 'modal-layer-toolbar-item'
      },
      'download': {
        'title': 'save',
        'nodeType': 'div',
        'tool-type': 'download',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
      }
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.defineProperty(STRUCT, 'image_tools_child', {
  get: function get() {
    return JSON.parse(JSON.stringify({
      'filter': {
        'mirror': {
          'title': '镜像',
          'innerText': '镜',
          'nodeType': 'span',
          'filter-type': 'mirror',
          'class': 'modal-layer-toolbar-filter-icon'
        },
        'blur': {
          'data-radius': 3,
          'data-sigma': 1.5,
          'innerText': '模',
          'title': '高斯模糊',
          'nodeType': 'span',
          'filter-type': 'blur',
          'class': 'modal-layer-toolbar-filter-icon'
        },
        'gray': {
          'title': '灰度化',
          'innerText': '灰',
          'nodeType': 'span',
          'filter-type': 'gray',
          'class': 'modal-layer-toolbar-filter-icon'
        }
      }
    }));
  },
  'enumerable': true,
  'configurable': false
});
Object.freeze(STRUCT);
var ENUM = Object.create(null);
Object.defineProperty(ENUM, 'ARROW', {
  'enumerable': true,
  'value': {
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  }
});
Object.defineProperty(ENUM, 'TIPS_POSITION', {
  'enumerable': true,
  'value': {
    'LEFT': 1,
    'UP': 0,
    'RIGHT': 2,
    'DOWN': 3
  }
});
Object.defineProperty(ENUM, 'DIRECTION', {
  'enumerable': true,
  'value': {
    'EAST': 'e',
    'WEST': 'w',
    'SOUTH': 's',
    'NORTH': 'n'
  }
});
Object.defineProperty(ENUM, 'POSITION', {
  'enumerable': true,
  'value': {
    'CENTER': null,
    'LEFT_TOP': 'lt',
    'RIGHT_TOP': 'rt',
    'LEFT_BOTTOM': 'lb',
    'RIGHT_BOTTOM': 'rb'
  }
});
Object.defineProperty(ENUM, 'TYPE', {
  'enumerable': true,
  'value': {
    'MSG': 0,
    'MESSAGE': 0,
    'ALERT': 1,
    'PROMPT': 2,
    'CONFIRM': 3,
    'PAGE': 4,
    'LOADING': 5,
    'IMAGE': 6,
    'VIDEO': 7,
    'AUTDIO': 8,
    'TIPS': 9
  }
});
Object.defineProperty(ENUM, 'STATUS', {
  'enumerable': true,
  'value': {
    'HIDE': 0,
    'SHOW': 1,
    'EXPAND': 2,
    'MINIMIZE': 3,
    'REMOVING': 4,
    'REMOVED': 5,
    'DRAG': 6,
    'RESIZE': 7
  }
});
Object.defineProperty(ENUM, 'LOAD_STATUS', {
  'enumerable': true,
  'value': {
    'FAILED': 0,
    'LOADED': 1,
    'LOADING': 2
  }
});
Object.defineProperty(ENUM, 'BROWSER_STORAGE', {
  'enumerable': true,
  'value': {
    'WEBSQL': 'webSQL',
    'INDEXDB': 'indexedDB',
    'LOCALSTORAGE': 'localStorage',
    'SESSIONSTORAGE': 'sessionStorage'
  }
});
Object.defineProperty(ENUM, 'TRANSITION_ANIMATION_PRESET', {
  'enumerable': true,
  'value': {
    'CENTER_SCALE': 0,
    'SHIFT_DOWN': 1,
    'UNFOLD_X': 2,
    'DIAGONAL_STRETCH': 3,
    'POP_UP': 4
  }
});
Object.freeze(ENUM);

var ModalLayer = function () {
  _createClass(ModalLayer, [{
    key: "initOption",
    value: function initOption(options) {
      options['index'] = ModalLayer['_instance'].length;
      ModalLayer['_instance'][options['index']] = this;
      this['option'] = ModalLayer['_assistant']['object']['merge'](options, ModalLayer['_option']['common']);
    }
  }, {
    key: "compatibleOption",
    value: function compatibleOption(options) {
      var _options$content$full, _options$content;

      if (ModalLayer['_assistant']['object']['isString'](options['window'])) options['window'] = document.querySelector(options['window']);

      if (options['position']) {
        if (!Array.isArray(options['position'])) {
          if (Number.isInteger(options['position'])) options['position'] = [options['position'], options['position']];
        }
      }

      if (typeof options['mask'] === 'boolean' || ['true', 'false'].includes(options['mask'])) options['mask'] = {
        'enable': Boolean(options['mask']),
        'clickRemove': true
      };
      if (!ModalLayer['_assistant']['object']['isOnlyObject'](options['content'])) options['content'] = {
        'value': options['content'],
        'fullContainer': (_options$content$full = (_options$content = options['content']) === null || _options$content === void 0 ? void 0 : _options$content['fullContainer']) !== null && _options$content$full !== void 0 ? _options$content$full : false
      };
    }
  }, {
    key: "linkageOption",
    value: function linkageOption() {
      if (this['option']['popupTime'] <= 0) this['option']['progress']['enable'] = false;
      if (this['option']['title'] === false) this['option']['drag']['enable'] = false;
    }
  }, {
    key: "checkOption",
    value: function checkOption() {
      if (this['option']['window'] && !(this['option']['window'] instanceof Element)) throw new TypeError('option.window does not meet the expected value.');

      if (Number.isFinite(this['option']['transition']['animation'])) {
        if (!Object.values(ModalLayer['_enum']['TRANSITION_ANIMATION_PRESET']).includes(this['option']['transition']['animation'])) throw Error('No preset animation found.');
      } else if (this['option']['transition']['animation'] !== null) {
        if (!Array.isArray(this['option']['transition']['animation']) && !(this['option']['transition']['animation'] instanceof Animation)) throw Error('Expects a css animation name or Animation object.');
      }

      if (this['option']['position']) {
        if (!Array.isArray(this['option']['position']) && !Object.values(ModalLayer['_enum']['POSITION']).includes(this['option']['position'])) throw Error('option.position does not meet the expected value.');
      }
    }
  }, {
    key: "initVariable",
    value: function initVariable() {
      this['variable']['struct'] = Object.create(null);
      this['variable']['timeout'] = Object.create(null);
      this['variable']['interval'] = Object.create(null);
      this['variable']['animation'] = Object.create(null);
      this['variable']['eventSymbol'] = Object.create(null);
      this['variable']['defaultRect'] = Object.create(null);
      this['variable']['struct']['_build'] = Object.create(null);
      this['variable']['struct']['_backup'] = Object.create(null);
    }
  }, {
    key: "initStruct",
    value: function initStruct() {
      var _this$option$mask;

      if ((_this$option$mask = this['option']['mask']) === null || _this$option$mask === void 0 ? void 0 : _this$option$mask['enable']) this['variable']['struct']['_build']['mask'] = ModalLayer['_struct']['mask'];
      this['variable']['struct']['_build']['container'] = ModalLayer['_struct']['container'];
    }
  }, {
    key: "initNode",
    value: function initNode() {
      var okButton, noButton, cancelButton;
      var mask, container, titleNode, titleChild;
      this['variable']['nodes'] = ModalLayer['_assistant']['element']['objectToNode'](this['variable']['struct']['_build']);
      mask = this['variable']['nodes']['mask'];
      container = this['variable']['nodes']['container'];
      okButton = container.querySelector('.modal-layer-interaction-btn-ok');
      noButton = container.querySelector('.modal-layer-interaction-btn-no');
      cancelButton = container.querySelector('.modal-layer-interaction-btn-cancel');

      if (this['option']['window'] !== null) {
        var _mask;

        (_mask = mask) === null || _mask === void 0 ? void 0 : _mask.setAttribute('has-window', '');
        container.setAttribute('has-window', '');
      }

      container.setAttribute('modal-layer-popup-time', this['option']['popupTime']);
      container.setAttribute('content-full-container', Number(this['option']['content']['fullContainer']));
      container.setAttribute('modal-layer-type', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['TYPE'], this['type']).toLowerCase());
      container.setAttribute('allow-drag', Number(this['option']['drag']['enable']));
      container.setAttribute('allow-resize', Number(this['option']['resize']['enable']));

      if (this['option']['progress']['enable']) {
        var posAry, progressNode;
        posAry = ['top', 'left', 'right', 'bottom'];
        progressNode = container.querySelector('.modal-layer-progress-bar');
        if (!posAry.includes(this['option']['progress']['position'])) this['option']['progress']['position'] = posAry[3];
        progressNode.setAttribute('progress-bar-position', this['option']['progress']['position']);
        progressNode.querySelector('.modal-layer-progress-bar-progress').style.cssText += 'background: ' + this['option']['progress']['color'];
        progressNode.querySelector('.modal-layer-progress-bar-background').style.cssText += 'background: ' + this['option']['progress']['background'];
      }

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

      okButton && (okButton.innerText = this['option']['text']['interaction']['ok']);
      noButton && (noButton.innerText = this['option']['text']['interaction']['no']);
      cancelButton && (cancelButton.innerText = this['option']['text']['interaction']['cancel']);
    }
  }, {
    key: "initAttribute",
    value: function initAttribute() {
      var ui, skinCls, hideCls, showCls, indexCls;
      ui = this['option']['ui'];
      hideCls = 'modal-layer-hide';
      skinCls = 'modal-layer-skin-' + this['option']['skin'];
      indexCls = 'modal-layer-index-' + this['option']['index'];
      Object.keys(this['variable']['nodes']).forEach(function (key) {
        var allNodes = ModalLayer['_assistant']['element']['getAllElement'](this['variable']['nodes'][key]);

        for (var i = 0; i < allNodes.length; i++) {
          if (allNodes[i].classList.contains(ui)) allNodes[i].classList.remove(ui);
          allNodes[i].className = "".concat(ui, " ").concat(allNodes[i].className);
        }

        this['variable']['nodes'][key].className = ui + ' ' + skinCls + ' ' + indexCls + ' ' + this['variable']['nodes'][key].className.trim() + ' ' + hideCls;
      }, this);
    }
  }, {
    key: "initAnimation",
    value: function initAnimation() {
      var _this5 = this;

      var nodes;
      var animation;
      var preset, option;
      preset = Object.create(null);
      nodes = this['variable']['nodes'];
      if (this['option']['transition']['animation'] === null) return;
      animation = this['option']['transition']['animation'];
      preset.other = [{
        'opacity': 0
      }, {
        'opacity': 1
      }];
      preset['container'] = [[{
        'opacity': 0,
        'transform': 'scale(.45)'
      }, {
        'opacity': 1,
        'transform': 'scale(1)'
      }], [{
        'opacity': 0,
        'transform': 'translateY(-100%)'
      }, {
        'opacity': 1,
        'transform': 'translateY(0)'
      }], [{
        'opacity': 0,
        'transform': 'rotateY(-120deg)'
      }, {
        'opacity': 1,
        'transform': 'rotateY(0)'
      }], [{
        'opacity': 0,
        'transform': 'skewX(-100deg)'
      }, {
        'opacity': 1,
        'transform': 'skewX(0deg)'
      }], [{
        'opacity': 0,
        'transform': 'translateY(200%) scale(.45)'
      }, {
        'opacity': 1,
        'transform': 'translateY(0) scale(1)'
      }]];
      option = {
        'fill': 'both',
        'id': 'modal-layer-transition-animation',
        'easing': this['option']['transition']['easing'],
        'duration': this['option']['transition']['duration'] * 1000
      };
      this['variable']['animation']['transition'] = Object.create(null);
      Object.keys(nodes).forEach(function (k) {
        if (k === 'container') {
          if (animation instanceof Animation) {
            animation.effect.target = nodes[k];
          } else {
            animation = Array.isArray(animation) ? animation : preset[k][animation];
            animation = nodes[k].animate(animation, option);
          }

          _this5['variable']['animation']['transition'][k] = animation;
        } else {
          _this5['variable']['animation']['transition'][k] = nodes[k].animate(preset.other, option);
        }

        _this5['variable']['animation']['transition'][k].cancel();
      });
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this$option$event;

      this['event'] = ModalLayer['_assistant']['object']['merge']((_this$option$event = this['option']['event']) !== null && _this$option$event !== void 0 ? _this$option$event : {}, ModalLayer['_event']);
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var options;
      var okButton, noButton, cancelButton;
      options = {
        'once': false,
        'capture': false,
        'passive': false,
        'mozSystemGroup': false
      };
      if (this['option']['mask']['enable'] && this['option']['mask']['clickRemove']) this['variable']['eventSymbol']['maskClickRemove'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['mask'], 'click', null, this['event']['clickMask'], this, null, options);
      if (this['option']['drag']['enable']) this['variable']['eventSymbol']['drag'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'].querySelector('.modal-layer-title'), 'mousedown', null, this['event']['drag'], this, null, options);
      if (this['option']['resize']['enable']) this['variable']['eventSymbol']['resize'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'mousedown', '.modal-layer-resize-bar', this['event']['resize'], this, null, options);
      this['variable']['eventSymbol']['active'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'mousedown', null, this['event']['active'], this, null, options);
      if (this['event']['action']['close'] instanceof Function) this['variable']['eventSymbol']['actionClose'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'click', '.modal-layer-action-btn-close', this['event']['action']['close'], this, null, options);
      if (this['event']['action']['expand'] instanceof Function) this['variable']['eventSymbol']['actionExpand'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'click', '.modal-layer-action-btn-expand', this['event']['action']['expand'], this, null, options);
      if (this['event']['action']['minimize'] instanceof Function) this['variable']['eventSymbol']['actionMinimize'] = ModalLayer['_assistant']['event']['add'](this['variable']['nodes']['container'], 'click', '.modal-layer-action-btn-minimize', this['event']['action']['minimize'], this, null, options);
      okButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-ok');
      noButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-no');
      cancelButton = this['variable']['nodes']['container'].querySelector('.modal-layer-interaction-btn-cancel');
      if (this['event']['interaction']['ok'] && okButton) this['variable']['eventSymbol']['interactionOk'] = ModalLayer['_assistant']['event']['add'](okButton, 'click', null, this['event']['interaction']['ok'], this, null, options);
      if (this['event']['interaction']['no'] && noButton) this['variable']['eventSymbol']['interactionNo'] = ModalLayer['_assistant']['event']['add'](noButton, 'click', null, this['event']['interaction']['no'], this, null, options);
      if (cancelButton) this['variable']['eventSymbol']['interactionCancel'] = ModalLayer['_assistant']['event']['add'](cancelButton, 'click', null, this['event']['interaction']['cancel'], this, null, options);
    }
  }, {
    key: "insertNode",
    value: function insertNode() {
      var _this$option$window,
          _this6 = this;

      var fragment = document.createDocumentFragment();
      var parentWindow = (_this$option$window = this['option']['window']) !== null && _this$option$window !== void 0 ? _this$option$window : window.document.body;
      Object.keys(this['variable']['nodes']).forEach(function (key) {
        return fragment.appendChild(_this6['variable']['nodes'][key]);
      }, this);
      parentWindow.appendChild(fragment);
    }
  }]);

  function ModalLayer(options, reject) {
    _classCallCheck(this, ModalLayer);

    _defineProperty(this, "type", null);

    _defineProperty(this, "status", null);

    _defineProperty(this, "event", null);

    _defineProperty(this, "option", null);

    _defineProperty(this, "variable", {});

    try {
      var _options$hook, _options$hook$initSta, _options$hook$initSta2, _this$option$hook, _this$option$hook$ini, _this$option$hook$ini2;

      (_options$hook = options['hook']) === null || _options$hook === void 0 ? void 0 : (_options$hook$initSta = _options$hook['initStart']) === null || _options$hook$initSta === void 0 ? void 0 : (_options$hook$initSta2 = _options$hook$initSta.call) === null || _options$hook$initSta2 === void 0 ? void 0 : _options$hook$initSta2.call(_options$hook$initSta, options);
      this['type'] = options['type'];
      this['status'] = ModalLayer['_enum']['STATUS']['HIDE'];
      this['compatibleOption'](options);
      this['initOption'](options);
      this['checkOption']();
      this['linkageOption']();
      this['initVariable']();
      this['initStruct']();
      this['initNode']();
      this['initAttribute']();
      this['initAnimation']();
      this['initEvent']();
      this['bindEvent']();
      (_this$option$hook = this['option']['hook']) === null || _this$option$hook === void 0 ? void 0 : (_this$option$hook$ini = _this$option$hook['initEnded']) === null || _this$option$hook$ini === void 0 ? void 0 : (_this$option$hook$ini2 = _this$option$hook$ini.call) === null || _this$option$hook$ini2 === void 0 ? void 0 : _this$option$hook$ini2.call(_this$option$hook$ini, this);
      this['insertNode']();
    } catch (e) {
      reject === null || reject === void 0 ? void 0 : reject.call(this, e);
      this["delete"]();
      return e;
    }
  }

  _createClass(ModalLayer, [{
    key: "setStatus",
    value: function setStatus(status) {
      var text;

      if (!Object.values(ModalLayer['_enum']['STATUS']).includes(status)) {
        text = status.toUpperCase();
        if ((status = ModalLayer['_enum']['STATUS'][text]) === undefined) throw Error('Illegal value');
      } else {
        text = ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['STATUS'], status);
      }

      this['status'] = status;
      this['variable']['nodes']['container'].setAttribute('modal-layer-status', text.toLowerCase());
    }
  }, {
    key: "resize",
    value: function resize() {
      var defaultArea;
      var container, modalChildNodes;
      defaultArea = [0, 0];
      container = this['variable']['nodes']['container'];

      if (this['option']['areaProportion'] === null) {
        defaultArea = [container.offsetWidth, container.offsetHeight];
      } else {
        modalChildNodes = container.children;
        defaultArea[0] = ModalLayer['_assistant']['number']['multiply'](window.innerWidth, this['option']['areaProportion'][0]);
        container.style.width = defaultArea[0] + 'px';

        for (var i = 0; i < modalChildNodes.length; i++) {
          defaultArea[1] = getComputedStyle(modalChildNodes[i]).position == 'absolute' ? defaultArea[1] : window.Math.max(ModalLayer['_assistant']['element']['getNodeHeight'](modalChildNodes[i]), defaultArea[1]);
        }

        container.style.height = defaultArea[1] + 'px';
      }

      this['variable']['defaultArea'] = defaultArea;
      this['variable']['defaultRect']['width'] = defaultArea[0];
      this['variable']['defaultRect']['height'] = defaultArea[1];
    }
  }, {
    key: "resizeBy",
    value: function resizeBy(x, y, w, h) {
      var container = this['variable']['nodes']['container'];
      container.style.cssText += "top: ".concat(y, "px; left: ").concat(x, "px; width: ").concat(w, "px; height: ").concat(h, "px;");

      if ([ModalLayer['_enum']['TYPE']['PAGE'], ModalLayer['_enum']['TYPE']['VIDEO'], ModalLayer['_enum']['TYPE']['AUDIO']].includes(this.type)) {
        var pageNode = container.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');
        pageNode.style.cssText += "width: ".concat(this['option']['layer']['area'][0] + w - this['variable']['defaultRect']['width'], "px; height: ").concat(this['option']['layer']['area'][1] + h - this['variable']['defaultRect']['height'], "px;");
      }
    }
  }, {
    key: "positioning",
    value: function positioning() {
      var container, parentNode;
      var posX, posY, width, height, parent;
      container = this['variable']['nodes']['container'];
      parentNode = this['option']['window'] === document.body ? document.documentElement : this['option']['window'];

      if (Array.isArray(this['option']['position'])) {
        var _this$option$position = _slicedToArray(this['option']['position'], 2);

        posX = _this$option$position[0];
        posY = _this$option$position[1];
      } else {
          if (ModalLayer['_enum']['POSITION']['LEFT_TOP'] === this['option']['position']) {
            posX = posY = 0;
          } else if (ModalLayer['_enum']['POSITION']['RIGHT_TOP'] === this['option']['position']) {
            posY = 0;
            posX = (parentNode ? parentNode.offsetWidth : window.innerWidth) - container.offsetWidth;
          } else if (ModalLayer['_enum']['POSITION']['LEFT_BOTTOM'] === this['option']['position']) {
            posX = 0;
            posY = (parentNode ? parentNode.offsetHeight : window.innerHeight) - container.offsetHeight;
          } else if (ModalLayer['_enum']['POSITION']['RIGHT_BOTTOM'] === this['option']['position']) {
            posX = (parentNode ? parentNode.offsetWidth : window.innerWidth) - container.offsetWidth;
            posY = (parentNode ? parentNode.offsetHeight : window.innerHeight) - container.offsetHeight;
          } else {
            var _parentNode$scrollTop2, _parentNode5, _parentNode$scrollLef2, _parentNode6;

            width = this['variable']['defaultRect']['width'];
            height = this['variable']['defaultRect']['height'];
            parent = {
              scrollY: (_parentNode$scrollTop2 = (_parentNode5 = parentNode) === null || _parentNode5 === void 0 ? void 0 : _parentNode5.scrollTop) !== null && _parentNode$scrollTop2 !== void 0 ? _parentNode$scrollTop2 : 0,
              scrollX: (_parentNode$scrollLef2 = (_parentNode6 = parentNode) === null || _parentNode6 === void 0 ? void 0 : _parentNode6.scrollLeft) !== null && _parentNode$scrollLef2 !== void 0 ? _parentNode$scrollLef2 : 0,
              width: parentNode ? parentNode.clientWidth : window.innerWidth,
              height: parentNode ? parentNode.clientHeight : window.innerHeight
            };
            posX = ModalLayer['_assistant']['number']['chain'](parent.width)['subtract'](width)['divide'](2)['add'](parent.scrollX).floor().done();
            posY = ModalLayer['_assistant']['number']['chain'](parent.height)['subtract'](height)['divide'](2)['add'](parent.scrollY).floor().done();
          }
        }

      container.style.cssText += "top: ".concat(posY, "px; left: ").concat(posX, "px;");
      this['variable']['defaultRect']['top'] = posY;
      this['variable']['defaultRect']['left'] = posX;
    }
  }, {
    key: "show",
    value: function show() {
      var _this7 = this;

      var promise;
      var animations;
      var showCls, hideCls;
      var nodes, zIndex, nodeKeys;
      nodes = this['variable']['nodes'];
      if (!nodes || Object.keys(nodes).length === 0 || this['status'] === ModalLayer['_enum']['STATUS']['SHOW']) return Promise.resolve();
      showCls = 'modal-layer-show';
      hideCls = 'modal-layer-hide';
      nodeKeys = Object.keys(nodes);
      animations = this['variable']['animation']['transition'];
      zIndex = ModalLayer['_assistant']['element']['maxZIndex']();
      promise = new Promise(function (resolve) {
        var fn = function fn(e) {
          if (_this7['option']['popupTime'] > 0) _this7['event']['autoShutdown'].call(_this7);
          resolve();
        };

        if (_this7['option']['transition']['animation'] !== null) animations['container'].onfinish = fn;else fn();
      });
      nodeKeys.forEach(function (k) {
        var _animations;

        var method = animations[k].playbackRate < 0 ? 'reverse' : 'play';
        nodes[k].style.zIndex = zIndex + 1;
        if (nodes[k].classList.contains(hideCls)) nodes[k].classList.replace(hideCls, showCls);
        if ((_animations = animations) === null || _animations === void 0 ? void 0 : _animations[k]) animations[k][method]();
      });
      this['setStatus']('show');
      return promise;
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this8 = this;

      var promise;
      var animations;
      var nodes, nodeKeys;
      var hideCls, showCls;
      var opacityAnimation, transformAnimation;
      nodes = this['variable']['nodes'];
      if (!nodes || Object.keys(nodes).length === 0 || this['status'] === ModalLayer['_enum']['STATUS']['HIDE']) return Promise.resolve();
      hideCls = 'modal-layer-hide';
      showCls = 'modal-layer-show';
      nodeKeys = Object.keys(nodes);
      animations = this['variable']['animation']['transition'];
      if (Number.isInteger(this['variable']['timeout']['auto_shutdown'])) window.clearTimeout(this['variable']['timeout']['auto_shutdown']);
      promise = new Promise(function (resolve) {
        var fn = function fn(e) {
          nodeKeys.forEach(function (k) {
            if (nodes[k].classList.contains(showCls)) nodes[k].classList.replace(showCls, hideCls);
          });
          if (_this8['option']['parentModalLayer'] instanceof ModalLayer) _this8['option']['parentModalLayer'].show();

          _this8['setStatus']('hide');

          resolve();
        };

        if (_this8['option']['transition']['animation'] !== null) animations['container'].onfinish = fn;else fn();
      });
      nodeKeys.forEach(function (k) {
        var _animations2;

        var method = animations[k].playbackRate > 0 ? 'reverse' : 'play';
        if ((_animations2 = animations) === null || _animations2 === void 0 ? void 0 : _animations2[k]) animations[k][method]();
      });
      return promise;
    }
  }, {
    key: "minimize",
    value: function minimize() {
      var _this9 = this;

      var title;
      var keyframes, option;
      var queueNode, queueItemNode;
      var animation, animations, animationDur;
      if (this['status'] === ModalLayer['_enum']['STATUS']['MINIMIZE']) return;
      animationDur = this['option']['transition']['duration'];
      queueNode = document.querySelector('#modal-layer-minimize-queue');

      if (!queueNode) {
        queueNode = ModalLayer['_assistant']['element']['objectToNode']([ModalLayer['_struct']['minimize_queue']])[0];
        queueNode.classList.add(this['option']['ui'], "modal-layer-skin-".concat(this['option']['skin']));
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
        animations = new Map();
        ModalLayer['_assistant']['cache']['set']('minimizeQueueAnimations', animations);
      }

      if (animation = animations.get(this['option']['index'])) {
        animation.reverse();
      } else {
        keyframes = [{
          'opacity': 0,
          'transform': 'scale(.45)'
        }, {
          'opacity': 1,
          'transform': 'scale(1)'
        }];
        option = {
          'fill': 'both',
          'id': 'modal-layer-minimize-queue-transition-animation',
          'easing': this['option']['transition']['easing'],
          'duration': animationDur * 1000
        };
        animation = queueItemNode.animate(keyframes, option);
        animations.set(this['option']['index'], animation);
      }

      this['hide']().then(function () {
        return void _this9['setStatus']('minimize');
      });
    }
  }, {
    key: "revert",
    value: function revert() {
      var _this10 = this;

      var promise;
      var queueNode, queueItemNode;
      var animation, animationDur, animationHalfDur;
      if (![ModalLayer['_enum']['STATUS']['MINIMIZE']].includes(this['status'])) return;
      animationDur = this['option']['transition']['duration'];
      queueNode = document.querySelector('#modal-layer-minimize-queue');
      animationHalfDur = ModalLayer['_assistant']['number']['divide'](animationDur, 2);
      queueItemNode = queueNode.querySelector('.modal-layer-minimize-queue-item[modal-layer-index="' + this['option']['index'] + '"]');
      animation = ModalLayer['_assistant']['cache']['get']('minimizeQueueAnimations').get(this['option']['index']);
      setTimeout(function () {
        _this10.show();
      }, animationHalfDur * 1000);
      promise = new Promise(function (resolve) {
        animation.onfinish = function (e) {
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
  }, {
    key: "remove",
    value: function remove() {
      var _this11 = this;

      var nodes, status;
      status = this['status'];
      nodes = this['variable']['nodes'];

      if (status === ModalLayer['_enum']['STATUS']['MINIMIZE']) {
        var index = ModalLayer['_minimizeQueue'].indexOf(this);
        delete ModalLayer['_minimizeQueue'][index];
      }

      if (!nodes || Object.keys(nodes).length === 0 || [ModalLayer['_enum']['STATUS']['HIDE'], ModalLayer['_enum']['STATUS']['REMOVING'], ModalLayer['_enum']['STATUS']['REMOVED']].includes(status)) return Promise.resolve();
      this['setStatus'](ModalLayer['_enum']['STATUS']['REMOVING']);
      return this['hide']().then(function () {
        _this11['removeAllEvent']();

        Object.keys(nodes).forEach(function (key) {
          nodes[key].remove();
        });

        _this11['setStatus']('removed');
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this12 = this;

      this.remove().then(function () {
        var index = ModalLayer._instance.indexOf(_this12);

        ModalLayer._instance.splice(index, 1);

        ModalLayer['_assistant']['object']['dereference'](_this12['event']);
        ModalLayer['_assistant']['object']['dereference'](_this12['option']);
        ModalLayer['_assistant']['object']['dereference'](_this12['variable']);
        _this12['event'] = _this12['option'] = _this12['variable'] = null;
      });
    }
  }, {
    key: "removeAllEvent",
    value: function removeAllEvent() {
      var nodes;
      var okButton, noButton, cancelButton;
      if (Object.keys(nodes = this['variable']['nodes']).length === 0) return;
      Object.values(this['variable']['eventSymbol']).forEach(function (symbol) {
        return ModalLayer['_assistant']['event']['remove'](symbol);
      });
    }
  }], [{
    key: "removeAll",
    value: function removeAll() {
      for (var i = 0; i < ModalLayer['_instance'].length; i++) {
        ModalLayer['_instance'][i].remove();
      }
    }
  }, {
    key: "msg",
    value: function msg(options, reject) {
      return ModalLayer['message'](options, reject);
    }
  }, {
    key: "message",
    value: function message(options, reject) {
      var layer = null;
      if (typeof options === 'string') options = {
        'content': options,
        'type': ModalLayer['_enum']['TYPE']['MESSAGE']
      };else options.type = ModalLayer['_enum']['TYPE']['MESSAGE'];
      layer = new (ModalLayer['_achieve'].get('message'))(options, reject);
      if (layer instanceof Error) return;
      layer.resize();
      layer['positioning']();
      layer.show();
      return layer;
    }
  }, {
    key: "tips",
    value: function tips(options, reject) {
      var layer = null;
      if (typeof options === 'string') options = {
        'content': options,
        'type': ModalLayer['_enum']['TYPE']['TIPS']
      };else options.type = ModalLayer['_enum']['TYPE']['TIPS'];
      layer = new (ModalLayer['_achieve'].get('tips'))(options, reject);
      if (layer instanceof Error) return;
      layer.resize();
      layer['positioning']();
      layer.show();
      return layer;
    }
  }, {
    key: "alert",
    value: function alert(options, reject) {
      var layer = null;
      options.type = ModalLayer['_enum']['TYPE']['ALERT'];
      layer = new (ModalLayer['_achieve'].get('alert'))(options, reject);
      if (layer instanceof Error) return;
      layer.resize();
      layer['positioning']();
      layer.show();
      return layer;
    }
  }, {
    key: "confirm",
    value: function confirm(options, reject) {
      var layer = null;
      options.type = ModalLayer['_enum']['TYPE']['CONFIRM'];
      layer = new (ModalLayer['_achieve'].get('confirm'))(options, reject);
      if (layer instanceof Error) return;
      layer.resize();
      layer['positioning']();
      layer.show();
      return layer;
    }
  }, {
    key: "prompt",
    value: function prompt(options, reject) {
      var layer = null;
      options.type = ModalLayer['_enum']['TYPE']['PROMPT'];
      layer = new (ModalLayer['_achieve'].get('prompt'))(options, reject);
      if (layer instanceof Error) return;
      layer.resize();
      layer['positioning']();
      layer.show();
      return layer;
    }
  }, {
    key: "page",
    value: function page(options, reject) {
      var layer = null;
      options.type = ModalLayer['_enum']['TYPE']['PAGE'];
      layer = new (ModalLayer['_achieve'].get('page'))(options, reject);
      if (layer instanceof Error) return;
      layer.resize();
      layer['positioning']();
      layer.show();
      return layer;
    }
  }, {
    key: "image",
    value: function image(options, reject) {
      var layer = null;
      options.type = ModalLayer['_enum']['TYPE']['IMAGE'];
      layer = new (ModalLayer['_achieve'].get('image'))(options, reject);
      if (layer instanceof Error) return;
      layer['variable']['image']['finish'].then(function () {
        layer.resize();
        layer['variable']['image']['layer'].resize();
      }).then(function () {
        layer['positioning']();
        layer['variable']['image']['layer']['positioning']();
      }).then(function () {
        return layer.show();
      });
      return layer;
    }
  }, {
    key: "loading",
    value: function loading(options, reject) {
      var layer = null;
      options.type = ModalLayer['_enum']['TYPE']['LOADING'];
      layer = new (ModalLayer['_achieve'].get('loading'))(options, reject);
      if (layer instanceof Error) return;
      layer.resize();
      layer['positioning']();
      layer.show();
      return layer;
    }
  }]);

  return ModalLayer;
}();

_defineProperty(ModalLayer, "_env", ENV);

_defineProperty(ModalLayer, "_enum", ENUM);

_defineProperty(ModalLayer, "_struct", STRUCT);

_defineProperty(ModalLayer, "_option", OPTION);

_defineProperty(ModalLayer, "_variable", new Map());

_defineProperty(ModalLayer, "_worker", window.Worker ? new Map() : undefined);

_defineProperty(ModalLayer, "_event", EVENT);

_defineProperty(ModalLayer, "_version", 1.0);

_defineProperty(ModalLayer, "_achieve", new Map());

_defineProperty(ModalLayer, "_assistant", Object.create(null));

_defineProperty(ModalLayer, "_instance", new Proxy([], {
  set: function set(obj, attr, val) {
    if (val instanceof ModalLayer || attr === 'length') {
      obj[attr] = val;
      return true;
    }

    throw new TypeError('Must be of type ModalLayer');
  }
}));

_defineProperty(ModalLayer, "_minimizeQueue", new Proxy([], {
  set: function set(obj, key, val) {
    if (val instanceof ModalLayer) {
      var valIndex = obj.indexOf(val);
      val['minimize']();
      if (valIndex < 0) obj[key] = val;else obj[valIndex] = val;
      return true;
    } else if (key === 'length') {
      obj[key] = val;
      return true;
    }

    return false;
  },
  deleteProperty: function deleteProperty(obj, key) {
    key = parseInt(key);

    if (Number.isInteger(key) && obj[key] instanceof ModalLayer) {
      obj[key]['revert']();

      if (obj[key + 1]) {
        for (var i = key; i < obj.length - 1; i++) {
          obj[i] = obj[i + 1];
        }
      }

      delete obj[obj.length - 1];
      obj.length--;
      return true;
    }
  }
}));

Object.seal(ModalLayer);

if (Object.is(window['ModalLayer'], ModalLayer)) {
  console.group('ModalLayer already exists');
  console.warn("Already version ".concat(window['ModalLayer']['_version']));
  console.warn("Try to introduce version: ".concat(ModalLayer['_version']));
  console.groupEnd();
} else {
  Object.preventExtensions(ModalLayer);
  Object.defineProperty(window, 'ModalLayer', {
    'value': ModalLayer
  });
}

var FileAssistant = function () {
  function FileAssistant() {
    _classCallCheck(this, FileAssistant);
  }

  _createClass(FileAssistant, null, [{
    key: "getFileBinary",
    value: function getFileBinary(url, options) {
      var _options;

      options = (_options = options) !== null && _options !== void 0 ? _options : {};
      options = ObjectAssistant['merge'](options, {
        mode: 'cors',
        method: 'get',
        cache: 'no-cache',
        redirect: 'follow',
        credentials: 'include',
        referrer: 'no-referrer',
        headers: {
          'content-type': 'text/plain'
        }
      });
      return fetch(url, options);
    }
  }, {
    key: "getFileBlob",
    value: function getFileBlob(mixed) {
      var blob = null;
      if (mixed instanceof Blob) blob = Promise.resolve(mixed);else if (mixed instanceof Image || mixed instanceof Element && mixed.nodeName === 'IMAGE') blob = this.getFileBinary(mixed.src).then(function (response) {
        return response.blob();
      });else if (typeof mixed === 'string' || mixed instanceof String) blob = this.getFileBinary(mixed).then(function (response) {
        return response.blob();
      });else blob = Promise.reject(false);
      return blob;
    }
  }, {
    key: "getImage",
    value: function getImage(mixed) {
      var image = null;

      if (typeof mixed === 'string' || mixed instanceof String) {
        image = mixed;
      } else if (mixed instanceof Image || mixed instanceof Element && mixed.nodeName === 'IMAGE') {
        image = mixed.src;
      } else if (mixed instanceof Blob || mixed instanceof MediaSource) {
        image = URL.createObjectURL(mixed);
      } else {
        image = false;
      }

      return image;
    }
  }]);

  return FileAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'file', {
  value: FileAssistant
});

var CacheAssistant = function () {
  function CacheAssistant() {
    _classCallCheck(this, CacheAssistant);
  }

  _createClass(CacheAssistant, null, [{
    key: "has",
    value: function has(k) {
      var _o2;

      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var symbol;
      o = (_o2 = o) !== null && _o2 !== void 0 ? _o2 : CacheAssistant;
      symbol = CacheAssistant['_symbol'].get(o);
      return symbol ? o[symbol].has(k) : false;
    }
  }, {
    key: "get",
    value: function get(k) {
      var _o3;

      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var symbol;
      o = (_o3 = o) !== null && _o3 !== void 0 ? _o3 : CacheAssistant;
      symbol = CacheAssistant['_symbol'].get(o);
      return symbol ? o[symbol].get(k) : undefined;
    }
  }, {
    key: "set",
    value: function set(k, v) {
      var _o4;

      var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var symbol;
      o = (_o4 = o) !== null && _o4 !== void 0 ? _o4 : CacheAssistant;

      if (!CacheAssistant['_symbol'].has(o)) {
        symbol = Symbol('cache');
        CacheAssistant['_symbol'].set(o, symbol);
      } else {
        symbol = CacheAssistant['_symbol'].get(o);
      }

      if (!Object.hasOwnProperty.call(o, symbol)) Object.defineProperty(o, symbol, {
        'value': new Map(),
        'writable': false,
        'enumerable': false,
        'configurable': false
      });
      o[symbol].set(k, v);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _o5;

      var k = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var _o, symbol;

      o = (_o5 = o) !== null && _o5 !== void 0 ? _o5 : CacheAssistant;
      symbol = CacheAssistant['_symbol'].get(o);

      if (k) {
        o[symbol]["delete"](k);
      } else {
        o[symbol].forEach(function (v, k) {
          o[symbol]["delete"](k);
        });
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      CacheAssistant['_symbol'].forEach(function (v, k) {
        CacheAssistant['delete'](null, k);
      });
    }
  }]);

  return CacheAssistant;
}();

_defineProperty(CacheAssistant, "_symbol", new Map());

Object.defineProperty(ModalLayer['_assistant'], 'cache', {
  value: CacheAssistant
});

var EventAssistant = function () {
  function EventAssistant() {
    _classCallCheck(this, EventAssistant);
  }

  _createClass(EventAssistant, null, [{
    key: "add",
    value: function add(element, type, selector, callback, thisArg, parameter, options) {
      var _selector;

      var wantsUntrusted = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var cache, eventSymbol;
      var promise, usePromise;
      usePromise = false;
      eventSymbol = Symbol();

      if (!(cache = CacheAssistant['get']('cache', EventAssistant))) {
        cache = new Map();
        CacheAssistant['set']('cache', cache, EventAssistant);
      }

      if (!(element instanceof EventTarget)) {
        if (!(element = document.querySelector(element))) throw Error('Is not a valid element.');
      }

      if (!ObjectAssistant['isString'](type)) throw Error('Event type not allowed to be empty');

      if (selector instanceof EventTarget) {
        element = selector;
        selector = null;
      }

      if (!(callback instanceof Function)) usePromise = true;
      if (ObjectAssistant['isEmpty'](thisArg)) thisArg = (_selector = selector) !== null && _selector !== void 0 ? _selector : element;
      if (!ObjectAssistant['isEmpty'](parameter) && !Array.isArray(parameter)) parameter = [parameter];
      if (ObjectAssistant['isEmpty'](options)) options = false;

      if (usePromise) {
        var _parameter;

        parameter = [{
          'target': thisArg,
          'symbol': eventSymbol,
          'parameter': (_parameter = parameter) !== null && _parameter !== void 0 ? _parameter : []
        }];
      } else {
        var _parameter2;

        parameter = (_parameter2 = parameter) !== null && _parameter2 !== void 0 ? _parameter2 : [];
      }

      if (selector) {
        promise = new Promise(function (resolve) {
          var delegate = function delegate(event) {
            var lastParam;
            var target, findElement, findElements;
            target = (event !== null && event !== void 0 ? event : window.event).target;
            findElements = element.querySelectorAll(selector);
            if (target.contains(element) || findElements.length === 0) return false;

            for (var i = 0; i < findElements.length; i++) {
              findElement = findElements[i];

              if (findElement.contains(target)) {
                target = findElement === target ? target : findElement;

                if (usePromise) {
                  parameter[0]['event'] = event;
                  parameter[0]['target'] = thisArg === selector ? target : thisArg;
                } else {
                  if (parameter.length > 0 && parameter[parameter.length - 1] instanceof Event) parameter[parameter.length - 1] = event;else parameter.push(event);
                }

                (usePromise ? resolve : callback).apply(thisArg === selector ? target : thisArg, parameter);
                break;
              }
            }
          };

          cache.set(eventSymbol, {
            'type': type,
            'element': element,
            'options': options,
            'selector': selector,
            'callback': delegate,
            'wantsUntrusted': wantsUntrusted
          });
          element.addEventListener(type, delegate, options, wantsUntrusted);
        });
      } else {
        promise = new Promise(function (resolve) {
          var _ref;

          callback = (_ref = usePromise ? resolve : callback).bind.apply(_ref, [thisArg].concat(_toConsumableArray(parameter)));
          cache.set(eventSymbol, {
            'type': type,
            'element': element,
            'options': options,
            'selector': selector,
            'callback': callback,
            'wantsUntrusted': wantsUntrusted
          });
          element.addEventListener(type, callback, options, wantsUntrusted);
        });
      }

      return usePromise ? promise : eventSymbol;
    }
  }, {
    key: "remove",
    value: function remove(symbol) {
      var _cache2;

      var cache, eventOptions;
      cache = CacheAssistant['get']('cache', EventAssistant);
      eventOptions = (_cache2 = cache) === null || _cache2 === void 0 ? void 0 : _cache2['get'](symbol);

      if (eventOptions) {
        eventOptions['element'].removeEventListener(eventOptions['type'], eventOptions['callback'], eventOptions['options']);
        cache['delete'](symbol);
        ObjectAssistant['dereference'](eventOptions);
      }
    }
  }, {
    key: "removeBy",
    value: function removeBy(key, value) {
      var cache = CacheAssistant['get']('cache', EventAssistant);
      if (!['element', 'selector', 'callback'].includes(key)) throw Error('key value is invalid');
      cache === null || cache === void 0 ? void 0 : cache.forEach(function (v, k) {
        if (v[key] === value) {
          v['element'].removeEventListener(v['type'], v['callback'], v['options'], v['wantsUntrusted']);
          cache['delete'](k);
        }
      });
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var cache = CacheAssistant['get']('cache', EventAssistant);
      cache === null || cache === void 0 ? void 0 : cache.forEach(function (v, k) {
        v['element'].removeEventListener(v['type'], v['callback'], v['options'], v['wantsUntrusted']);
        cache['delete'](k);
      });
    }
  }]);

  return EventAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'event', {
  value: EventAssistant
});

var WorkerAssistant = function () {
  function WorkerAssistant() {
    _classCallCheck(this, WorkerAssistant);
  }

  _createClass(WorkerAssistant, null, [{
    key: "has",
    value: function has(k) {
      var _CacheAssistant$get$h, _CacheAssistant$get;

      return (_CacheAssistant$get$h = (_CacheAssistant$get = CacheAssistant['get']('list', WorkerAssistant)) === null || _CacheAssistant$get === void 0 ? void 0 : _CacheAssistant$get.has(k)) !== null && _CacheAssistant$get$h !== void 0 ? _CacheAssistant$get$h : false;
    }
  }, {
    key: "add",
    value: function add(k, w) {
      var cache;
      if (!(cache = CacheAssistant['get']('list', WorkerAssistant))) CacheAssistant['set']('list', cache = new Map(), WorkerAssistant);
      if (!(w instanceof Worker)) throw new TypeError('Not a Worker instance.');
      if (WorkerAssistant['has'](k)) throw new Error('The key already exists.');
      cache.set(k, w);
    }
  }, {
    key: "get",
    value: function get(k) {
      var _CacheAssistant$get2;

      return (_CacheAssistant$get2 = CacheAssistant['get']('list', WorkerAssistant)) === null || _CacheAssistant$get2 === void 0 ? void 0 : _CacheAssistant$get2.get(k);
    }
  }, {
    key: "create",
    value: function create(k, url) {
      var add = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var worker, cache;
      if (!(cache = CacheAssistant['get']('list', WorkerAssistant))) CacheAssistant['set']('list', cache = new Map(), WorkerAssistant);

      try {
        worker = new Worker(url);
        cache.set(k, worker);
        if (add) WorkerAssistant.add(k, worker);
      } catch (e) {
        throw e;
      }

      return worker;
    }
  }, {
    key: "close",
    value: function close(worker) {
      var _worker;

      if (!(worker instanceof Worker)) {
        worker = WorkerAssistant['get'](worker);
        WorkerAssistant['list']["delete"](worker);
      }

      (_worker = worker) === null || _worker === void 0 ? void 0 : _worker.terminate();
    }
  }, {
    key: "listener",
    value: function listener(worker) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var promise;

      if (!(worker instanceof Worker)) {
        worker = WorkerAssistant['get'](worker);
        if (worker === undefined) throw Error('Worker not found.');
      }

      promise = new Promise(function (resolve, reject) {
        worker.onmessageerror = reject;

        worker.onmessage = function (e) {
          callback === null || callback === void 0 ? void 0 : callback(e);
          resolve(e);
        };
      });
      return promise;
    }
  }, {
    key: "addListener",
    value: function addListener(worker) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var promise;

      if (!(worker instanceof Worker)) {
        worker = WorkerAssistant['get'](worker);
        if (worker === undefined) throw Error('Worker not found.');
      }

      promise = new Promise(function (resolve, reject) {
        worker.addEventListener('messageerror', reject);
        worker.addEventListener('message', function (e) {
          callback === null || callback === void 0 ? void 0 : callback(e);
          resolve(e);
        });
      });
      return promise;
    }
  }]);

  return WorkerAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'worker', {
  value: WorkerAssistant
});

var ObjectAssistant = function () {
  function ObjectAssistant() {
    _classCallCheck(this, ObjectAssistant);
  }

  _createClass(ObjectAssistant, null, [{
    key: "dereference",
    value: function dereference(v) {
      v && Object.keys(v).forEach(function (_k) {
        var _v = v[_k];

        if (ObjectAssistant['isCollection'](_v)) {
          ObjectAssistant['dereference'](_v);
          if (_v instanceof Map) v["delete"](_k);else if (_v instanceof Set) v["delete"](_v);else v[_k] = null;
        } else {
          v[_k] = null;
        }
      });
    }
  }, {
    key: "get",
    value: function get(o, k) {
      var _o, _k;

      _o = o;
      _k = Array.isArray(k) ? k : k.split('.');

      for (var i = 0; i < _k.length && !ObjectAssistant['isEmpty'](_o); i++) {
        _o = _o[_k[i]];
      }

      return _o;
    }
  }, {
    key: "set",
    value: function set(o, k, v) {
      var _o, _k;

      _o = o;
      _k = Array.isArray(k) ? k : k.split('.');

      for (var i = 0; i < _k.length; _o = _o[_k[i]], i++) {
        if (ObjectAssistant['isEmpty'](_o[_k[i]])) _o[_k[i]] = {};

        if (i === _k.length - 1) {
          if (_o instanceof Map) _o.set(_k[i], v);else Object.defineProperty(_o, _k[i], {
            value: v,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(v) {
      return v === null || v === undefined;
    }
  }, {
    key: "isString",
    value: function isString(v) {
      return typeof v === 'string' || v instanceof String;
    }
  }, {
    key: "isCollection",
    value: function isCollection(v) {
      var types = [Map, Set, Array, WeakMap, WeakSet, Int8Array, Uint8Array, Int16Array, Int32Array, Uint16Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray];
      return !ObjectAssistant['isEmpty'](v) && (ObjectAssistant['isOnlyObject'](v) || types.includes(v.constructor));
    }
  }, {
    key: "isOnlyObject",
    value: function isOnlyObject(o) {
      return o && (o.constructor === Object || o.constructor === undefined);
    }
  }, {
    key: "getKeyByValue",
    value: function getKeyByValue(o, v) {
      var key, entries;
      entries = Object.entries(o);

      for (var i = 0; i < entries.length; i++) {
        if (entries[i][1] === v) return entries[i][0];
      }

      return null;
    }
  }, {
    key: "deepCopy",
    value: function deepCopy(obj) {
      var _obj$constructor, _obj$constructor2;

      var nObj, prevObj;

      var stack, _stack;

      var k, key, v, val;
      if (ObjectAssistant['isEmpty'](obj)) return obj;
      nObj = (_obj$constructor = (_obj$constructor2 = obj.constructor) === null || _obj$constructor2 === void 0 ? void 0 : _obj$constructor2.call(obj)) !== null && _obj$constructor !== void 0 ? _obj$constructor : Object.create(null);
      _stack = [nObj];
      stack = [[Object.keys(obj), Object.values(obj)]];

      do {
        prevObj = _stack.shift();

        var _stack$shift = stack.shift();

        var _stack$shift2 = _slicedToArray(_stack$shift, 2);

        key = _stack$shift2[0];
        val = _stack$shift2[1];

        for (var i = 0; i < key.length; i++) {
          k = key[i], v = val[i];

          if (ObjectAssistant['isCollection'](v)) {
            var _v$constructor, _v$constructor2, _v2;

            prevObj[k] = (_v$constructor = (_v$constructor2 = (_v2 = v).constructor) === null || _v$constructor2 === void 0 ? void 0 : _v$constructor2.call(_v2)) !== null && _v$constructor !== void 0 ? _v$constructor : Object.create(null);
            stack.push([Object.keys(v), Object.values(v)]);

            _stack.push(prevObj[k]);
          } else {
            prevObj[k] = v;
          }
        }
      } while (stack.length > 0);

      return nObj;
    }
  }, {
    key: "merge",
    value: function merge(sub, obj) {
      var _obj$constructor3, _obj$constructor4;

      var nObj, prevObj;

      var stack, _stack;

      var k, _k, key, _key, totalKey, v, _v, val, _val;

      if (ObjectAssistant['isEmpty'](sub)) return obj;
      if (ObjectAssistant['isEmpty'](obj)) return sub;
      nObj = (_obj$constructor3 = (_obj$constructor4 = obj.constructor) === null || _obj$constructor4 === void 0 ? void 0 : _obj$constructor4.call(obj)) !== null && _obj$constructor3 !== void 0 ? _obj$constructor3 : Object.create(null);
      _stack = [nObj];
      stack = [[[Object.keys(sub), Object.values(sub)], [Object.keys(obj), Object.values(obj)]]];

      do {
        prevObj = _stack.shift();

        var _stack$shift3 = stack.shift();

        var _stack$shift4 = _slicedToArray(_stack$shift3, 2);

        var _stack$shift4$ = _slicedToArray(_stack$shift4[0], 2);

        key = _stack$shift4$[0];
        val = _stack$shift4$[1];

        var _stack$shift4$2 = _slicedToArray(_stack$shift4[1], 2);

        _key = _stack$shift4$2[0];
        _val = _stack$shift4$2[1];
        _key = _toConsumableArray(new Set(_key.concat(key)));

        for (var i = 0; i < _key.length; i++) {
          var nCover = void 0;
          var _ref2 = [_key[i], _val[i]];
          _k = _ref2[0];
          _v = _ref2[1];
          v = val[key.indexOf(_k)];
          nCover = v === undefined;

          if ((nCover || ObjectAssistant['isCollection'](v)) && ObjectAssistant['isCollection'](_v)) {
            var _ref3, _ref4;

            var newEle = [];
            prevObj[_k] = (_ref3 = (_ref4 = nCover ? _v.constructor : v.constructor) === null || _ref4 === void 0 ? void 0 : _ref4()) !== null && _ref3 !== void 0 ? _ref3 : Object.create(null);
            newEle[1] = [Object.keys(_v), Object.values(_v)];
            newEle[0] = nCover ? [[], []] : [Object.keys(v), Object.values(v)];

            _stack.push(prevObj[_k]);

            stack.push(newEle);
          } else if (!ObjectAssistant['isCollection'](v) && ObjectAssistant['isCollection'](_v)) {
            prevObj[_k] = v;
          } else {
            Object.defineProperty(prevObj, _k, {
              'writable': true,
              'enumerable': true,
              'value': nCover ? _v : v
            });
          }
        }
      } while (stack.length > 0);

      return nObj;
    }
  }]);

  return ObjectAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'object', {
  value: ObjectAssistant
});

var NumberAssistant = function () {
  function NumberAssistant() {
    _classCallCheck(this, NumberAssistant);
  }

  _createClass(NumberAssistant, null, [{
    key: "multiply",
    value: function multiply(mul1, mul2) {
      var _mul1$split$1$length, _mul1$split$, _mul2$split$1$length, _mul2$split$;

      var carry, floatLen;
      floatLen = 0;
      mul1 = mul1.toString();
      mul2 = mul2.toString();
      floatLen += (_mul1$split$1$length = (_mul1$split$ = mul1.split('.')[1]) === null || _mul1$split$ === void 0 ? void 0 : _mul1$split$.length) !== null && _mul1$split$1$length !== void 0 ? _mul1$split$1$length : 0;
      floatLen = (_mul2$split$1$length = (_mul2$split$ = mul2.split('.')[1]) === null || _mul2$split$ === void 0 ? void 0 : _mul2$split$.length) !== null && _mul2$split$1$length !== void 0 ? _mul2$split$1$length : 0;
      carry = window.Math.pow(10, floatLen);
      return Number(mul1.replace('.', '')) * Number(mul2.replace('.', '')) / carry;
    }
  }, {
    key: "divide",
    value: function divide(dividend, divisor) {
      var _dividend$toString$sp, _dividend$toString$sp2, _divisor$toString$spl, _divisor$toString$spl2;

      var carry;
      carry = window.Math.pow(10, window.Math.max((_dividend$toString$sp = (_dividend$toString$sp2 = dividend.toString().split('.')[1]) === null || _dividend$toString$sp2 === void 0 ? void 0 : _dividend$toString$sp2.length) !== null && _dividend$toString$sp !== void 0 ? _dividend$toString$sp : 0, (_divisor$toString$spl = (_divisor$toString$spl2 = divisor.toString().split('.')[1]) === null || _divisor$toString$spl2 === void 0 ? void 0 : _divisor$toString$spl2.length) !== null && _divisor$toString$spl !== void 0 ? _divisor$toString$spl : 0));
      return dividend * carry / (divisor * carry);
    }
  }, {
    key: "getMedian",
    value: function getMedian(num) {
      var median;
      var ascAry, medianIdx;
      ascAry = num.map(function (n) {
        return n;
      }).sort(function (a, b) {
        return a - b;
      });

      if (ascAry.length % 2 === 1) {
        medianIdx = window.parseInt(ascAry.length / 2);
        median = ascAry[medianIdx];
      } else {
        medianIdx = window.parseInt(ascAry.length / 2);
        median = (ascAry[medianIdx - 1] + ascAry[medianIdx]) / 2;
      }

      return median;
    }
  }, {
    key: "getMode",
    value: function getMode(num) {
      var _window$Math;

      var mode;
      var max, findTime, findTimes;
      max = 0;
      mode = [];
      findTimes = new Map();
      num.forEach(function (n) {
        var _findTimes$get;

        findTime = (_findTimes$get = findTimes.get(n)) !== null && _findTimes$get !== void 0 ? _findTimes$get : 0;
        findTimes.set(n, findTime + 1);
      });
      max = (_window$Math = window.Math).max.apply(_window$Math, _toConsumableArray(findTimes.values()));
      findTimes.forEach(function (t, n) {
        if (t === max) mode.push(n);
      });
      return mode;
    }
  }, {
    key: "isFloat",
    value: function isFloat(value) {
      var number;
      value += '';
      if (!Number.isFinite(number = window.parseFloat(value))) return false;
      if (window.Math.floor(number) == number) return false;

      if (value.endsWith('%')) {
        if (number > 100) return false;
      } else if (value.endsWith('‰')) {
        if (number > 1000) return false;
      } else return false;

      return true;
    }
  }, {
    key: "getMinLegalSize",
    value: function getMinLegalSize(nowSize, minSize) {
      var newSize;
      var priority, notPriority;
      var aspectRatio, minAspectRatio;
      newSize = [];
      aspectRatio = nowSize[0] / nowSize[1];
      minAspectRatio = minSize[0] / minSize[1];
      priority = aspectRatio < 1 ? 0 : 1;
      notPriority = Number(!priority);

      if (nowSize[priority] < minSize[priority]) {
        newSize[priority] = minSize[priority];
        newSize[notPriority] = priority === 0 ? minSize[priority] / aspectRatio : minSize[priority] * aspectRatio;
      } else {
        newSize = nowSize;
      }

      return newSize;
    }
  }, {
    key: "getMaxLegalSize",
    value: function getMaxLegalSize(nowSize, maxSize) {
      var newSize;
      var priority, notPriority;
      var aspectRatio, maxAspectRatio;
      if (!nowSize || !maxSize || nowSize[0] <= maxSize[0] && nowSize[1] <= maxSize[1]) return nowSize;
      newSize = [];
      aspectRatio = nowSize[0] / nowSize[1];
      maxAspectRatio = maxSize[0] / maxSize[1];
      priority = maxAspectRatio >= 1 ? 1 : 0;
      notPriority = Number(!priority);

      if (nowSize[priority] > maxSize[priority]) {
        newSize[priority] = maxSize[priority];
        newSize[notPriority] = priority === 0 ? maxSize[priority] / aspectRatio : maxSize[priority] * aspectRatio;
      } else {
        newSize = nowSize;
      }

      return newSize;
    }
  }, {
    key: "intervalJudgment",
    value: function intervalJudgment(number, interregional) {
      var expression;
      var legalSymbol, legalSymbolMap, leftSymbol, rightSymbol;
      interregional = interregional.replace(/ /g, '').toLowerCase();
      legalSymbolMap = {
        '(': '>',
        ')': '<',
        '[': '>=',
        ']': '<='
      };
      leftSymbol = interregional[0];
      rightSymbol = interregional.slice(-1);
      legalSymbol = Object.keys(legalSymbolMap);
      interregional = interregional.slice(1, -1).split(',');
      interregional[0] = Number(interregional[0]);
      interregional[1] = Number(interregional[1]);
      if (!legalSymbol.includes(leftSymbol) && !legalSymbol.includes(rightSymbol)) return false;
      expression = number + legalSymbolMap[leftSymbol] + interregional[0] + '&&' + number + legalSymbolMap[rightSymbol] + interregional[1];
      return new Function('"use strict"; return ' + expression)();
    }
  }, {
    key: "insideRect",
    value: function insideRect(point, rect) {
      var rectLT, rectRB;
      rectLT = rect[0];
      rectRB = rect[1];
      if (point[0] < rectLT[0] || point[1] < rectLT[1] || point[0] > rectRB[0] || point[1] > rectRB[1]) return false;
      return true;
    }
  }]);

  return NumberAssistant;
}();

window['math'] && (NumberAssistant = Object.assign(NumberAssistant, window['math']));
Object.defineProperty(ModalLayer['_assistant'], 'number', {
  value: NumberAssistant
});

var StringAssistant = function () {
  function StringAssistant() {
    _classCallCheck(this, StringAssistant);
  }

  _createClass(StringAssistant, null, [{
    key: "base64Encode",
    value: function base64Encode(str) {
      return window.btoa(window.unescape(window.encodeURIComponent(str)));
    }
  }, {
    key: "base64Decode",
    value: function base64Decode(str) {
      return window.decodeURIComponent(window.escape(window.atob(str)));
    }
  }, {
    key: "ucfirst",
    value: function ucfirst(str) {
      return str[0].toUpperCase() + str.substring(1);
    }
  }, {
    key: "replace",
    value: function replace(str, search, _replace) {
      var count = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var findIndex;
      var returnArray;
      var start, ended, times, rTime, offset;
      var nStr, dealStr, dealSearch, dealReplace;
      search = Array.isArray(search) ? search : [search];
      _replace = Array.isArray(_replace) ? _replace : [_replace];
      Array.isArray(str) ? returnArray = true : (str = [str], returnArray = false);
      if (_replace.length > 1 && search.length !== _replace.length) throw Error('The number of search strings does not match the number of replacement strings.');
      offset = {
        start: 0,
        ended: 0,
        search: 0,
        replace: 0
      };

      for (nStr = [], offset.str = 0; offset.str < str.length; offset.str++) {
        nStr[offset.str] = '';
        dealStr = str[offset.str];
        rTime = offset.start = offset.ended = offset.search = offset.replace = 0;

        for (; offset.search < search.length; offset.search++, offset.replace += _replace.length > 1 ? 1 : 0) {
          findIndex = [];
          dealSearch = search[offset.search];
          dealReplace = _replace[offset.replace];

          for (var _start = 0; _start >= 0 && (count === 0 || count > 0 && rTime < count);) {
            _start = dealStr.indexOf(dealSearch, _start === 0 && rTime === 0 ? 0 : _start + 1);
            rTime += _start >= 0 ? 1 : 0;
            findIndex.push(_start);
          }

          if (findIndex[findIndex.length - 1] !== -1) findIndex.push(-1);

          for (var i = 0; findIndex.length > 0; i++) {
            offset.ended = findIndex.shift();
            nStr[offset.str] += offset.ended >= 0 ? dealStr.substring(offset.start, offset.ended) + dealReplace : dealStr.substring(offset.start);
            offset.start = offset.ended + dealSearch.length;
          }

          offset.start = offset.ended = 0;
          dealStr = nStr[offset.str];
          nStr[offset.str] = '';
        }

        nStr[offset.str] = dealStr;
      }

      return returnArray ? nStr : nStr.shift();
    }
  }, {
    key: "colorConvert",
    value: function colorConvert(str) {
      var hex;
      var color, error;
      str = str.toLowerCase();
      error = new Error('Not a legal color.');

      if (str.indexOf('#') === 0) {
        color = 'rgba(';
        str = str.substring(1);

        if (str.length === 3) {
          str = str.split('').reduce(function (s, c) {
            return s + c + c;
          }, '');
        }

        if (str.length === 6) {
          for (var i = 0; i < 3; i++) {
            color += Number('0x' + str[i * 2] + str[i * 2 + 1]) + ', ';
          }
        } else {
          throw error;
        }

        color += '255)';
      } else if (str.indexOf('rgb') === 0) {
        color = '#';
        str = str.replace(/(rgb\(|rgba\(|\)| )/g, '').split(',');

        for (var _i2 = 0; _i2 < 3; _i2++) {
          hex = Number(str[_i2]).toString(16);
          color += hex.length === 1 ? hex + hex : hex;
        }
      } else {
        throw error;
      }

      return color;
    }
  }]);

  return StringAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'string', {
  value: StringAssistant
});

var ElementAssistant = function () {
  function ElementAssistant() {
    _classCallCheck(this, ElementAssistant);
  }

  _createClass(ElementAssistant, null, [{
    key: "isOverflow",
    value: function isOverflow(child, parent) {
      var childRect, parentRect;
      childRect = child.getBoundingClientRect();
      parentRect = parent ? parent.getBoundingClientRect() : {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
      if (childRect.x < parentRect.x || childRect.x + childRect.width > parentRect.x + parentRect.width) return true;
      if (childRect.y < parentRect.y || childRect.y + childRect.height > parentRect.y + parentRect.height) return true;
      return false;
    }
  }, {
    key: "getAllElement",
    value: function getAllElement(parentNode) {
      var nodeList, childrenNodeList;
      nodeList = [];
      childrenNodeList = parentNode.children;

      if (childrenNodeList.length !== 0) {
        for (var i = 0; i < childrenNodeList.length; i++) {
          nodeList.push(childrenNodeList[i]);
          nodeList = nodeList.concat(ElementAssistant['getAllElement'](childrenNodeList[i]));
        }
      }

      return nodeList;
    }
  }, {
    key: "getNodeHeight",
    value: function getNodeHeight(node) {
      var pseudo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var computedStyle, marginBottom;
      computedStyle = getComputedStyle(node, pseudo);
      marginBottom = parseInt(computedStyle.marginBottom);
      return node.offsetTop + node.offsetHeight + marginBottom;
    }
  }, {
    key: "getBeforeElementHeight",
    value: function getBeforeElementHeight(node) {
      var h, prevNode;
      h = 0;
      prevNode = node;

      while ((prevNode = prevNode.previousElementSibling) && !['absolute', 'fixed'].includes(getComputedStyle(prevNode, null).position)) {
        h += prevNode.offsetHeight;
      }

      return h;
    }
  }, {
    key: "getNodeOriginalSize",
    value: function getNodeOriginalSize(node) {
      var area, childNodes;
      area = [0, 0];
      childNodes = ElementAssistant['getAllElement'](node);
      childNodes.forEach(function (n) {
        if (getComputedStyle(n, null).position == 'absolute') return;
        area[0] = n.offsetWidth > area[0] ? n.offsetWidth : area[0];
        if (n.parentNode === node) area[1] += n.offsetHeight;
      });
      return area;
    }
  }, {
    key: "maxZIndex",
    value: function maxZIndex(node) {
      var allNodes;
      if (node) allNodes = ElementAssistant.getAllElement(node);else allNodes = Array.from(document.all);
      return parseInt(allNodes.reduce(function (prev, currNode) {
        var currNodeZIndex = getComputedStyle(currNode, null).zIndex;
        return window.Math.max(prev, !Number.isInteger(currNodeZIndex) ? currNodeZIndex : 0);
      }, 0));
    }
  }, {
    key: "objectToNode",
    value: function objectToNode(nodeList) {
      var buildNode = {};

      for (var item in nodeList) {
        var node = document.createElement(nodeList[item]['nodeType']);

        if (typeof nodeList[item]['nodeType'] != 'undefined') {
          for (var attr in nodeList[item]) {
            if (attr == 'nodeType') {
              continue;
            } else if (attr.toLocaleLowerCase() == 'innerhtml') {
              var resNode = ElementAssistant['objectToNode'](nodeList[item][attr]);

              for (var nodeItem in resNode) {
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
  }, {
    key: "launchFullscreen",
    value: function launchFullscreen(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        navigationUI: 'show'
      };
      var requestFullscreen = element.requestFullscreen(options);
      return requestFullscreen;
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      document.exitFullscreen();
    }
  }, {
    key: "getFullscreenNode",
    value: function getFullscreenNode() {
      return document.fullscreenElement;
    }
  }, {
    key: "createScript",
    value: function createScript(options) {
      var node, attrs;
      node = document.createElement('script');
      attrs = ['src', 'type', 'async', 'defer', 'charset', 'innerHTML'];
      attrs.forEach(function (attr) {
        options[attr] && (node[attr] = options[attr]);
      });
      return node;
    }
  }]);

  return ElementAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'element', {
  value: ElementAssistant
});

var FormulaAssistant = function () {
  function FormulaAssistant() {
    _classCallCheck(this, FormulaAssistant);
  }

  _createClass(FormulaAssistant, null, [{
    key: "getDistribution",
    value: function getDistribution(position, sigma) {
      var dimension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      var exp, cache, _cache;

      if (dimension === 1 && Array.isArray(position)) throw Error('One-dimensional operation position value cannot be an array');
      if (dimension === 2 && !Array.isArray(position)) throw Error('Two-dimensional operation position value must be an array');

      if (!(_cache = CacheAssistant['get']('gaussian', FormulaAssistant))) {
        _cache = new Map();
        CacheAssistant['set']('gaussian', _cache, FormulaAssistant);
      }

      if (!(cache = _cache.get(sigma))) {
        cache = Object.create(null);
        cache['square'] = sigma * sigma;
        cache['multiplier'] = [1 / (sigma * window.Math.sqrt(2 * window.Math.PI)), 1 / (2 * window.Math.PI * cache['square'])];

        _cache.set(sigma, cache);
      }

      ;

      switch (dimension) {
        case 1:
          exp = window.Math.exp(-(position * position) / (2 * cache['square']));
          break;

        case 2:
          exp = window.Math.exp(-(window.Math.pow(position[0], 2) + window.Math.pow(position[1], 2)) / (2 * cache['square']));
          break;

        default:
          break;
      }

      return cache['multiplier'][dimension - 1] * exp;
    }
  }]);

  return FormulaAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'formula', {
  value: FormulaAssistant
});

var StorageAssistant = function () {
  function StorageAssistant() {
    _classCallCheck(this, StorageAssistant);
  }

  _createClass(StorageAssistant, null, [{
    key: "getStorage",
    value: function getStorage(type) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (!StorageAssistant['_achieve'][type]) throw Error("The specified storage ".concat(type, " was not found."));
      return _construct(StorageAssistant['_achieve'][type], _toConsumableArray(param));
    }
  }]);

  return StorageAssistant;
}();

_defineProperty(StorageAssistant, "_achieve", Object.create(null));

Object.defineProperty(ModalLayer['_assistant'], 'storage', {
  value: StorageAssistant
});

var CanvasAssistant = function () {
  function CanvasAssistant() {
    _classCallCheck(this, CanvasAssistant);
  }

  _createClass(CanvasAssistant, null, [{
    key: "drawText",
    value: function drawText(ctx, options) {
      var _option, measureText;

      _option = {
        'text': null,
        'fill': true,
        'color': 'black',
        'direction': 'ltr',
        'textAlign': 'center',
        'textBaseline': 'middle',
        'font': 'normal 16px Microsoft YaHei, serif',
        'point': [ctx.canvas.width / 2, ctx.canvas.height / 2]
      };
      options = ObjectAssistant.merge(options, _option);
      if (!options['text']) return;
      ctx.save();
      ctx.font = options['font'];
      ctx.fillStyle = options['color'];
      ctx.direction = options['direction'];
      ctx.textAlign = options['textAlign'];
      ctx.textBaseline = options['textBaseline'];
      measureText = ctx.measureText(options['text']);
      options['point'][1] += measureText.actualBoundingBoxDescent / 2;
      if (options['fill'] === true) ctx.fillText.apply(ctx, [options['text']].concat(_toConsumableArray(options['point']), [options['maxWidth']]));else ctx.strokeText.apply(ctx, [options['text']].concat(_toConsumableArray(options['point']), [options['maxWidth']]));
      ctx.restore();
    }
  }, {
    key: "drawRound",
    value: function drawRound(ctx, options) {
      var _option;

      _option = {
        'step': [],
        'radius': 5,
        'fill': true,
        'borderWidth': 5,
        'borderColor': 'black',
        'fillColor': 'transparent',
        'point': [ctx.canvas.width / 2, ctx.canvas.height / 2]
      };
      options = ObjectAssistant.merge(options, _option);
      ctx.save();
      ctx.fillStyle = options['fillColor'];
      ctx.lineWidth = options['borderWidth'];
      ctx.strokeStyle = options['borderColor'];
      ctx.beginPath();
      ctx.setLineDash(options['step']);
      ctx.arc.apply(ctx, _toConsumableArray(options['point']).concat([options['radius'], 0, 2 * window.Math.PI]));
      ctx.stroke();
      if (options['fill'] === true) ctx.fill();
      ctx.restore();
    }
  }, {
    key: "drawRect",
    value: function drawRect(ctx) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var w = arguments.length > 3 ? arguments[3] : undefined;
      var h = arguments.length > 4 ? arguments[4] : undefined;
      var size = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'white';
      var lineDash = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      ctx.save();
      ctx.lineWidth = size;

      if (Array.isArray(lineDash)) {
        ctx.strokeStyle = color;
        ctx.setLineDash(lineDash);
        ctx.strokeRect(x, y, w, h);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
      }

      ctx.restore();
    }
  }, {
    key: "drawLBorder",
    value: function drawLBorder(ctx) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var w = arguments.length > 3 ? arguments[3] : undefined;
      var h = arguments.length > 4 ? arguments[4] : undefined;
      var lW = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 25;
      var lH = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 5;
      var color = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '#0eb0f1';
      var lineDash = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      ctx.save();

      if (Array.isArray(lineDash)) {
        ctx.strokeStyle = color;
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, lW, lH);
        ctx.fillRect(x, y, lH, lW);
        ctx.fillRect(x + w, y, -lW, lH);
        ctx.fillRect(x + w, y, -lH, lW);
        ctx.fillRect(x + w, y + h, -lW, -lH);
        ctx.fillRect(x + w, y + h, -lH, -lW);
        ctx.fillRect(x, y + h, lW, -lH);
        ctx.fillRect(x, y + h, lH, -lW);
      }

      ctx.restore();
    }
  }, {
    key: "drawGrid",
    value: function drawGrid(ctx) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var w = arguments.length > 3 ? arguments[3] : undefined;
      var h = arguments.length > 4 ? arguments[4] : undefined;
      var size = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'black';
      var cate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'quarter';
      var lineDash = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      if (CanvasAssistant['drawGrid' + StringAssistant['ucfirst'](cate)] instanceof Function) CanvasAssistant['drawGrid' + StringAssistant['ucfirst'](cate)](ctx, x, y, w !== null && w !== void 0 ? w : ctx.canvas.width, h !== null && h !== void 0 ? h : ctx.canvas.height, size, color, lineDash);else throw Error(cate + ' grid not detected');
    }
  }, {
    key: "drawGridQuarter",
    value: function drawGridQuarter(ctx) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var w = arguments.length > 3 ? arguments[3] : undefined;
      var h = arguments.length > 4 ? arguments[4] : undefined;
      var size = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
      var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'black';
      var lineDash = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var cas, avg;
      cas = ctx.canvas;
      avg = [NumberAssistant['divide'](w, 4), NumberAssistant['divide'](h, 4)];
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      Array.isArray(lineDash) && ctx.setLineDash(lineDash);

      for (var i = 1; i < 4; i++) {
        ctx.moveTo(avg[0] * i + x, y);
        ctx.lineTo(avg[0] * i + x, y + h);
        ctx.moveTo(x, avg[1] * i + y);
        ctx.lineTo(x + w, avg[1] * i + y);
      }

      ctx.stroke();
      ctx.restore();
    }
  }, {
    key: "layerMerge",
    value: function layerMerge(ctx, source, sourceVariable, destination, destinationVariable) {
      var _cacheCtx, _cacheCtx2;

      var compositeOperation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'source-over';
      var cacheCas, cacheCtx;

      if (!(cacheCas = CacheAssistant['get']('mergeCas', CanvasAssistant))) {
        cacheCas = new OffscreenCanvas(ctx.canvas.width, ctx.canvas.height);
        CacheAssistant['set']('mergeCas', cacheCas, CanvasAssistant);
      }

      cacheCtx = cacheCas.getContext('2d');
      cacheCtx.save();

      (_cacheCtx = cacheCtx).drawImage.apply(_cacheCtx, [source].concat(_toConsumableArray(sourceVariable)));

      cacheCtx.globalCompositeOperation = compositeOperation;

      (_cacheCtx2 = cacheCtx).drawImage.apply(_cacheCtx2, [destination].concat(_toConsumableArray(destinationVariable)));

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(cacheCas, 0, 0);
      cacheCtx.restore();
      cacheCtx.clearRect(0, 0, cacheCas.width, cacheCas.height);
    }
  }, {
    key: "download",
    value: function download(canvas) {
      var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'canvas';
      var type = arguments.length > 2 ? arguments[2] : undefined;
      var node;

      if (CacheAssistant['has']('downloadNode', CanvasAssistant)) {
        node = CacheAssistant['get']('downloadNode', CanvasAssistant);
      } else {
        node = document.createElement('a');
        CacheAssistant['set']('downloadNode', node, CanvasAssistant);
      }

      node.download = filename;
      node.href = canvas.toDataURL(type);
      node.click();
    }
  }]);

  return CanvasAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'canvas', {
  value: CanvasAssistant
});

var CanvasFilterAssistant = function () {
  function CanvasFilterAssistant() {
    _classCallCheck(this, CanvasFilterAssistant);
  }

  _createClass(CanvasFilterAssistant, null, [{
    key: "getImagedata",
    value: function getImagedata(image) {
      var cas, ctx, result;

      if (image instanceof Image) {
        cas = document.createElement('canvas');
        ctx = cas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        result = ctx.getImageData(0, 0, cas.width, cas.height);
      } else if (image instanceof ImageData) {
        result = image;
      } else {
        throw new Error('can not parse image');
      }

      return result;
    }
  }, {
    key: "grayscale",
    value: function grayscale(image) {
      var r, g, b, a, gray, pixelSize, imageData, newImgData;

      try {
        imageData = CanvasFilterAssistant['getImagedata'](image);
        pixelSize = imageData.width * imageData.height * 4;
        newImgData = new Uint8ClampedArray(imageData.data.length);

        for (var i = 0; i < pixelSize; i += 4) {
          r = imageData.data[i];
          g = imageData.data[i + 1];
          b = imageData.data[i + 2];
          a = imageData.data[i + 3];
          gray = r * 0.299 + g * 0.587 + b * 0.114;
          newImgData[i] = gray;
          newImgData[i + 1] = gray;
          newImgData[i + 2] = gray;
          newImgData[i + 3] = a;
        }
      } catch (e) {
        throw e;
      }

      return new ImageData(newImgData, imageData.width, imageData.height);
    }
  }, {
    key: "gaussianBlur",
    value: function gaussianBlur(image) {
      var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
      var sigma = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var width, height;
      var divisor, imageData, newImgData, gaussianMask, gaussianMaskMap;
      var r, g, b, imgX, imgY, maskIndex, currIndex, tempIndex, imgDataIndex;

      try {
        imageData = CanvasFilterAssistant['getImagedata'](image);
        width = imageData.width;
        height = imageData.height;
        divisor = 0;

        if (!(gaussianMaskMap = CacheAssistant['get']('gaussianMask', CanvasFilterAssistant))) {
          gaussianMaskMap = new Map();
          CacheAssistant['set']('gaussianMask', gaussianMaskMap, CanvasFilterAssistant);
        }

        if (!(gaussianMask = gaussianMaskMap.get("".concat(radius, ",").concat(sigma)))) {
          gaussianMask = [];

          for (maskIndex = -radius; maskIndex <= radius; maskIndex++) {
            var distribution = FormulaAssistant['getDistribution'](maskIndex, sigma, 1);
            gaussianMask.push(distribution);
            divisor += distribution;
          }

          for (var i = 0; i < gaussianMask.length; i++) {
            gaussianMask[i] /= divisor;
          }

          gaussianMaskMap.set("".concat(radius, ",").concat(sigma), gaussianMask);
        }

        newImgData = new Uint8ClampedArray(imageData.data.length);

        for (imgY = 0; imgY < height; imgY++) {
          for (imgX = 0; imgX < width; imgX++) {
            divisor = 0;
            r = g = b = 0;
            imgDataIndex = (imgY * width + imgX) * 4;

            for (var _i3 = -radius; _i3 <= radius; _i3++) {
              tempIndex = imgX + _i3;
              maskIndex = _i3 + radius;

              if (tempIndex >= 0 && tempIndex < width) {
                currIndex = (imgY * width + tempIndex) * 4;
                r += imageData.data[currIndex] * gaussianMask[maskIndex];
                g += imageData.data[currIndex + 1] * gaussianMask[maskIndex];
                b += imageData.data[currIndex + 2] * gaussianMask[maskIndex];
                divisor += gaussianMask[maskIndex];
              }
            }

            newImgData[imgDataIndex] = r / divisor;
            newImgData[imgDataIndex + 1] = g / divisor;
            newImgData[imgDataIndex + 2] = b / divisor;
            newImgData[imgDataIndex + 3] = imageData.data[imgDataIndex + 3];
          }
        }

        for (imgX = 0; imgX < width; imgX++) {
          for (imgY = 0; imgY < height; imgY++) {
            divisor = 0;
            r = g = b = 0;
            imgDataIndex = (imgY * width + imgX) * 4;

            for (var _i4 = -radius; _i4 <= radius; _i4++) {
              tempIndex = imgY + _i4;
              maskIndex = _i4 + radius;

              if (tempIndex >= 0 && tempIndex < height) {
                currIndex = (tempIndex * width + imgX) * 4;
                r += newImgData[currIndex] * gaussianMask[maskIndex];
                g += newImgData[currIndex + 1] * gaussianMask[maskIndex];
                b += newImgData[currIndex + 2] * gaussianMask[maskIndex];
                divisor += gaussianMask[maskIndex];
              }
            }

            newImgData[imgDataIndex] = r / divisor;
            newImgData[imgDataIndex + 1] = g / divisor;
            newImgData[imgDataIndex + 2] = b / divisor;
          }
        }
      } catch (e) {
        throw e;
      }

      return new ImageData(newImgData, width, height);
    }
  }, {
    key: "mirror",
    value: function mirror(image) {
      var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var imgX, imgY;
      var currIndex, mirrIndex;
      var r, g, b, width, height, imageData, newImgData;

      try {
        imageData = CanvasFilterAssistant['getImagedata'](image);
        width = imageData.width;
        height = imageData.height;
        newImgData = new Uint8ClampedArray(imageData.data.length);

        for (imgY = 0; imgY < height; imgY++) {
          for (imgX = 0; imgX < width; imgX++) {
            currIndex = (imgY * width + imgX) * 4;
            if (axis == 0) mirrIndex = (imgY * width + width - imgX) * 4;else if (axis == 1) mirrIndex = ((height - imgY) * width + imgX) * 4;else throw new Error('not give axis');
            newImgData[currIndex] = imageData.data[mirrIndex];
            newImgData[currIndex + 1] = imageData.data[mirrIndex + 1];
            newImgData[currIndex + 2] = imageData.data[mirrIndex + 2];
            newImgData[currIndex + 3] = imageData.data[mirrIndex + 3];
            newImgData[mirrIndex] = imageData.data[currIndex];
            newImgData[mirrIndex + 1] = imageData.data[currIndex + 1];
            newImgData[mirrIndex + 2] = imageData.data[currIndex + 2];
            newImgData[mirrIndex + 3] = imageData.data[currIndex + 3];
          }
        }
      } catch (e) {
        throw e;
      }

      return new ImageData(newImgData, width, height);
    }
  }]);

  return CanvasFilterAssistant;
}();

_defineProperty(CanvasFilterAssistant, "__gaussianMask", {});

Object.defineProperty(ModalLayer['_assistant'], 'canvasFilter', {
  value: CanvasFilterAssistant
});

var CanvasAnimationAssistant = function () {
  function CanvasAnimationAssistant() {
    _classCallCheck(this, CanvasAnimationAssistant);
  }

  _createClass(CanvasAnimationAssistant, null, [{
    key: "loadFailedFade",
    value: function loadFailedFade(ctx, options) {
      var _option$speed;

      var start, elapse, interval;

      var _fps, _opacity, _repaint;

      var iconKey, textKey, roundKey;

      var _cache, _option, _frameAnimation;

      var speed, casIdx, opacity, direction;
      var casCenter, textCenter, roundCenter;
      var iconOption, textOption, roundOption, defaultOption;
      var iconCas, iconCtx, textCas, textCtx, roundCas, roundCtx;
      if (!(ctx instanceof CanvasRenderingContext2D)) throw Error('Requires a value of type "CanvasRenderingContext2D"');
      if (ObjectAssistant['isEmpty'](options)) options = Object.create(null);
      _fps = 60;
      _opacity = 1;
      _repaint = 'animation-loadFailedFade-' + Date.now() + '-' + performance.now() + (options['sign'] ? '-' + options['sign'] : '');
      iconOption = {
        'size': 72,
        'char': ['!', '?'],
        'color': 'rgba(220, 53, 69)',
        'font': 'bold 72px Microsoft YaHei, serif'
      };
      textOption = {
        'size': 16,
        'color': 'black',
        'text': 'Load Failed',
        'font': 'normal 16px Microsoft YaHei, serif'
      };
      roundOption = {
        'step': [5],
        'radius': 48,
        'fill': false,
        'borderWidth': 5,
        'fillColor': '#ddd',
        'borderColor': '#ddd'
      };
      defaultOption = {
        'duration': 4,
        'speed': null,
        'icon': iconOption,
        'text': textOption,
        'round': roundOption
      };
      _option = ObjectAssistant.merge(options, defaultOption);
      iconKey = JSON.stringify(_option['icon']);
      textKey = JSON.stringify(_option['text']);
      roundKey = JSON.stringify(_option['round']);
      _option['speed'] = (_option$speed = _option['speed']) !== null && _option$speed !== void 0 ? _option$speed : _option['duration'] / (_option['icon']['char'].length * 2 * _opacity);

      if (!(_cache = CacheAssistant['get']('loadFailedFade', CanvasAnimationAssistant))) {
        _cache = new Map();
        CacheAssistant['set']('loadFailedFade', _cache, CanvasAnimationAssistant);
      }

      if (!(iconCas = _cache.get(iconKey))) {
        iconCas = [];

        for (var i = 0; i < _option['icon']['char'].length; i++) {
          iconCas[i] = new OffscreenCanvas(_option['icon']['size'], _option['icon']['size']);
          iconCtx = iconCas[i].getContext('2d');
          _option['icon']['text'] = _option['icon']['char'][i];
          CanvasAssistant['drawText'](iconCtx, _option['icon']);
        }

        _cache.set(iconKey, iconCas);
      }

      if (!(textCas = _cache.get(textKey))) {
        textCas = new OffscreenCanvas(_option['text']['size'] * _option['text']['text'].length, _option['text']['size'] * 2);
        textCtx = textCas.getContext('2d');
        CanvasAssistant['drawText'](textCtx, _option['text']);

        _cache.set(textKey, textCas);
      }

      if (!(roundCas = _cache.get(roundKey))) {
        var w, h;
        w = h = (_option['round']['radius'] + _option['round']['borderWidth']) * 2;
        roundCas = new OffscreenCanvas(w, h);
        roundCtx = roundCas.getContext('2d');
        CanvasAssistant['drawRound'](roundCtx, _option['round']);

        _cache.set(roundKey, roundCas);
      }

      direction = 1;
      casIdx = opacity = 0;
      interval = 1000 / _fps;
      casCenter = [ctx.canvas.width / 2, ctx.canvas.height / 2];
      roundCenter = [roundCas.width / 2, (roundCas.height + textCas.height) / 2];
      textCenter = [textCas.width / 2, (roundCas.height - textCas.height) / 2];
      speed = _opacity / (_option['duration'] / iconCas.length / 2 * 1000 / interval);

      _frameAnimation = function frameAnimation(timestamp) {
        var plusNum = speed * direction;
        var repaint = Number(ctx.canvas.getAttribute(_repaint));
        var iconCenter = [iconCas[casIdx].width / 2, (iconCas[casIdx].height + textCas.height) / 2];
        if (repaint === undefined || repaint === 0) return;
        ctx.clearRect(casCenter[0] - iconCenter[0], casCenter[1] - iconCenter[1], iconCas[casIdx].width, iconCas[casIdx].height);

        if (opacity + plusNum > 1) {
          opacity = 1;
          direction = -direction;
        } else if (opacity + plusNum < 0) {
          opacity = 0;
          direction = -direction;
          casIdx = casIdx + 1 < iconCas.length ? casIdx + 1 : 0;
        } else {
          opacity += plusNum;
        }

        ctx.globalAlpha = opacity;
        ctx.drawImage(iconCas[casIdx], casCenter[0] - iconCenter[0], casCenter[1] - iconCenter[1]);
        window.requestAnimationFrame(_frameAnimation);
      };

      ctx.globalAlpha = 1;
      ctx.drawImage(roundCas, casCenter[0] - roundCenter[0], casCenter[1] - roundCenter[1]);
      ctx.drawImage(textCas, casCenter[0] - textCenter[0], casCenter[1] + textCenter[1]);
      ctx.canvas.setAttribute(_repaint, 1);
      window.requestAnimationFrame(_frameAnimation);
      return _repaint;
    }
  }]);

  return CanvasAnimationAssistant;
}();

Object.defineProperty(ModalLayer['_assistant'], 'canvasAnimation', {
  value: CanvasAnimationAssistant
});

var PageLayer = function (_ModalLayer) {
  _inherits(PageLayer, _ModalLayer);

  var _super = _createSuper(PageLayer);

  function PageLayer() {
    _classCallCheck(this, PageLayer);

    return _super.apply(this, arguments);
  }

  _createClass(PageLayer, [{
    key: "initOption",
    value: function initOption(options) {
      _get(_getPrototypeOf(PageLayer.prototype), "initOption", this).call(this, options);

      this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['page']);
    }
  }, {
    key: "linkageOption",
    value: function linkageOption() {
      _get(_getPrototypeOf(PageLayer.prototype), "linkageOption", this).call(this);

      if (this['option']['layer'].src !== null && this['option']['layer'].srcdoc !== null) this['option']['layer'].srcdoc = null;
    }
  }, {
    key: "initStruct",
    value: function initStruct() {
      var contentPage;
      var action, actionButton;
      var title, content, resize, progress, container;

      _get(_getPrototypeOf(PageLayer.prototype), "initStruct", this).call(this);

      container = this['variable']['struct']['_build']['container'];
      title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
      action = this['variable']['struct']['_backup']['action'] = ModalLayer['_struct']['action'];
      content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
      contentPage = this['variable']['struct']['_backup']['content_page'] = ModalLayer['_struct']['content_page'];
      actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];
      action.innerHTML.push(actionButton['minimize'], actionButton['expand'], actionButton['close']);
      title.innerHTML.push(action);
      if (this['option']['title'] !== false) container.innerHTML.push(title);
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
  }, {
    key: "initNode",
    value: function initNode() {
      var _this13 = this;

      var container;
      var pageNode, pageStyle;
      var scaleAnimationCss, scaleAnimationName, scaleAnimationChange;

      _get(_getPrototypeOf(PageLayer.prototype), "initNode", this).call(this);

      container = this['variable']['nodes']['container'];
      pageNode = container.querySelector('.modal-layer-page-content');
      pageStyle = 'display: block; width: ' + this['option']['layer']['area'][0] + 'px; height: ' + this['option']['layer']['area'][1] + 'px';
      Object.keys(this['option']['layer']).forEach(function (key) {
        if (ModalLayer['_assistant']['object']['isEmpty'](_this13['option']['layer'][key])) return;
        if (key === 'name') pageNode.setAttribute('name', _this13['option']['layer']['name'] + _this13['option']['index']);else pageNode.setAttribute(key, _this13['option']['layer'][key]);
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var width, height;
      var page, content, container, children;
      height = 0;
      container = this['variable']['nodes']['container'];
      children = container.children;
      page = container.querySelector('iframe[name=' + this['option']['layer']['name'] + this['option']['index'] + ']');
      page.style.cssText = "width: ".concat(this['option']['layer']['area'][0], "px; height: ").concat(this['option']['layer']['area'][1], "px;");
      width = this['option']['layer']['area'][0] + page.parentNode.offsetLeft * 2;

      for (var i = 0; i < children.length; i++) {
        height = getComputedStyle(children[i], null).position == 'absolute' ? height : window.Math.max(ModalLayer['_assistant']['element']['getNodeHeight'](children[i]), height);
      }

      container.style.cssText += "width: ".concat(width, "px; height: ").concat(height, "px;");
      this['variable']['defaultRect']['width'] = width;
      this['variable']['defaultRect']['height'] = height;
      this['variable']['defaultArea'] = [width, height];
    }
  }]);

  return PageLayer;
}(ModalLayer);

ModalLayer['_achieve'].set('page', PageLayer);

var AlertLayer = function (_ModalLayer2) {
  _inherits(AlertLayer, _ModalLayer2);

  var _super2 = _createSuper(AlertLayer);

  function AlertLayer() {
    _classCallCheck(this, AlertLayer);

    return _super2.apply(this, arguments);
  }

  _createClass(AlertLayer, [{
    key: "initStruct",
    value: function initStruct() {
      var action, actionButton;
      var interaction, interactionButton;
      var title, content, resize, progress, container;

      _get(_getPrototypeOf(AlertLayer.prototype), "initStruct", this).call(this);

      container = this['variable']['struct']['_build']['container'];
      title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
      action = this['variable']['struct']['_backup']['action'] = ModalLayer['_struct']['action'];
      content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
      interaction = this['variable']['struct']['_backup']['interaction'] = ModalLayer['_struct']['interaction'];
      actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];
      interactionButton = this['variable']['struct']['_backup']['interaction_button'] = ModalLayer['_struct']['interaction_button'];
      action.innerHTML.push(actionButton.close);
      title.innerHTML.push(action);
      if (this['option']['title'] !== false) container.innerHTML.push(title);
      container.innerHTML.push(content);

      if (this['option']['resize']['enable']) {
        resize = this['variable']['struct']['_backup']['resize_box'] = ModalLayer['_struct']['resize_box'];
        container.innerHTML.push(resize);
      }

      if (this['option']['progress']['enable']) {
        progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
        container.innerHTML.push(progress);
      }

      interaction.innerHTML.push(interactionButton.ok);
      container.innerHTML.push(interaction);
    }
  }, {
    key: "initNode",
    value: function initNode() {
      var contentNode, contentChild;

      _get(_getPrototypeOf(AlertLayer.prototype), "initNode", this).call(this);

      contentNode = this['variable']['nodes']['container'].querySelector('.modal-layer-content');

      if (Array.isArray(this['option']['content']['value'])) {
        contentChild = ModalLayer['_assistant']['element']['objectToNode'](this['option']['content']['value']);
        Object.keys(contentChild).forEach(function (k) {
          contentNode.appendChild(contentChild[k]);
        });
      } else {
        contentNode.innerHTML = this['option']['content']['value'];
      }
    }
  }]);

  return AlertLayer;
}(ModalLayer);

ModalLayer['_achieve'].set('alert', AlertLayer);

var ImageLayer = function (_ModalLayer3) {
  _inherits(ImageLayer, _ModalLayer3);

  var _super3 = _createSuper(ImageLayer);

  function ImageLayer() {
    _classCallCheck(this, ImageLayer);

    return _super3.apply(this, arguments);
  }

  _createClass(ImageLayer, [{
    key: "initOption",
    value: function initOption(options) {
      var _this14 = this;

      var base, wSize;

      _get(_getPrototypeOf(ImageLayer.prototype), "initOption", this).call(this, options);

      this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['image']);
      wSize = [window.innerWidth, window.innerHeight];
      Object.values(this['option']['layer']['sizeRange']).forEach(function (v) {
        v.forEach(function (size, i) {
          if (('' + size).endsWith('%')) base = 100;else if (('' + size).endsWith('‰')) base = 1000;else if (('' + size).includes('0.')) base = 1;else return size;
          v[i] = wSize[i] * window.parseFloat(size) / base;
        });
      });
      if (this['option']['layer']['sizeRange']['min'][0] > this['option']['layer']['sizeRange']['max'][0]) this['option']['layer']['sizeRange']['min'][0] = this['option']['layer']['sizeRange']['max'][0];
      if (this['option']['layer']['sizeRange']['min'][1] > this['option']['layer']['sizeRange']['max'][1]) this['option']['layer']['sizeRange']['min'][1] = this['option']['layer']['sizeRange']['max'][1];
      Object.keys(this['option']['layer']['toolbar']['config']).forEach(function (key, val) {
        val = _this14['option']['layer']['toolbar']['config'][key];
        if (typeof val == 'boolean') _this14['option']['layer']['toolbar']['config'][key] = {
          'enable': val,
          'title': ModalLayer['_option']['image']['toolbar']['config'][key]['title'],
          'icon': ModalLayer['_option']['image']['toolbar']['config'][key]['icon']
        };

        if (ModalLayer['_assistant']['object']['isOnlyObject'](val['config'])) {
          Object.keys(val['config']).forEach(function (k, v) {
            v = val['config'][k];
            if (typeof v == 'boolean') _this14['option']['layer']['toolbar']['config'][key]['config'][k] = {
              'enable': v,
              'title': ModalLayer['_option']['image']['toolbar']['config'][key]['config'][k]['title'],
              'icon': ModalLayer['_option']['image']['toolbar']['config'][key]['config'][k]['icon']
            };
          });
        } else if (ModalLayer['_option']['image']['toolbar']['config'][key]['config']) {
          _this14['option']['layer']['toolbar']['config'][key]['config'] = JSON.parse(JSON.stringify(ModalLayer['_option']['image']['toolbar']['config'][key]['config']));
        }
      });
    }
  }, {
    key: "compatibleOption",
    value: function compatibleOption(options) {
      var _ModalLayer$_assistan, _ModalLayer$_assistan2;

      var imageList;
      var base, wSize;
      var filterConfig, toolbarConfig;

      _get(_getPrototypeOf(ImageLayer.prototype), "compatibleOption", this).call(this, options);

      imageList = ModalLayer['_assistant']['object'].get(options, 'layer.image');
      if (imageList instanceof FileList) options['layer']['image'] = Object.values(imageList);
      if (!Array.isArray(options['layer']['image'])) options['layer']['image'] = [options['layer']['image']];
      toolbarConfig = (_ModalLayer$_assistan = ModalLayer['_assistant']['object'].get(options, 'layer.toolbar.config')) !== null && _ModalLayer$_assistan !== void 0 ? _ModalLayer$_assistan : [];
      Object.keys(toolbarConfig).forEach(function (k) {
        toolbarConfig[k] = typeof toolbarConfig[k] === 'boolean' ? {
          enable: toolbarConfig[k]
        } : toolbarConfig[k];
      });
      filterConfig = (_ModalLayer$_assistan2 = ModalLayer['_assistant']['object'].get(options, 'layer.toolbar.config.filter.config')) !== null && _ModalLayer$_assistan2 !== void 0 ? _ModalLayer$_assistan2 : [];
      Object.keys(filterConfig).forEach(function (k) {
        filterConfig[k] = typeof filterConfig[k] === 'boolean' ? {
          enable: filterConfig[k]
        } : filterConfig[k];
      });
    }
  }, {
    key: "linkageOption",
    value: function linkageOption() {
      var filterEnable, toolbarEnable;
      var filterEntries, toolbarEntries;

      _get(_getPrototypeOf(ImageLayer.prototype), "linkageOption", this).call(this);

      toolbarEnable = filterEnable = false;
      toolbarEntries = Object.entries(this['option']['layer']['toolbar']['config']);
      filterEntries = Object.entries(this['option']['layer']['toolbar']['config']['filter']['config']);

      for (var i = 0; i < filterEntries.length; i++) {
        if (filterEntries[i][1]['enable'] === true) {
          filterEnable = true;
          break;
        }
      }

      this['option']['layer']['toolbar']['config']['filter']['enable'] = filterEnable;

      for (var _i5 = 0; _i5 < toolbarEntries.length; _i5++) {
        if (toolbarEntries[_i5][1]['enable'] === true) {
          toolbarEnable = true;
          break;
        }
      }

      this['option']['layer']['toolbar']['enable'] = toolbarEnable;
      if (this['option']['layer']['toolbar']['config']['crop']['enable'] === false) this['option']['layer']['toolbar']['config']['crop']['grid'] = false;
    }
  }, {
    key: "checkOption",
    value: function checkOption() {
      _get(_getPrototypeOf(ImageLayer.prototype), "checkOption", this).call(this);

      if (ModalLayer['_assistant']['object']['isEmpty'](this['option']['layer']['image'])) throw new Error('layer.image can not be empty!');
      if (this['option']['layer']['size'] && !Array.isArray(this['option']['layer']['size'])) throw new Error('layer.size does not meet expectations.');
      if (!this['option']['layer']['size'] && (!Number.isFinite(parseInt(this['option']['layer']['sizeRange']['min'][0])) || !Number.isFinite(parseInt(this['option']['layer']['sizeRange']['min'][1])) || !Number.isFinite(parseInt(this['option']['layer']['sizeRange']['max'][0])) || !Number.isFinite(parseInt(this['option']['layer']['sizeRange']['max'][1])))) throw new Error('layer.sizeRange does not meet expectations.');
    }
  }, {
    key: "initVariable",
    value: function initVariable() {
      _get(_getPrototypeOf(ImageLayer.prototype), "initVariable", this).call(this);

      this['variable']['image'] = {
        'spin': {
          'scale': 1,
          'angle': 90
        },
        'default': {
          'size': null,
          'imageData': null
        },
        'reload': 0,
        'link': null,
        'history': [],
        'finish': null,
        'status': ModalLayer['_enum']['LOAD_STATUS']['LOADING']
      };
    }
  }, {
    key: "initStruct",
    value: function initStruct() {
      var _this15 = this;

      var action, actionButton;
      var tools, toolbar, toolChild, contentImage;
      var title, content, resize, progress, container;

      _get(_getPrototypeOf(ImageLayer.prototype), "initStruct", this).call(this);

      container = this['variable']['struct']['_build']['container'];
      title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
      action = this['variable']['struct']['_backup']['action'] = ModalLayer['_struct']['action'];
      toolbar = this['variable']['struct']['_backup']['toolbar'] = ModalLayer['_struct']['toolbar'];
      tools = this['variable']['struct']['_backup']['tools'] = ModalLayer['_struct']['image_tools'];
      content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
      actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];
      contentImage = this['variable']['struct']['_backup']['content_image'] = ModalLayer['_struct']['content_image'];
      toolChild = this['variable']['struct']['_backup']['image_tools_child'] = ModalLayer['_struct']['image_tools_child'];
      action.innerHTML.push(actionButton['close']);
      title.innerHTML.push(action);
      if (this['option']['title'] !== false) container.innerHTML.push(title);
      Object.keys(this['option']['layer']['toolbar']['config']).forEach(function (k) {
        if (_this15['option']['layer']['toolbar']['config'][k]['enable']) toolbar.innerHTML.push(tools[k]);

        if (_this15['option']['layer']['toolbar']['config'][k]['config'] instanceof Object && _this15['option']['layer']['toolbar']['config'][k]['enable']) {
          Object.keys(_this15['option']['layer']['toolbar']['config'][k]['config']).forEach(function (key) {
            tools[k].innerHTML[1].innerHTML.push(toolChild[k][key]);
          });
        }
      });
      if (this['option']['layer']['toolbar']['enable']) container.innerHTML.push(toolbar);
      content.innerHTML.push(contentImage);
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
  }, {
    key: "initNode",
    value: function initNode() {
      var _this16 = this;

      var container, toolbar;

      _get(_getPrototypeOf(ImageLayer.prototype), "initNode", this).call(this);

      container = this['variable']['nodes']['container'];
      toolbar = container.querySelector('.modal-layer-toolbar');

      if (this['option']['layer']['toolbar']['enable']) {
        Object.keys(this['option']['layer']['toolbar']['config']).forEach(function (k, v) {
          v = _this16['option']['layer']['toolbar']['config'][k];

          if (v['enable']) {
            var _itemIconNode$classLi;

            var itemNode, itemIconNode;
            itemNode = toolbar.querySelector('.modal-layer-toolbar-item[tool-type="' + k + '"]');
            itemIconNode = itemNode.querySelector('.modal-layer-toolbar-item-icon');
            itemNode.setAttribute('title', v['title']);

            (_itemIconNode$classLi = itemIconNode.classList).add.apply(_itemIconNode$classLi, _toConsumableArray(v['icon'].split(' ')));

            if (v['config'] instanceof Object) {
              Object.entries(v['config']).forEach(function (val, key) {
                key = val[0];
                val = val[1];

                if (val['enable']) {
                  var childNode, childIconNode;
                  childNode = itemNode.querySelector('.modal-layer-toolbar-item-child-list');
                  childIconNode = itemNode.querySelector('.modal-layer-toolbar-' + k + '-icon[' + k + '-type="' + key + '"]');
                  childNode.setAttribute('title', val['title']);
                  if (val['icon']) childIconNode.classList.add(val['icon']);else childIconNode.innerText = val['textIcon'];
                }
              });
            }
          }
        });
      }

      this['variable']['image']['finish'] = this['load']().then(function (img) {
        return _this16['loaded'](img);
      })["catch"](function () {
        return _this16['failed']();
      });
    }
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this17 = this;

      var options;
      var container;
      var failedText;

      _get(_getPrototypeOf(ImageLayer.prototype), "bindEvent", this).call(this);

      options = {
        'once': false,
        'capture': false,
        'passive': false,
        'mozSystemGroup': false
      };
      container = this['variable']['nodes']['container'];
      failedText = ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['FAILED']);
      this['variable']['eventSymbol']['imageReload'] = ModalLayer['_assistant']['event']['add'](container, 'click', '.modal-layer-image-canvas[load-status="' + failedText + '"]', this['reload'], this, null, options);
      Object.keys(this['event']['imageTools']).forEach(function (k) {
        if (_this17['event']['imageTools'][k] && _this17['event']['imageTools'][k] instanceof Function) _this17['variable']['eventSymbol']["imageTool".concat(k)] = ModalLayer['_assistant']['event']['add'](container, 'click', ".modal-layer-toolbar-item[tool-type=\"".concat(k, "\"]"), _this17['event']['imageTools'][k], _this17, null, options);
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var defaultArea;
      var canvas, canvasRect;
      var container, contentNode;
      var toolbar, toolbarHeight, oriToolbarHeight;
      var totalHeight, contentComputedStyle, contentBeforeHeight, contentOffsetTop;
      container = this['variable']['nodes']['container'];
      contentNode = container.querySelector('.modal-layer-content');
      canvas = contentNode.querySelector('.modal-layer-image-canvas');
      canvasRect = canvas.getBoundingClientRect();
      toolbar = container.querySelector('.modal-layer-toolbar');
      oriToolbarHeight = toolbar.getBoundingClientRect().height;
      contentComputedStyle = window.getComputedStyle(contentNode, null);
      contentBeforeHeight = ModalLayer['_assistant']['element']['getBeforeElementHeight'](contentNode);
      contentOffsetTop = contentNode.offsetTop - contentBeforeHeight;
      totalHeight = contentBeforeHeight + (this['option']['content']['fullContainer'] ? 0 : contentOffsetTop * 2);
      if (this['option']['layer']['size']) defaultArea = _toConsumableArray(this['option']['layer']['size']);else {
        if (this['variable']['image']['status'] !== ModalLayer['_enum']['LOAD_STATUS']['LOADING']) defaultArea = [canvasRect.width, canvasRect.height];else defaultArea = _toConsumableArray(this['option']['layer']['sizeRange']['min']);
      }
      defaultArea[0] += parseFloat(contentComputedStyle.marginLeft) + parseFloat(contentComputedStyle.marginRight);
      defaultArea[1] += totalHeight;
      container.style.width = defaultArea[0] + 'px';

      if (this['option']['layer']['toolbar']['enable']) {
        toolbarHeight = toolbar.getBoundingClientRect().height;
        defaultArea[1] = defaultArea[1] - oriToolbarHeight + toolbarHeight;
      }

      container.style.height = defaultArea[1] + 'px';
      this['variable']['defaultArea'] = defaultArea;
      this['variable']['defaultRect']['width'] = defaultArea[0];
      this['variable']['defaultRect']['height'] = defaultArea[1];
      if (!this['option']['drag']['overflow'] && ModalLayer['_assistant']['element']['isOverflow'](container, this['option']['window'])) this['positioning']();
    }
  }, {
    key: "load",
    value: function load() {
      var _this18 = this;

      var cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
      this['variable']['image']['status'] = ModalLayer['_enum']['LOAD_STATUS']['LOADING'];
      cas.setAttribute('load-status', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['LOADING']));
      this['variable']['image']['fadeAttr'] && cas.removeAttribute(this['variable']['image']['fadeAttr']);
      if (this['variable']['image']['layer'] instanceof LoadingLayer) this['variable']['image']['layer']['show']();else this['variable']['image']['layer'] = ModalLayer['loading']({
        'mask': false,
        'popupTime': 0,
        'layer': {
          'icon': 1,
          'duration': 1,
          'color': 'deepskyblue'
        },
        'window': this['variable']['nodes']['container'].querySelector('.modal-layer-content')
      }, function (e) {
        throw e;
      });
      return this['variable']['image']['finish'] = new Promise(function (resolve, reject) {
        var node = new Image();

        while (!_this18['variable']['image']['link'] && _this18['variable']['image']['reload'] < _this18['option']['layer']['image'].length) {
          var _this18$variable$imag;

          if ((_this18$variable$imag = _this18['variable']['image']['link']) === null || _this18$variable$imag === void 0 ? void 0 : _this18$variable$imag.startsWith('blob:')) URL.revokeObjectURL(_this18['variable']['image']['link']);
          _this18['variable']['image']['link'] = ModalLayer['_assistant']['file']['getImage'](_this18['option']['layer']['image'][_this18['variable']['image']['reload']++]);
        }

        node['onload'] = function () {
          return resolve(node);
        };

        node['onerror'] = reject;
        node.src = _this18['variable']['image']['link'];
      });
    }
  }, {
    key: "reload",
    value: function reload() {
      var _this19 = this;

      this['variable']['image']['finish'] = this['load']().then(function (img) {
        return _this19['loaded'](img);
      })["catch"](function () {
        return _this19['failed']();
      })["finally"](function () {
        return _this19.resize();
      });
    }
  }, {
    key: "loaded",
    value: function loaded(img) {
      var _this20 = this;

      var cas, container;
      var priority, aspectRatio;
      container = this['variable']['nodes']['container'];
      cas = container.querySelector('.modal-layer-image-canvas');
      this['variable']['image']['status'] = ModalLayer['_enum']['LOAD_STATUS']['LOADED'];

      if (this['option']['layer']['size']) {
        this['variable']['image']['default']['size'] = this['option']['layer']['size'];
      } else {
        if (img.naturalWidth > this['option']['layer']['sizeRange']['max'][0] || img.naturalHeight > this['option']['layer']['sizeRange']['max'][1]) this['variable']['image']['default']['size'] = ModalLayer['_assistant']['number']['getMaxLegalSize']([img.naturalWidth, img.naturalHeight], this['option']['layer']['sizeRange']['max']);else if (img.naturalWidth < this['option']['layer']['sizeRange']['min'][0] || img.naturalHeight < this['option']['layer']['sizeRange']['min'][1]) this['variable']['image']['default']['size'] = ModalLayer['_assistant']['number']['getMinLegalSize']([img.naturalWidth, img.naturalHeight], this['option']['layer']['sizeRange']['min']);else this['variable']['image']['default']['size'] = [img.naturalWidth, img.naturalHeight];
      }

      cas.width = this['variable']['image']['default']['size'][0];
      cas.height = this['variable']['image']['default']['size'][1];
      cas.setAttribute('load-status', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['LOADED']));
      window.requestAnimationFrame(function () {
        var _cas$getContext, _cas$getContext2;

        if (_this20['variable']['image']['layer'] && _this20['variable']['image']['layer'] instanceof LoadingLayer) _this20['variable']['image']['layer']['hide']();

        (_cas$getContext = cas.getContext('2d')).drawImage.apply(_cas$getContext, [img, 0, 0, img.width, img.height, 0, 0].concat(_toConsumableArray(_this20['variable']['image']['default']['size'])));

        _this20['variable']['image']['default']['imageData'] = (_cas$getContext2 = cas.getContext('2d')).getImageData.apply(_cas$getContext2, [0, 0].concat(_toConsumableArray(_this20['variable']['image']['default']['size'])));
      });
    }
  }, {
    key: "failed",
    value: function failed() {
      var _this$variable$image$;

      var fadeOption;
      var cas, container;
      container = this['variable']['nodes']['container'];
      cas = container.querySelector('.modal-layer-image-canvas');
      this['variable']['image']['status'] = ModalLayer['_enum']['LOAD_STATUS']['FAILED'];
      cas.setAttribute('load-status', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['FAILED']));
      if (this['variable']['image']['reload'] < this['option']['layer']['image'].length) fadeOption = {
        'duration': 4,
        'sign': 'load-failed',
        'icon': {
          'size': 72,
          'char': '!?',
          'color': 'rgba(220, 53, 69)',
          'font': 'bold 72px Microsoft YaHei, serif'
        },
        'round': {
          'step': [4],
          'radius': 50,
          'borderWidth': 5,
          'borderColor': 'rgb(230, 230, 230)'
        },
        'text': {
          'color': 'rgba(220, 53, 69)',
          'text': '图片加载失败, 请点击重试',
          'font': 'lighter 16px Microsoft YaHei, serif'
        }
      };else fadeOption = {
        'duration': 4,
        'sign': 'finally-load-failed',
        'icon': {
          'size': 80,
          'char': '×',
          'font': 'bold 80px Microsoft YaHei, serif'
        },
        'round': {
          'step': [5],
          'radius': 50,
          'borderWidth': 5,
          'borderColor': 'rgb(230, 230, 230)'
        },
        'text': {
          'color': 'rgba(220, 53, 69)',
          'text': '图片加载失败, 请联系管理员',
          'font': 'lighter 16px Microsoft YaHei, serif'
        }
      };
      this['variable']['image']['fadeAttr'] = ModalLayer['_assistant']['canvasAnimation']['loadFailedFade'](cas.getContext('2d'), fadeOption);
      if ((_this$variable$image$ = this['variable']['image']['link']) === null || _this$variable$image$ === void 0 ? void 0 : _this$variable$image$.startsWith('blob:')) URL.revokeObjectURL(this['variable']['image']['link']);
      this['variable']['image']['link'] = null;
      if (this['variable']['image']['layer'] instanceof LoadingLayer) this['variable']['image']['layer']['hide']();
    }
  }, {
    key: "removeAllEvent",
    value: function removeAllEvent() {
      var _this21 = this;

      var container = this['variable']['nodes']['container'];

      _get(_getPrototypeOf(ImageLayer.prototype), "removeAllEvent", this).call(this);

      Object.keys(this['event']['imageTools']).forEach(function (k) {
        if (_this21['event']['imageTools'][k] && _this21['event']['imageTools'][k] instanceof Function) container.removeEventListener('click', _this21['event']['imageTools'][k]);
      });
    }
  }, {
    key: "crop",
    value: function crop() {
      var _this22 = this;

      var sPic, cropCasCenter;
      var operation, mousedown, direction;
      var repaint, animationFrame, repaintVariable;
      var minWidth, minHeight, maxWidth, maxHeight;
      var cropCas, cropCtx, cropBoxCas, cropBoxCtx;
      var cropBorderSize, cropBorderHalfSize, cropBorderSizeMul;

      var cropEvent, moveEvent, cleanEvent, keyupEvent, _repaintEvent;

      repaint = true;
      animationFrame = null;
      cropBorderSize = 5;
      cropBorderSizeMul = [];
      cropBorderHalfSize = ModalLayer['_assistant']['number']['divide'](cropBorderSize, 2);
      cropBorderSizeMul[2] = ModalLayer['_assistant']['number']['multiply'](cropBorderSize, 2);
      cropBorderSizeMul[4] = ModalLayer['_assistant']['number']['multiply'](cropBorderSize, 4);
      cropBorderSizeMul[6] = ModalLayer['_assistant']['number']['multiply'](cropBorderSize, 6);
      sPic = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
      maxWidth = sPic.width;
      maxHeight = sPic.height;
      minWidth = ModalLayer['_assistant']['number']['floor'](maxWidth * 0.1);
      minHeight = ModalLayer['_assistant']['number']['floor'](maxHeight * 0.1);
      cropCas = sPic.cloneNode();
      cropCtx = cropCas.getContext('2d');
      cropCas.width = window.innerWidth;
      cropCas.height = window.innerHeight;
      cropCas.style = 'display: block; position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px; visibility: visible; opacity: 1; border: 0px; margin: 0px; z-index: ' + ModalLayer['_assistant']['element']['maxZIndex']() + ';';
      cropCasCenter = [ModalLayer['_assistant']['number']['chain'](cropCas.width)['subtract'](maxWidth)['divide'](2)['round']().done(), ModalLayer['_assistant']['number']['chain'](cropCas.height)['subtract'](maxHeight)['divide'](2)['round']().done()];
      repaintVariable = [].concat(_toConsumableArray(cropCasCenter), [maxWidth, maxHeight]);

      _repaintEvent = function repaintEvent() {
        var _cropCtx, _ModalLayer$_assistan3, _cropCtx2;

        cropCtx.save();
        cropCtx.clearRect(0, 0, cropCas.width, cropCas.height);
        cropCtx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        cropCtx.fillRect(0, 0, cropCas.width, cropCas.height);
        cropCtx.globalCompositeOperation = 'destination-out';
        cropCtx.fillStyle = 'white';

        (_cropCtx = cropCtx).fillRect.apply(_cropCtx, _toConsumableArray(repaintVariable));

        cropCtx.globalCompositeOperation = 'source-over';

        (_ModalLayer$_assistan3 = ModalLayer['_assistant']['canvas'])['drawGrid'].apply(_ModalLayer$_assistan3, [cropCtx].concat(_toConsumableArray(repaintVariable), [2, 'white', 'quarter']));

        ModalLayer['_assistant']['canvas']['drawRect'](cropCtx, repaintVariable[0] - cropBorderHalfSize, repaintVariable[1] - cropBorderHalfSize, repaintVariable[2] + cropBorderSize, repaintVariable[3] + cropBorderSize, cropBorderSize, 'white', [0]);
        ModalLayer['_assistant']['canvas']['drawLBorder'](cropCtx, repaintVariable[0] - cropBorderSizeMul[2], repaintVariable[1] - cropBorderSizeMul[2], repaintVariable[2] + cropBorderSizeMul[4], repaintVariable[3] + cropBorderSizeMul[4], cropBorderSizeMul[6], cropBorderSize, 'white');
        cropCtx.globalCompositeOperation = 'destination-over';

        (_cropCtx2 = cropCtx).drawImage.apply(_cropCtx2, [sPic].concat(_toConsumableArray(cropCasCenter)));

        cropCtx.restore();
        if (repaint) animationFrame = window.requestAnimationFrame(_repaintEvent);else window.cancelAnimationFrame(animationFrame);
      };

      cleanEvent = function cleanEvent() {
        document.removeEventListener('keyup', keyupEvent);
        cropCas.removeEventListener('mousemove', moveEvent);
        cropCas.removeEventListener('dbclick', cropEvent);
        repaint = false;
        cropCas.remove();
      };

      keyupEvent = function keyupEvent(kEvent) {
        var _kEvent2;

        kEvent = (_kEvent2 = kEvent) !== null && _kEvent2 !== void 0 ? _kEvent2 : window.event;

        switch (kEvent.code) {
          case 'Enter':
            cropEvent();
            kEvent.preventDefault();
            break;

          case 'Escape':
            _this22.show();

            cleanEvent();
            kEvent.preventDefault();
            break;

          default:
            return;
        }
      };

      cropEvent = function cropEvent(e) {
        var _e2;

        var sPicBackup;
        cleanEvent();
        e = (_e2 = e) !== null && _e2 !== void 0 ? _e2 : window.event;
        sPicBackup = new OffscreenCanvas(sPic.width, sPic.height);
        sPicBackup.getContext('2d').drawImage(sPic, 0, 0);
        sPic.width = repaintVariable[2];
        sPic.height = repaintVariable[3];
        sPic.getContext('2d').drawImage(sPicBackup, repaintVariable[0] - cropCasCenter[0], repaintVariable[1] - cropCasCenter[1], repaintVariable[2], repaintVariable[3], 0, 0, sPic.width, sPic.height);

        _this22['show']().then(function () {
          return _this22['resize']();
        });
      };

      moveEvent = function moveEvent(mEvent) {
        var _mEvent2;

        var mPoint;
        var cursor, backup;
        var cropRect, resizeRect;
        mEvent = (_mEvent2 = mEvent) !== null && _mEvent2 !== void 0 ? _mEvent2 : window.event;

        if (operation && mEvent.buttons === 1) {
          if (operation === 'drag') {
            if (repaintVariable[0] + mEvent.movementX > cropCasCenter[0] && repaintVariable[0] + repaintVariable[2] + mEvent.movementX < cropCasCenter[0] + maxWidth) repaintVariable[0] += mEvent.movementX;
            if (repaintVariable[1] + mEvent.movementY > cropCasCenter[1] && repaintVariable[1] + repaintVariable[3] + mEvent.movementY < cropCasCenter[1] + maxHeight) repaintVariable[1] += mEvent.movementY;
          } else if (operation === 'resize') {
            backup = _toConsumableArray(repaintVariable);

            if (direction.includes(ModalLayer['_enum']['DIRECTION']['WEST'])) {
              repaintVariable[0] += mEvent.movementX;
              repaintVariable[2] -= mEvent.movementX;
            }

            if (direction.includes(ModalLayer['_enum']['DIRECTION']['EAST'])) {
              repaintVariable[2] += mEvent.movementX;
            }

            if (direction.includes(ModalLayer['_enum']['DIRECTION']['NORTH'])) {
              repaintVariable[1] += mEvent.movementY;
              repaintVariable[3] -= mEvent.movementY;
            }

            if (direction.includes(ModalLayer['_enum']['DIRECTION']['SOUTH'])) {
              repaintVariable[3] += mEvent.movementY;
            }

            if (repaintVariable[0] < cropCasCenter[0] || repaintVariable[0] + repaintVariable[2] > cropCasCenter[0] + maxWidth) {
              repaintVariable[0] = backup[0];
              repaintVariable[2] = backup[2];
            }

            if (repaintVariable[1] < cropCasCenter[1] || repaintVariable[1] + repaintVariable[3] > cropCasCenter[1] + maxHeight) {
              repaintVariable[1] = backup[1];
              repaintVariable[3] = backup[3];
            }

            if (repaintVariable[2] < minWidth) {
              repaintVariable[2] = backup[2];
              if (repaintVariable[0] + repaintVariable[2] > cropCasCenter[0] + maxWidth) repaintVariable[0] = cropCasCenter[0] + maxWidth - repaintVariable[2];
            }

            if (repaintVariable[3] < minHeight) {
              repaintVariable[3] = backup[3];
              if (repaintVariable[1] + repaintVariable[3] > cropCasCenter[1] + maxHeight) repaintVariable[1] = cropCasCenter[1] + maxHeight - repaintVariable[3];
            }
          }
        } else {
          mPoint = [mEvent.x, mEvent.y];
          resizeRect = [repaintVariable[0] - cropBorderSizeMul[2], repaintVariable[1] - cropBorderSizeMul[2], repaintVariable[2] + cropBorderSizeMul[4], repaintVariable[3] + cropBorderSizeMul[4]];
          cropRect = [repaintVariable[0] - cropBorderHalfSize, repaintVariable[1] - cropBorderHalfSize, repaintVariable[2] + cropBorderSize, repaintVariable[3] + cropBorderSize];

          if (mPoint[0] > cropRect[0] && mPoint[0] < cropRect[0] + cropRect[2] && mPoint[1] > cropRect[1] && mPoint[1] < cropRect[1] + cropRect[3]) {
            cursor = 'move';
            operation = 'drag';
          } else if (mPoint[0] > resizeRect[0] && mPoint[0] < resizeRect[0] + resizeRect[2] && mPoint[1] > resizeRect[1] && mPoint[1] < resizeRect[1] + resizeRect[3]) {
            operation = 'resize';
            cursor = direction = '';

            if (mPoint[1] > resizeRect[1] && mPoint[1] < cropRect[1]) {
              cursor = direction += ModalLayer['_enum']['DIRECTION']['NORTH'];
            }

            if (mPoint[1] > cropRect[1] + cropRect[3] && mPoint[1] < resizeRect[1] + resizeRect[3]) {
              cursor = direction += ModalLayer['_enum']['DIRECTION']['SOUTH'];
            }

            if (mPoint[0] > resizeRect[0] && mPoint[0] < cropRect[0]) {
              cursor = direction += ModalLayer['_enum']['DIRECTION']['WEST'];
            }

            if (mPoint[0] > cropRect[0] + cropRect[2] && mPoint[0] < resizeRect[0] + resizeRect[2]) {
              cursor = direction += ModalLayer['_enum']['DIRECTION']['EAST'];
            }

            cursor += '-resize';
          } else {
            operation = null;
            cursor = 'default';
          }

          cropCas.style.cssText += 'cursor: ' + cursor;
        }
      };

      this['hide']();

      _repaintEvent();

      document.addEventListener('keyup', keyupEvent);
      cropCas.addEventListener('mousemove', moveEvent);
      cropCas.addEventListener('dblclick', cropEvent);
      document.body.appendChild(cropCas);
    }
  }, {
    key: "spin",
    value: function spin(angle) {
      var _this23 = this;

      var rect, radian;
      var cas, ctx, backup;
      var scale, newSize, newPoint;
      cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
      ctx = cas.getContext('2d');
      backup = new OffscreenCanvas(cas.width, cas.height);
      backup.getContext('2d').drawImage(cas, 0, 0, cas.width, cas.height);
      this['variable']['image']['finish'].then(function (img) {
        var _angle;

        angle = (_angle = angle) !== null && _angle !== void 0 ? _angle : _this23['variable']['image']['spin']['angle'];
        cas.style.transform = 'rotate(' + angle + 'deg)';
        rect = cas.getBoundingClientRect();
        cas.style.transform = "scale(".concat(_this23['variable']['image']['spin']['scale'], ")");

        if (_this23['option']['layer']['size'] || _this23['option']['layer']['sizeRange']['max'][0] >= rect.width && _this23['option']['layer']['sizeRange']['max'][1] >= rect.height) {
          scale = _this23['variable']['image']['spin']['scale'];
        } else {
          newSize = ModalLayer['_assistant']['number']['getMaxLegalSize']([rect.width, rect.height], _this23['option']['layer']['sizeRange']['max']);
          scale = newSize[0] / rect.width;
        }

        cas.width = rect.width;
        cas.height = rect.height;
        cas.style.transform = "scale(".concat(scale, ")");
        radian = angle * window.Math.PI / 180;
        ctx.save();
        ctx.translate(cas.width / 2, cas.height / 2);
        ctx.rotate(radian);
        ctx.drawImage(backup, -backup.width / 2, -backup.height / 2);
        ctx.restore();

        _this23.resize();
      });
    }
  }, {
    key: "filter",
    value: function filter(target) {
      var _this24 = this,
          _blur$gray$mirror$fil,
          _blur$gray$mirror;

      var showPromise;
      var wKey, sText, wScript;
      var cas, ctx, imgData, filterType;
      filterType = target.getAttribute('filter-type');
      cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
      if (cas.getAttribute('load-status') == ModalLayer['_enum']['LOAD_STATUS']['FAILED'] || !filterType) return;
      ctx = cas.getContext('2d');
      imgData = ctx.getImageData(0, 0, cas.width, cas.height);
      showPromise = this['variable']['image']['layer']['show']();

      if (ModalLayer['_env']['feature']['Worker']) {
        wKey = 'image-layer-worker-' + Date.now();
        sText = '!' + ModalLayer['_worker'].get('canvasFilter').toString() + '()';
        wScript = URL.createObjectURL(new Blob(sText.split(''), {
          'type': 'text/javascript'
        }));
        if (!ModalLayer['_assistant']['worker']['has'](wKey)) ModalLayer['_assistant']['worker']['create'](wKey, wScript);
        ModalLayer['_assistant']['worker']['listener'](wKey).then(function (e) {
          if (e['data']['error'] == 0) ctx.putImageData(new ImageData(new Uint8ClampedArray(e['data']['buffer']), cas.width, cas.height), 0, 0);else console.error(Error(e['data']['message']));
          showPromise.then(function () {
            return _this24['variable']['image']['layer']['hide']();
          });
          ModalLayer['_assistant']['worker']['close'](wKey);
        });
      }

      (_blur$gray$mirror$fil = (_blur$gray$mirror = {
        'blur': function blur() {
          var _Number, _Number2;

          var sigma, radius;
          sigma = (_Number = Number(target.getAttribute('data-sigma'))) !== null && _Number !== void 0 ? _Number : 1;
          radius = (_Number2 = Number(target.getAttribute('data-radius'))) !== null && _Number2 !== void 0 ? _Number2 : 3;

          if (ModalLayer['_env']['feature']['worker']) {
            var divisor, maskIndex, gaussianMask;

            if (ModalLayer['_assistant']['canvasFilter']['__gaussianMask'][["".concat(radius, ",").concat(sigma)]]) {
              gaussianMask = ModalLayer['_assistant']['canvasFilter']['__gaussianMask'][["".concat(radius, ",").concat(sigma)]];
            } else {
              divisor = 0;
              gaussianMask = [];

              for (maskIndex = -radius; maskIndex <= radius; maskIndex++) {
                var distribution = ModalLayer['_assistant']['formula']['getDistribution'](maskIndex, sigma, 1);
                gaussianMask.push(distribution);
                divisor += distribution;
              }

              for (var i = 0; i < gaussianMask.length; i++) {
                gaussianMask[i] /= divisor;
              }

              ModalLayer['_assistant']['canvasFilter']['__gaussianMask'][["".concat(radius, ",").concat(sigma)]] = gaussianMask;
            }

            ModalLayer['_assistant']['worker']['get'](wKey).postMessage({
              'sigma': sigma,
              'radius': radius,
              'type': filterType,
              'gaussianMask': gaussianMask,
              'buffer': imgData.data.buffer,
              'size': [cas.width, cas.height]
            }, [imgData.data.buffer]);
          } else {
            imgData = ModalLayer['_assistant']['canvasFilter']['gaussianBlur'](imgData, radius, sigma);
            ctx.putImageData(imgData, 0, 0);
            showPromise.then(function () {
              return _this24['variable']['image']['layer']['hide']();
            });
          }
        },
        'gray': function gray() {
          if (ModalLayer['_env']['feature']['worker']) {
            ModalLayer['_assistant']['worker']['get'](wKey).postMessage({
              'type': filterType,
              'buffer': imgData.data.buffer
            }, [imgData.data.buffer]);
          } else {
            imgData = ModalLayer['_assistant']['canvasFilter']['grayscale'](ctx.getImageData(0, 0, cas.width, cas.height));
            ctx.putImageData(imgData, 0, 0);
            showPromise.then(function () {
              return _this24['variable']['image']['layer']['hide']();
            });
          }
        },
        'mirror': function mirror() {
          var _Number3;

          var axis = (_Number3 = Number(target.getAttribute('mirror-axis'))) !== null && _Number3 !== void 0 ? _Number3 : 0;

          if (ModalLayer['_env']['feature']['worker']) {
            ModalLayer['_assistant']['worker']['get'](wKey).postMessage({
              'axis': axis,
              'type': filterType,
              'buffer': imgData.data.buffer,
              'size': [cas.width, cas.height]
            }, [imgData.data.buffer]);
          } else {
            imgData = ModalLayer['_assistant']['canvasFilter']['mirror'](ctx.getImageData(0, 0, cas.width, cas.height), axis);
            ctx.putImageData(imgData, 0, 0);
            showPromise.then(function () {
              return _this24['variable']['image']['layer']['hide']();
            });
          }
        }
      })[filterType]) === null || _blur$gray$mirror$fil === void 0 ? void 0 : _blur$gray$mirror$fil.call(_blur$gray$mirror);
    }
  }, {
    key: "revert",
    value: function revert() {
      var cas, ctx;
      cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
      ctx = cas.getContext('2d');
      this['variable']['image']['spin']['scale'] = 1;
      cas.width = this['variable']['image']['default']['size'][0];
      cas.height = this['variable']['image']['default']['size'][1];
      cas.removeAttribute('style');
      ctx.putImageData(this['variable']['image']['default']['imageData'], 0, 0);
      this.resize();
    }
  }, {
    key: "download",
    value: function download() {
      var _cas$getAttribute;

      var cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
      var filename = (_cas$getAttribute = cas.getAttribute('download-filename')) !== null && _cas$getAttribute !== void 0 ? _cas$getAttribute : this['option']['layer']['toolbar']['config']['download']['name'] + Date.now();
      ModalLayer['_assistant']['canvas']['download'](cas, filename, this['option']['layer']['toolbar']['config']['download']['mime']);
    }
  }]);

  return ImageLayer;
}(ModalLayer);

ModalLayer['_achieve'].set('image', ImageLayer);

var PromptLayer = function (_AlertLayer) {
  _inherits(PromptLayer, _AlertLayer);

  var _super4 = _createSuper(PromptLayer);

  function PromptLayer() {
    _classCallCheck(this, PromptLayer);

    return _super4.apply(this, arguments);
  }

  _createClass(PromptLayer, [{
    key: "initStruct",
    value: function initStruct() {
      _get(_getPrototypeOf(PromptLayer.prototype), "initStruct", this).call(this);

      this['variable']['struct']['_backup']['interaction'].innerHTML.push(this['variable']['struct']['_backup']['interaction_button']['cancel']);
    }
  }]);

  return PromptLayer;
}(AlertLayer);

ModalLayer['_achieve'].set('prompt', PromptLayer);

var ConfirmLayer = function (_AlertLayer2) {
  _inherits(ConfirmLayer, _AlertLayer2);

  var _super5 = _createSuper(ConfirmLayer);

  function ConfirmLayer() {
    _classCallCheck(this, ConfirmLayer);

    return _super5.apply(this, arguments);
  }

  _createClass(ConfirmLayer, [{
    key: "initStruct",
    value: function initStruct() {
      _get(_getPrototypeOf(ConfirmLayer.prototype), "initStruct", this).call(this);

      this['variable']['struct']['_backup']['interaction'].innerHTML.push(this['variable']['struct']['_backup']['interaction_button']['no']);
    }
  }]);

  return ConfirmLayer;
}(AlertLayer);

ModalLayer['_achieve'].set('confirm', ConfirmLayer);

var LoadingLayer = function (_ModalLayer4) {
  _inherits(LoadingLayer, _ModalLayer4);

  var _super6 = _createSuper(LoadingLayer);

  function LoadingLayer() {
    _classCallCheck(this, LoadingLayer);

    return _super6.apply(this, arguments);
  }

  _createClass(LoadingLayer, [{
    key: "initOption",
    value: function initOption(options) {
      _get(_getPrototypeOf(LoadingLayer.prototype), "initOption", this).call(this, options);

      this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['loading']);
      this['option']['title'] = false;
      this['option']['drag']['enable'] = false;
      this['option']['resize']['enable'] = false;
      this['option']['progress']['enable'] = false;
      this['option']['mask']['clickRemove'] = false;
      this['option']['content']['fullContainer'] = true;
    }
  }, {
    key: "compatibleOption",
    value: function compatibleOption(options) {
      var positionMap;
      positionMap = {
        'center': 'center',
        'right': 'flex-end',
        'left': 'flex-start'
      };

      _get(_getPrototypeOf(LoadingLayer.prototype), "compatibleOption", this).call(this, options);

      if (!ModalLayer['_assistant']['object']['isEmpty'](options['layer']['position'])) {
        if (!Array.isArray(options['layer']['position'])) options['layer']['position'] = [options['layer']['position'], options['layer']['position']];

        for (var i = 0; i < 2; i++) {
          var _positionMap$options$;

          options['layer']['position'][i] = (_positionMap$options$ = positionMap[options['layer']['position'][i]]) !== null && _positionMap$options$ !== void 0 ? _positionMap$options$ : options['layer']['position'][i];
          options['layer']['position'][i] = !Number.isInteger(options['layer']['position'][i]) ? options['layer']['position'][i] : options['layer']['position'][i] + 'px';
        }
      }
    }
  }, {
    key: "checkOption",
    value: function checkOption() {
      _get(_getPrototypeOf(LoadingLayer.prototype), "checkOption", this).call(this);

      if (!Array.isArray(this['option']['layer'].position) && !['left', 'center', 'right'].includes(this['option']['layer'].position)) throw new Error('layer.position does not meet expectations');
    }
  }, {
    key: "initStruct",
    value: function initStruct() {
      var content, container;
      var loading, loadingIcon;

      _get(_getPrototypeOf(LoadingLayer.prototype), "initStruct", this).call(this);

      container = this['variable']['struct']['_build']['container'];
      content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
      loading = this['variable']['struct']['_backup']['content_loading'] = ModalLayer['_struct']['content_loading'];
      loadingIcon = this['variable']['struct']['_backup']['content_loading_icon'] = ModalLayer['_struct']['content_loading_icon'];
      if (Number.isInteger(Number(this['option']['layer'].icon))) loading.innerHTML[0] = loadingIcon[this['option']['layer'].icon];else loading.innerHTML[0]["class"] += ' ' + this['option']['layer'].icon;
      content.innerHTML.push(loading);
      container.innerHTML.push(content);
    }
  }, {
    key: "initAttribute",
    value: function initAttribute() {
      var content, container, loadingBox, loadingIcon;

      _get(_getPrototypeOf(LoadingLayer.prototype), "initAttribute", this).call(this);

      container = this['variable']['nodes']['container'];
      content = container.querySelector('.modal-layer-content');
      loadingIcon = content.querySelector('.modal-layer-loading-icon');
      loadingBox = content.querySelector('.modal-layer-loading-box');
      container.style.cssText += 'background: transparent; box-shadow: none;';
      content.style.cssText += 'background: ' + this['option']['layer'].background;
      if (this['option']['layer']['position'][0].endsWith('px')) loadingIcon.style.cssText += "margin-left: ".concat(this['option']['layer']['position'][0]);else loadingBox.style.cssText += "align-items: ".concat(this['option']['layer']['position'][0]);
      if (this['option']['layer']['position'][1].endsWith('px')) loadingIcon.style.cssText += "margin-top: ".concat(this['option']['layer']['position'][1]);else loadingBox.style.cssText += "justify-content: ".concat(this['option']['layer']['position'][1], ";");
      loadingIcon.style.cssText += 'font-size: ' + this['option']['layer']['size'] + 'px; width: ' + this['option']['layer']['area'][0] + 'px; height: ' + this['option']['layer']['area'][1] + 'px; color: ' + this['option']['layer'].color + '; animation-duration: ' + this['option']['layer'].duration + 's;';
      if (!ModalLayer['_assistant']['object']['isEmpty'](this['option']['layer']['rate'])) loadingIcon.style.animationTimingFunction = this['option']['layer']['rate'];
    }
  }, {
    key: "resize",
    value: function resize() {
      var defaultArea;

      if (this['option']['window']) {
        var rect = this['option']['window'].getBoundingClientRect();
        defaultArea = [rect.width === 0 ? window.innerWidth : rect.width, rect.height === 0 ? window.innerHeight : rect.height];
      } else {
        defaultArea = [window.innerWidth, window.innerHeight];
      }

      this['variable']['nodes']['container'].style.cssText += "width: ".concat(defaultArea[0], "px; height: ").concat(defaultArea[1], "px");
      this['variable']['defaultArea'] = defaultArea;
      this['variable']['defaultRect']['width'] = defaultArea[0];
      this['variable']['defaultRect']['height'] = defaultArea[1];
    }
  }]);

  return LoadingLayer;
}(ModalLayer);

ModalLayer['_achieve'].set('loading', LoadingLayer);

var MessageLayer = function (_ModalLayer5) {
  _inherits(MessageLayer, _ModalLayer5);

  var _super7 = _createSuper(MessageLayer);

  function MessageLayer() {
    _classCallCheck(this, MessageLayer);

    return _super7.apply(this, arguments);
  }

  _createClass(MessageLayer, [{
    key: "initOption",
    value: function initOption(options) {
      _get(_getPrototypeOf(MessageLayer.prototype), "initOption", this).call(this, options);

      this['option']['title'] = false;
      this['option']['drag']['enable'] = false;
      this['option']['drag']['overflow'] = false;
    }
  }, {
    key: "initStruct",
    value: function initStruct() {
      var content, resize, progress, container;

      _get(_getPrototypeOf(MessageLayer.prototype), "initStruct", this).call(this);

      container = this['variable']['struct']['_build']['container'];
      content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
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
  }, {
    key: "initNode",
    value: function initNode() {
      var contentNode, contentChild;

      _get(_getPrototypeOf(MessageLayer.prototype), "initNode", this).call(this);

      contentNode = this['variable']['nodes']['container'].querySelector('.modal-layer-content');

      if (this['option']['content']['value'] instanceof Object) {
        contentChild = ModalLayer['_assistant']['element']['objectToNode'](this['option']['content']['value']);
        Object.keys(contentChild).forEach(function (k) {
          contentNode.appendChild(contentChild[k]);
        });
      } else {
        contentNode.innerHTML = this['option']['content']['value'];
      }
    }
  }]);

  return MessageLayer;
}(ModalLayer);

ModalLayer['_achieve'].set('msg', MessageLayer);
ModalLayer['_achieve'].set('message', MessageLayer);

var TipsLayer = function (_MessageLayer) {
  _inherits(TipsLayer, _MessageLayer);

  var _super8 = _createSuper(TipsLayer);

  function TipsLayer() {
    _classCallCheck(this, TipsLayer);

    return _super8.apply(this, arguments);
  }

  _createClass(TipsLayer, [{
    key: "compatibleOption",
    value: function compatibleOption(options) {
      _get(_getPrototypeOf(TipsLayer.prototype), "compatibleOption", this).call(this, options);

      if (ModalLayer['_assistant']['object']['isString'](options['layer']['location'])) options['layer']['location'] = document.querySelector(options['layer']['location']);
    }
  }, {
    key: "checkOption",
    value: function checkOption() {
      _get(_getPrototypeOf(TipsLayer.prototype), "checkOption", this).call(this);

      var tipsArray = Object.values(ModalLayer['_enum']['TIPS_POSITION']);
      if (!this['option']['layer']['location'] instanceof Element) throw Error('option.layer.location does not meet the expected value');
      if (!tipsArray.includes(this['option']['layer']['position'])) throw Error('option.layer.position does not meet the expected value.');
    }
  }, {
    key: "initStruct",
    value: function initStruct() {
      _get(_getPrototypeOf(TipsLayer.prototype), "initStruct", this).call(this);

      var container, iconPosition, position, iconSize;
      container = this['variable']['struct']['_build']['container'];
      iconPosition = ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['TIPS_POSITION'], this['option']['layer']['position']);
      iconSize = this['option']['layer']['iconSize'];
      position = {
        'left': 'right',
        'right': 'left',
        'up': 'bottom',
        'down': 'top'
      }[iconPosition.toLowerCase()];
      container.innerHTML.push({
        nodeType: 'span',
        "class": "depend-icon triangle-".concat(position),
        style: "".concat(position, ": -").concat(iconSize, "px; border-width: ").concat(iconSize, "px; border-").concat(position, "-width: 0px")
      });
    }
  }, {
    key: "initOption",
    value: function initOption(options) {
      var _this25 = this;

      _get(_getPrototypeOf(TipsLayer.prototype), "initOption", this).call(this, options);

      this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['tips']);
      ModalLayer['_instance'].forEach(function (v) {
        if (v instanceof TipsLayer && v !== _this25) if (v['option']['layer']['location'] == _this25['option']['layer']['location']) if (v['option']['layer']['position'] == _this25['option']['layer']['position']) v.remove();
      });
      this['option']['resize']['enable'] = false;
      this['option']['progress']['enable'] = false;
      this['option']['mask']['enable'] = false;
      this['option']['areaProportion'] = null;
    }
  }, {
    key: "positioning",
    value: function positioning() {
      var bindTips, bindTipsElement, tipsTop, tipsLeft, tipsPosition, containerPosition, iconBorder;
      iconBorder = this['option']['layer']['iconSize'];
      tipsPosition = this['option']['layer']['position'];
      bindTips = this['option']['layer']['location'];
      containerPosition = this['variable']['nodes']['container'].getBoundingClientRect();
      bindTipsElement = bindTips.getBoundingClientRect();

      if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['LEFT']) {
        tipsLeft = bindTipsElement.left - containerPosition.width - iconBorder;
        tipsTop = bindTipsElement.top + (bindTipsElement.height - containerPosition.height) / 2;
      }

      if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['UP']) {
        tipsLeft = bindTipsElement.left - (containerPosition.width - bindTipsElement.width) / 2;
        tipsTop = bindTipsElement.top - containerPosition.height - iconBorder;
      }

      if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['DOWN']) {
        tipsLeft = bindTipsElement.left - (containerPosition.width - bindTipsElement.width) / 2;
        tipsTop = bindTipsElement.top + bindTipsElement.height + iconBorder;
      }

      if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['RIGHT']) {
        tipsLeft = bindTipsElement.width + bindTipsElement.left + iconBorder;
        tipsTop = bindTipsElement.top + (bindTipsElement.height - containerPosition.height) / 2;
      }

      this['variable']['nodes']['container'].style.cssText += "top: ".concat(tipsTop, "px; left: ").concat(tipsLeft, "px;");
    }
  }]);

  return TipsLayer;
}(MessageLayer);

ModalLayer['_achieve'].set('tips', TipsLayer);

if (window.Worker) {
  ModalLayer['_worker'].set('canvasFilter', function () {
    function gray(args) {
      var pixels, nPixels;
      var r, g, b, a, gray;
      pixels = new Uint8ClampedArray(args['buffer']);
      nPixels = new Uint8ClampedArray(pixels.length);

      for (var i = 0; i < pixels.length; i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
        a = pixels[i + 3];
        gray = r * 0.299 + g * 0.587 + b * 0.114;
        nPixels[i] = gray;
        nPixels[i + 1] = gray;
        nPixels[i + 2] = gray;
        nPixels[i + 3] = a;
      }

      return nPixels;
    }

    function mirror(args) {
      var imgX, imgY;
      var currIndex, mirrIndex;
      var r, g, b, axis, width, height, pixels, nPixels;
      axis = args['axis'];

      var _args$size = _slicedToArray(args['size'], 2);

      width = _args$size[0];
      height = _args$size[1];
      pixels = new Uint8ClampedArray(args['buffer']);
      nPixels = new Uint8ClampedArray(pixels.length);

      for (imgY = 0; imgY < height; imgY++) {
        for (imgX = 0; imgX < width; imgX++) {
          currIndex = (imgY * width + imgX) * 4;
          if (axis == 0) mirrIndex = (imgY * width + width - imgX) * 4;else if (axis == 1) mirrIndex = ((height - imgY) * width + imgX) * 4;else throw new Error('not give axis');
          nPixels[currIndex] = pixels[mirrIndex];
          nPixels[currIndex + 1] = pixels[mirrIndex + 1];
          nPixels[currIndex + 2] = pixels[mirrIndex + 2];
          nPixels[currIndex + 3] = pixels[mirrIndex + 3];
          nPixels[mirrIndex] = pixels[currIndex];
          nPixels[mirrIndex + 1] = pixels[currIndex + 1];
          nPixels[mirrIndex + 2] = pixels[currIndex + 2];
          nPixels[mirrIndex + 3] = pixels[currIndex + 3];
        }
      }

      return nPixels;
    }

    function blur(args) {
      var width, height;
      var pixels, nPixels;
      var sigma, radius, divisor, gaussianMask;
      var r, g, b, imgX, imgY, maskIdx, currIdx, tempIdx, pixelIdx;
      sigma = args['sigma'];
      radius = args['radius'];

      var _args$size2 = _slicedToArray(args['size'], 2);

      width = _args$size2[0];
      height = _args$size2[1];
      gaussianMask = args['gaussianMask'];
      pixels = new Uint8ClampedArray(args['buffer']);
      nPixels = new Uint8ClampedArray(pixels.length);

      for (imgY = 0; imgY < height; imgY++) {
        for (imgX = 0; imgX < width; imgX++) {
          divisor = 0;
          r = g = b = 0;
          pixelIdx = (imgY * width + imgX) * 4;

          for (var i = -radius; i <= radius; i++) {
            tempIdx = imgX + i;
            maskIdx = i + radius;

            if (tempIdx >= 0 && tempIdx < width) {
              currIdx = (imgY * width + tempIdx) * 4;
              r += pixels[currIdx] * gaussianMask[maskIdx];
              g += pixels[currIdx + 1] * gaussianMask[maskIdx];
              b += pixels[currIdx + 2] * gaussianMask[maskIdx];
              divisor += gaussianMask[maskIdx];
            }
          }

          nPixels[pixelIdx] = r / divisor;
          nPixels[pixelIdx + 1] = g / divisor;
          nPixels[pixelIdx + 2] = b / divisor;
          nPixels[pixelIdx + 3] = pixels[pixelIdx + 3];
        }
      }

      for (imgX = 0; imgX < width; imgX++) {
        for (imgY = 0; imgY < height; imgY++) {
          divisor = 0;
          r = g = b = 0;
          pixelIdx = (imgY * width + imgX) * 4;

          for (var _i6 = -radius; _i6 <= radius; _i6++) {
            tempIdx = imgY + _i6;
            maskIdx = _i6 + radius;

            if (tempIdx >= 0 && tempIdx < height) {
              currIdx = (tempIdx * width + imgX) * 4;
              r += nPixels[currIdx] * gaussianMask[maskIdx];
              g += nPixels[currIdx + 1] * gaussianMask[maskIdx];
              b += nPixels[currIdx + 2] * gaussianMask[maskIdx];
              divisor += gaussianMask[maskIdx];
            }
          }

          nPixels[pixelIdx] = r / divisor;
          nPixels[pixelIdx + 1] = g / divisor;
          nPixels[pixelIdx + 2] = b / divisor;
        }
      }

      return nPixels;
    }

    this.onmessage = function (event) {
      var _event$data$type, _event$data;

      var pixels;
      pixels = (_event$data$type = (_event$data = event['data'])['type']) === null || _event$data$type === void 0 ? void 0 : _event$data$type.call(_event$data, event['data']);
      this.postMessage({
        'error': 0,
        'buffer': pixels ? pixels['buffer'] : undefined
      }, [pixels['buffer']]);
    };

    this.onmessageerror = function (event) {
      this.postMessage({
        'error': 1,
        'message': 'Failed to send message.'
      });
    };
  });
}

var StorageAbstract = function () {
  function StorageAbstract() {
    _classCallCheck(this, StorageAbstract);

    _defineProperty(this, "_type", null);

    _defineProperty(this, "_record", null);

    _defineProperty(this, "_storage", null);
  }

  _createClass(StorageAbstract, [{
    key: "has",
    value: function has(k) {}
  }, {
    key: "get",
    value: function get(k) {}
  }, {
    key: "set",
    value: function set(k) {
      var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    }
  }, {
    key: "del",
    value: function del(k) {
      var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }
  }, {
    key: "clear",
    value: function clear() {}
  }]);

  return StorageAbstract;
}();

var SyncStorage = function (_StorageAbstract) {
  _inherits(SyncStorage, _StorageAbstract);

  var _super9 = _createSuper(SyncStorage);

  function SyncStorage() {
    var _this26;

    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ModalLayer['_enum']['BROWSER_STORAGE']['SESSIONSTORAGE'];

    _classCallCheck(this, SyncStorage);

    if (!window[type]) throw Error("The current browser does not support ".concat(type, " function"));
    _this26 = _super9.call(this);
    _this26['_record'] = [];
    _this26['_type'] = type;
    _this26['_storage'] = window[type];
    return _this26;
  }

  _createClass(SyncStorage, [{
    key: "has",
    value: function has(k) {
      return this['_storage'].getItem(k) !== null ? true : false;
    }
  }, {
    key: "get",
    value: function get(k) {
      var _this$_storage$getIte;

      return (_this$_storage$getIte = this['_storage'].getItem(k)) !== null && _this$_storage$getIte !== void 0 ? _this$_storage$getIte : false;
    }
  }, {
    key: "set",
    value: function set(k) {
      var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      this['_storage'].setItem(k, v);
      this['_record'].push(k);
      return true;
    }
  }, {
    key: "del",
    value: function del(k) {
      var f = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var recordIndex = this['_record'].indexOf(k);
      if (!f && recordIndex < 0) return false;
      if (recordIndex >= 0) this['_record'].splice(recordIndex, 1);
      this['_storage'].removeItem(k);
      return true;
    }
  }, {
    key: "clear",
    value: function clear() {
      while (this['_record'].length > 0) {
        this['_storage'].removeItem(this['_record'].shift());
      }

      return true;
    }
  }]);

  return SyncStorage;
}(StorageAbstract);

if (StorageAssistant) {
  Object.defineProperty(StorageAssistant['_achieve'], ModalLayer['_enum']['BROWSER_STORAGE']['LOCALSTORAGE'], {
    value: SyncStorage
  });
  Object.defineProperty(StorageAssistant['_achieve'], ModalLayer['_enum']['BROWSER_STORAGE']['SESSIONSTORAGE'], {
    value: SyncStorage
  });
}