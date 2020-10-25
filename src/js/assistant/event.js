/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-24 01:02:52
* @Description         事件助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-25 22:40:14
*/

class EventAssistant {
  /**
   * 绑定事件[委托]
   * 更多详细信息请参考 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#参数
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T05:16:39+0800
   * @param    {Element}                 element        绑定事件的元素
   * @param    {String}                  type           绑定事件的类型
   * @param    {String}                  selector       css selector, 若为null则不启用事件委托
   * @param    {Function}                callback       回调函数, 若为null则该方法返回一个Promise对象
   * @param    {Mixed}                   thisArg        在回调函数中绑定的this值, 若为null则this值为对应的触发元素.
   *                                                    注意: 如果是Promise对象则无法绑定this.
   * @param    {Array}                   parameter      传入回调函数的参数
   * @param    {Object|Boolean}          options
   * @param    {Boolean}                 wantsUntrusted 如果为 true , 则事件处理程序会接收网页自定义的事件。此参数只适用于
   *                                                    Gecko（chrome的默认值为true，其他常规网页的默认值为false）
   *                                                    主要用于附加组件的代码和浏览器本身。
   *
   * @return   {Mixed}                                  若传入callback则返回一个全局唯一的Symbol对象
   *                                                    否则返回一个Promise对象.
   */
  static add (element, type, selector, callback, thisArg, parameter, options, wantsUntrusted = false) {
    let cache, eventSymbol;
    let promise, usePromise;

    usePromise = false;
    eventSymbol = Symbol();
    if(!(cache = CacheAssistant['get']('cache', EventAssistant))) {
      cache = new Map;
      CacheAssistant['set']('cache', cache, EventAssistant);
    }

    if (!(element instanceof EventTarget)) {
      if (!(element = document.querySelector(element)))
        throw Error('Is not a valid element.');
    }

    if (!ObjectAssistant['isString'](type))
      throw Error('Event type not allowed to be empty');

    if (selector instanceof EventTarget) {
      element = selector;
      selector = null;
    }

    if (!(callback instanceof Function))
      usePromise = true;

    if (ObjectAssistant['isEmpty'](thisArg))
      thisArg = selector ?? element;

    if (!ObjectAssistant['isEmpty'](parameter) && !Array.isArray(parameter))
      parameter = [parameter];

    if (ObjectAssistant['isEmpty'](options))
      options = false;
      // options = {
      //   'once': false,
      //   'passive': false,
      //   'capture': false,
      //   'mozSystemGroup': false
      // };

    if (usePromise) {
      parameter = [{
        'target': thisArg,
        'symbol': eventSymbol,
        'parameter': parameter ?? []
      }]
    } else {
      parameter = parameter ?? [];
    }

    if (selector) { // 事件委托
      promise = new Promise(resolve => {
        let delegate = function (event) {
          let lastParam;
          let target, findElement, findElements;

          target = (event ?? window.event).target;
          findElements = element.querySelectorAll(selector);

          // 忽略的情况
          //   如果触发元素是绑定元素本身或者其父元素.
          //   如果在父元素中没有找到触发元素.
          if (target.contains(element) || findElements.length === 0) return false;

          for (let i = 0; i < findElements.length; i++) {
            findElement = findElements[i];
            if (findElement.contains(target)) {
              target = findElement === target ? target : findElement;
              if (usePromise) {
                parameter[0]['event'] = event;
                parameter[0]['target'] = thisArg === selector ? target : thisArg;
              } else {
                if (parameter.length > 0 && parameter[parameter.length - 1] instanceof Event)
                  parameter[parameter.length - 1] = event;
                else
                  parameter.push(event);
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

    } else { // 正常绑定
      promise = new Promise(resolve => {
        callback = (usePromise ? resolve : callback).bind(thisArg, ...parameter);
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

  /**
   * 移除事件
   * 通过Symbol
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T03:12:47+0800
   * @param    {Symbol}                 symbol 符号
   */
  static remove (symbol) {
    let cache, eventOptions;
    cache = CacheAssistant['get']('cache', EventAssistant);
    eventOptions = cache?.['get'](symbol);
    if (eventOptions) {
      eventOptions['element'].removeEventListener(eventOptions['type'], eventOptions['callback'], eventOptions['options']);
      cache['delete'](symbol);
      ObjectAssistant['dereference'](eventOptions);
    }
  }

  /**
   * 通过指定属性移除对应事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T05:12:44+0800
   * @param    {String}                 key   绑定事件所用相关参数名称
   * @param    {Mixed}                  value 值
   */
  static removeBy (key, value) {
    let cache = CacheAssistant['get']('cache', EventAssistant);
    if (!['element', 'selector', 'callback'].includes(key))
      throw Error('key value is invalid');
    cache?.forEach((v, k) => {
      if (v[key] === value) {
        v['element'].removeEventListener(v['type'], v['callback'], v['options'], v['wantsUntrusted']);
        cache['delete'](k);
      }
    });
  }

  /**
   * 移除所有记录在案的事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T05:15:38+0800
   */
  static removeAll () {
    let cache = CacheAssistant['get']('cache', EventAssistant);
    cache?.forEach((v, k) => {
      v['element'].removeEventListener(v['type'], v['callback'], v['options'], v['wantsUntrusted']);
      cache['delete'](k);
    });
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'event', {value: EventAssistant});