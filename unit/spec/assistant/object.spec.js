/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-24 22:56:34
* @Description         对象助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-25 00:21:33
*/

'use strict';

describe('ObjectAssistant —— 对象助手', function () {

  it('dereference —— 释放对象内引用', function () {
    let obj = {
      a: {
        a: 1,
        b: 2
      },
      b: {
        asd: '123'
      },
      c: 'asdsadasd'
    };
    expect(ObjectAssistant.dereference(obj)).nothing();
    Object.keys(obj).forEach(function (k) {
      expect(obj[k]).toBeNull();
    });
  });

  it('get —— 获取对象上某个属性', function () {
    let obj = {
      test: 1,
      test1: {
        user: 'xixi',
        email: 'a@123.com'
      },
      test2: 2
    };
    expect(ObjectAssistant.get(obj, 'test')).toBe(obj.test);
    expect(ObjectAssistant.get(obj, 'test1.user')).toBe(obj.test1.user);
    expect(ObjectAssistant.get(obj, 'test3')).toBeUndefined();
    expect(ObjectAssistant.get(obj, 'test1.hidden')).toBeUndefined();
    expect(ObjectAssistant.get(obj, 'test1.hidden.test')).toBeUndefined();
  });

  it('set —— 设置一个属性到对象', function () {
    let obj = Object.create(null);
    obj.test_7 = new Map;
    ObjectAssistant.set(obj, 'test', '1');
    ObjectAssistant.set(obj, 'student.name', 'Hello');
    ObjectAssistant.set(obj, 'student.gender', 0);
    ObjectAssistant.set(obj, 'classroom.number', 99);
    ObjectAssistant.set(obj, 'test_2', undefined);
    ObjectAssistant.set(obj, 'test_3', null);
    ObjectAssistant.set(obj, 'test_4', {});
    ObjectAssistant.set(obj, 'test_5', [{}]);
    ObjectAssistant.set(obj, 'test_6', '');
    ObjectAssistant.set(obj, 'test_7.ok', true);
    expect(obj.test).toBe('1');
    expect(obj.student.name).toBe('Hello');
    expect(obj.student.gender).toBe(0);
    expect(obj.classroom.number).toBe(99);
    expect(obj.test_2).toBeUndefined();
    expect(obj.test_3).toBeNull();
    expect(obj.test_4).toBeInstanceOf(Object);
    expect(obj.test_5).toBeInstanceOf(Array);
    expect(obj.test_5[0]).toBeInstanceOf(Object);
    expect(obj.test_6).toBe('');
    expect(obj.test_7.get('ok')).toBeTrue();
  });

  it('isEmpty —— 判断对象是否为null或undefined', function () {
    let variable = [
      [null, true], [undefined, true], ['', false], [[], false], [{}, false]
    ];
    variable.forEach(function (v) {
      expect(ObjectAssistant.isEmpty(v[0])).toBe(v[1]);
    });
  });

  it('isString —— 判断对象是否为字符串', function () {
    expect(ObjectAssistant.isString('')).toBeTrue();
    expect(ObjectAssistant.isString(new String('asda'))).toBeTrue();
    expect(ObjectAssistant.isString('asddsd')).toBeTrue();
    expect(ObjectAssistant.isString('1345')).toBeTrue();
    expect(ObjectAssistant.isString(1345)).toBeFalse();
  });

  it('isCollection —— 判断对象是否是一个集合', function () {
    let types = [Map, Set, Array, WeakMap, WeakSet, Int8Array, Uint8Array, Int16Array, Int32Array, Uint16Array, Uint32Array, Float32Array, Float64Array, Uint8ClampedArray];
    expect(ObjectAssistant.isCollection([])).toBeTrue();
    expect(ObjectAssistant.isCollection({})).toBeTrue();
    expect(ObjectAssistant.isCollection(Object.create(null))).toBeTrue();
    types.forEach(function (t) {
      expect(ObjectAssistant.isCollection(new t)).toBeTrue();
    });
  });

  it('isOnlyObject —— 判断对象是否仅仅只是一个Object', function () {
    expect(ObjectAssistant.isOnlyObject({})).toBeTrue();
    expect(ObjectAssistant.isOnlyObject([])).toBeFalse();
    expect(ObjectAssistant.isOnlyObject('asd')).toBeFalse();
    expect(ObjectAssistant.isOnlyObject(Object.create(null))).toBeTrue();
  });

  it('getKeyByValue —— 根据值获取对应的键', function () {
    let obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 'asd'
    };
    expect(ObjectAssistant.getKeyByValue(obj, 3)).toBe('c');
    expect(ObjectAssistant.getKeyByValue(obj, 2)).toBe('b');
    expect(ObjectAssistant.getKeyByValue(obj, 1)).toBe('a');
    expect(ObjectAssistant.getKeyByValue(obj, 'asd')).toBe('d');
  });

  it('deepCopy —— 深拷贝一个对象', function () {
    let o, _o;
    _o = {
      test:{
        ary: ['asd'],
        test2: {
          test3: {
            test5: 1,
            test4: '123',
            test6: function () {}
          }
        }
      }
    };
    expect(o = ObjectAssistant.deepCopy(_o)).toBeInstanceOf(_o.constructor);
    expect(o.test.ary).not.toBe(_o.test.ary);
    expect(o.test.ary).toBeInstanceOf(Array);
    expect(o.test.test2.test3.test5).toBe(1);
    expect(o.test.test2.test3.test4).toBe('123');
    expect(o.test.test2.test3.test6).toBe(_o.test.test2.test3.test6);
    expect(o.test.test2.test3.test6).toBe(_o.test.test2.test3.test6);
  });

  it('merge —— 合并两个对象', function () {
    let o, _o, __o;
    _o = {
      test:{
        ary: ['asd'],
        ary_2: ['111'],
        test2: {
          test3: {
            test5: 1,
            test4: '123',
            test6: function () {}
          }
        }
      }
    };
    __o = {
      test: {
        ary_2: {a: 1},
        ary: ['qqq', 'q2q'],
        test3: 111,
        test4: 'asd',
        test5: function () {},
      }
    };
    expect(o = ObjectAssistant.merge(_o, __o)).toBeInstanceOf(_o.constructor);
    expect(o.test.ary).not.toBe(_o.test.ary);
    expect(o.test.ary).toBeInstanceOf(_o.test.ary.constructor);
    expect(o.test.test2.test3.test5).toBe(1);
    expect(o.test.test2.test3.test4).toBe('123');
    expect(o.test.test2.test3.test6).toBe(_o.test.test2.test3.test6);
    expect(o.test.test2.test3.test6).toBe(_o.test.test2.test3.test6);
    expect(o.test.ary[0]).toBe(_o.test.ary[0]);
    expect(o.test.ary[1]).toBe(__o.test.ary[1]);
    expect(o.test.test5).toBe(__o.test.test5);
    expect(o.test.ary_2).toBeInstanceOf(_o.test.ary_2.constructor);
    expect(o.test.ary_2['a']).toBe(__o.test.ary_2.a);
  });

});
