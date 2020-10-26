/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-26 02:32:00
* @Description         缓存助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-28 00:11:26
*/

'use strict';

describe('CacheAssistant —— 缓存助手', function () {

  beforeEach(function () {
    this.testObject = Object.create(null);
    CacheAssistant.set('test_1', {a: 1});
    CacheAssistant.set('test_2', '嘤嘤嘤', this.testObject);
  });

  it('has —— 查询缓存是否存在', function () {
    expect(CacheAssistant.has('test')).toBeFalse();
    expect(CacheAssistant.has('test_1')).toBeTrue();
    expect(CacheAssistant.has('test_2')).toBeFalse();
    expect(CacheAssistant.has('test_2', this.testObject)).toBeTrue();
  });

  it('get —— 获取缓存', function () {
    expect(CacheAssistant.get('test')).toBeUndefined();
    expect(CacheAssistant.get('test_1')).toEqual({a: 1});
    expect(CacheAssistant.get('test_2')).toBeUndefined();
    expect(CacheAssistant.get('test_2', this.testObject)).toBe('嘤嘤嘤');
  });

  it('set —— 设置缓存', function () {
    expect(CacheAssistant.set('test_3', 222)).nothing();
    expect(CacheAssistant.set('test_4', 'qqq', this.testObject)).nothing();
  });

  it('delte —— 删除缓存', function () {
    expect(CacheAssistant.delete('test_1')).nothing();
    expect(CacheAssistant.has('test_1')).toBeFalse();
    expect(CacheAssistant.delete('test_2')).nothing();
    expect(CacheAssistant.has('test_2')).toBeFalse();
    expect(CacheAssistant.get('test_2', this.testObject)).toBe('嘤嘤嘤');
    expect(CacheAssistant.delete('test_2', this.testObject)).nothing();
    expect(CacheAssistant.has('test_2', this.testObject)).toBeFalse();
  })

  it('claer —— 清空缓存', function () {
    expect(CacheAssistant.clear()).nothing();
    expect(CacheAssistant.has('test_1')).toBeFalse();
    expect(CacheAssistant.has('test_2', this.testObject)).toBeFalse();
  });

});
