/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 20:47:10
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-28 01:13:11
*/

class ObjectAssistant {
  /**
   * 释放传入对象里面的引用
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T22:22:35+0800
   * @param    {Mixed}                  v 需要释放引用的对象
   */
  static dereference (v) {
    Object.keys(v).forEach(_k => {
      let _v = v[_k];
      if (ObjectAssistant['isCollection'](_v)) {
        ObjectAssistant['dereference'](_v);
        if (_v instanceof Map)
          v.delete(_k);
        else if (_v instanceof Set)
          v.delete(_v);
        else
          v[_k] = null;
      }
    });
  }

  /**
   * 获取对象上某个属性
   * 可以通过传入一串字符串或是数组进行深层的获取.
   * 若其中某一个属性值不存在则直接返回undefined;
   * 该函数行为于ES6新的运算符号?.相似.
   *
   * @Author   Wolf
   * @DateTime 2020-09-08T17:41:36+0800
   * @param    {Object}                 o 对象
   * @param    {Mixed}                  k 属性
   * @return   {Mixed}                    属性值
   */
  static get (o, k) {
    let _o, _k;
    _o = o;
    _k = Array.isArray(k) ? k : k.split('.');
    for (let i = 0; i < _k.length && !ObjectAssistant['isEmpty'](_o); i++)
      _o = _o[_k[i]];
    return _o;
  }

  /**
   * 设置一个属性到对象
   * 与默认赋值方法不同的是该方法可以通过传入一串字符串或数组进行级联赋值
   * 若父值不存在则自动赋值{}.
   * 
   * 注意:
   * 如果属性的父值不为Object则会将其重新赋值为Object.
   * 语义上该方法并不适用于数组.
   *
   * @Author   Wolf
   * @DateTime 2020-09-08T17:38:10+0800
   * @param    {Object}                 o 对象
   * @param    {Mixed}                  k 属性名称
   * @param    {Object}                 v 属性值
   */
  static set (o, k, v) {
    let _o, _k;
    _o = o;
    _k = Array.isArray(k) ? k : k.split('.');
    for (let i = 0; i < _k.length; _o = _o[_k[i]], i++) {
      if (i === _k.length - 1)
        Object.defineProperty(_o, _k[i], {
          value: v,
          writable: true,
          enumerable: true,
          configurable: true
        });
      else if (!ObjectAssistant['isEmpty'](_o[_k[i]]) || _o[_k[i]].constructor !== Object)
        _o[_k[i]] = {};
    }
  }

  /**
   * 判断对象是否为空
   * 若为以下值则为空:
   * null, undefined
   * 注意: 空值, 也就是'', 并不为空.
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T22:57:53+0800
   * @return   {Boolean}                
   */
  static isEmpty (v) {
    return v === null || v === undefined;
  }

  /**
   * 判断对象是否为字符串
   *
   * @Author   Wolf
   * @DateTime 2020-09-24T01:35:38+0800
   * @param    {Mixed}                  v 
   * @return   {Boolean}                  
   */
  static isString (v) {
    return typeof v === 'string' || v instanceof String;
  }

  /**
   * 判断对象是否是一个集合
   * 例如Array, Map, Set, Object等.
   * 注意: 该方法中的集合不包括TypedArray.
   *
   * @Author   Wolf
   * @DateTime 2020-09-28T00:23:19+0800
   * @param    {Mixed}                  v  
   * @return   {Boolean}                  
   */
  static isCollection (v) {
    return !ObjectAssistant['isEmpty'](v) && (Array.isArray(v) || (v instanceof Map) || (v instanceof Set) || ObjectAssistant['isOnlyObject'](v));
  }

  /**
   * 判断对象是否是一个可枚举的集合
   *
   * @Author   Wolf
   * @DateTime 2020-09-28T00:25:02+0800
   * @param    {Mixed}                  v 
   * @return   {Boolean}                 
   */
  static isEnumerableCollection (v) {
    return ObjectAssistant['isCollection'](v) && !(v instanceof WeakMap || v instanceof WeakSet);
  }

