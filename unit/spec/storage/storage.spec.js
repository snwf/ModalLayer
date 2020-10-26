/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-27 22:43:54
* @Description         Storage封装类单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-28 00:13:24
*/

'use strict';

describe('SyncStorage —— Storage封装类', function () {

  beforeAll(function () {
    expect(this.storage = new SyncStorage(ModalLayer['_enum']['BROWSER_STORAGE']['LOCALSTORAGE'])).nothing();
    expect(this.storage).toBeInstanceOf(SyncStorage);
    expect(this.storage._type).toBe(ModalLayer['_enum']['BROWSER_STORAGE']['LOCALSTORAGE']);
    expect(this.storage._record).toBeInstanceOf(Array);
    expect(this.storage._storage).toBeInstanceOf(Storage);
    this.storage.clear();
  });

  beforeEach(function () {
    this.test = [
      ['1', '2'],
      ['object', JSON.stringify({a: 1})],
      ['test', 'name'],
      [new String('222'), ''],
      ['qq', ''],
      ['kyokyo_age', '24']
    ];
    for (let i = 0; i < this.test.length; i++)
      this.storage._storage.setItem(...this.test[i]);
  });

  it('has —— 查询键是否存在', function () {
    expect(this.storage.has('1')).toBeTrue();
    expect(this.storage.has('object')).toBeTrue();
    expect(this.storage.has('222')).toBeTrue();
    expect(this.storage.has('qqq')).toBeFalse();
    expect(this.storage.has('qQ')).toBeFalse();
  });

  it('get —— 获取键对应的值', function () {
    for (let i = 0; i < this.test.length; i++)
      expect(this.storage.get(this.test[i][0])).toBe(this.test[i][1]);
    expect(this.storage.get('qqq')).toBeFalse();
    expect(this.storage.get('qQ')).toBeFalse();
  });

  it('set —— 设置键值对', function () {
    expect(this.storage.set('test_1')).toBeTrue();
    expect(this.storage.set('test_2', null)).toBeTrue();
    expect(this.storage.set('test_3', undefined)).toBeTrue();
    expect(this.storage.set('test_4', 'test')).toBeTrue();
  });

  it('del —— 删除键值对', function () {
    this.storage.set('test_1');
    this.storage.set('test_2', '嘤嘤嘤！');
    expect(this.storage.del('test_1')).toBeTrue();
    expect(this.storage.del('test_2')).toBeTrue();
    expect(this.storage.has('test_1')).toBeFalse();
    expect(this.storage.has('test_2')).toBeFalse();

    expect(this.storage.del('kyokyo_age')).toBeFalse();
    expect(this.storage.has('kyokyo_age')).toBeTrue();
    expect(this.storage.del('kyokyo_age', true)).toBeTrue();
    expect(this.storage.has('kyokyo_age')).toBeFalse();
  })

  it('clear —— 清空存储库', function () {
    expect(this.storage.clear()).nothing();
    expect(this.storage._record.length).toBe(0);
  });

});