  /**
   * 判断当前对象是否仅仅只是一个Object
   *
   * @Author   Wolf
   * @DateTime 2020-09-07T23:42:08+0800
   * @param    {Mixed}                 o  对象
   * @return   {Boolean}                  
   */
  static isOnlyObject (o) {
    return o && (o.constructor === Object || o.constructor === undefined);
  }

  /**
   * 根据当前实例往前找.
   * 返回父类classObject的method方法.
   * 若没有找到则返回null.
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T17:02:04+0800
   * @param    {Object}                  instance     实例对象
   * @param    {Object}                  classObject  类对象
   * @param    {String}                  method       方法名称
   * @return   {Function}                             找到的方法
   */
  static getMethod (instance, classObject, method) {
    while(!ObjectAssistant['isEmpty'](instance)) {
      if (Object.is(instance.constructor, classObject))
        return instance[method];
      instance = instance.__proto__;
    }

    return null;
  }

  /**
   * 根据值获取对应的键值
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T15:30:38+0800
   * @param    {Object}                 o 对象
   * @param    {Mixed}                  v 值
   * @return   {Mixed}                    键值
   */
  static getKeyByValue (o, v) {
    let key, entries;

    entries = Object.entries(o);
    for (let i = 0; i < entries.length; i++)
      if (entries[i][1] === v)
        return entries[i][0];

    return null;
  }

  /**
   * 深度拷贝一个对象
   * 待拷贝对象须支持枚举否则无法遍历
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T20:49:17+0800
   * @param    {Object}                 object 原始对象
   * @return   {Object}                        新的对象
   */
  static deepCopy (obj) {
    let nObj, prevObj;
    let stack, _stack;
    let k, key, v, val;

    if (ObjectAssistant['isEmpty'](obj)) return obj;

    nObj = obj.constructor?.() ?? Object.create(null);
    _stack = [nObj];
    stack = [[Object.keys(obj), Object.values(obj)]];

    do {
      prevObj = _stack.shift();
      [key, val] = stack.shift();

      for (let i = 0; i < key.length; i++) {
        k = key[i], v = val[i];
        if (ObjectAssistant['isCollection'](v)) {
          prevObj[k] = v.constructor?.() ?? Object.create(null);
          stack.push([Object.keys(v), Object.values(v)]);
          _stack.push(prevObj[k]);
        } else {
          prevObj[k] = v;
        }
      }
    } while (stack.length > 0);

    return nObj;
  }

  /**
   * 合并两个对象
   * 用sub的属性覆盖obj的属性.
   * 该合并为深度拷贝合并, 将会产生一个新的对象.
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T20:58:58+0800
   * @param    {Object}                 sub  主体对象
   * @param    {Object}                 obj  次要对象
   * @return   {Object}                      合并后新的对象
   */
  static merge (sub, obj) {
    let nObj, prevObj;
    let stack, _stack;
    let k, _k, key, _key, totalKey, v, _v, val, _val;

    if (ObjectAssistant['isEmpty'](sub)) return obj;
    if (ObjectAssistant['isEmpty'](obj)) return sub;

    nObj = obj.constructor?.() ?? Object.create(null);
    _stack = [nObj];
    stack = [
      [
        [Object.keys(sub), Object.values(sub)],
        [Object.keys(obj), Object.values(obj)]
      ]
    ];

    do {
      prevObj = _stack.shift();
      [[key, val], [_key, _val]] = stack.shift();
      _key = [...new Set(_key.concat(key))];

      for (let i = 0; i < _key.length; i++) {
        let nCover;
        [_k, _v] = [_key[i], _val[i]];
        v = val[key.indexOf(_k)];
        nCover = ObjectAssistant['isEmpty'](v);
        if ((ObjectAssistant['isEmpty'](v) || ObjectAssistant['isCollection'](v)) && ObjectAssistant['isCollection'](_v)) {
          let newEle = [];
          prevObj[_k] = (nCover ? _v.constructor : v.constructor)?.() ?? Object.create(null);
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
          })
        }
      }
    } while (stack.length > 0);

    return nObj;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'object', {value: ObjectAssistant});