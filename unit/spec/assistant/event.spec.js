/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-25 00:25:18
* @Description         事件助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-26 02:07:28
*/

'use strict';

describe('EventAssistant —— 事件助手', function () {

  it('add —— 绑定事件', function () {
    let self = this;
    this.eventKey = [];
    this.bindPromise = function (args) {
      !self.eventKey.includes(args.symbol) && self.eventKey.push(args.symbol);
      expect(self.node.contains(args.target)).toBeTrue();
    };
    this.bindCallback = function () {
      expect(self.node.contains(this)).toBeTrue();
    }
    this.node = document.createElement('div');
    // 直接绑定
    this.eventKey.push(EventAssistant.add(this.node, 'click', null, this.bindCallback));
    EventAssistant.add(this.node, 'click', null).then(this.bindPromise);
    // 事件委托
    this.eventKey.push(EventAssistant.add(this.node, 'click', 'a', this.bindCallback));
    EventAssistant.add(this.node, 'click', 'a').then(this.bindPromise);
    for (let i = 0; i < 5; i++)
      this.node.innerHTML += '<a href="javascript: void(0)"></a>';
    // 触发事件
    this.node.click();
    this.node.children[3].click();
  });

  it('remove —— 移除事件', function () {
    let self = this;
    this.eventKey = [];
    this.bindPromise = function (args) {
      args.target.setAttribute('spec-event-promise', 1);
      !self.eventKey.includes(args.symbol) && self.eventKey.push(args.symbol);
    };
    this.bindCallback = function () {
      args.target.setAttribute('spec-event-callback', 1);
    }
    this.node = document.createElement('div');
    // 直接绑定
    this.eventKey.push(EventAssistant.add(this.node, 'click', null, this.bindCallback));
    EventAssistant.add(this.node, 'click', null).then(this.bindPromise);
    // 事件委托
    this.eventKey.push(EventAssistant.add(this.node, 'click', 'a', this.bindCallback));
    EventAssistant.add(this.node, 'click', 'a').then(this.bindPromise);
    for (let i = 0; i < 5; i++)
      this.node.innerHTML += '<a href="javascript: void(0)"></a>';

    this.node.removeAttribute('spec-event-promise');
    this.node.removeAttribute('spec-event-callback');
    for (let i = 0; i < 5; i++) {
      this.node.children[i].removeAttribute('spec-event-promise');
      this.node.children[i].removeAttribute('spec-event-callback');
    }
    for (let i = 0; i < this.eventKey.length; i++)
      EventAssistant.remove(this.eventKey[i]);
    this.node.click();
    this.node.children[1].click();

    expect(this.node.getAttribute('spec-event-promise')).toBeNull();
    expect(this.node.getAttribute('spec-event-callback')).toBeNull();
    for (let i = 0; i < 5; i++) {
      expect(this.node.children[i].getAttribute('spec-event-promise')).toBeNull();
      expect(this.node.children[i].getAttribute('spec-event-callback')).toBeNull();
    }
  });

  afterEach(EventAssistant.removeAll);

  // 余下可以暂时不用测, 几乎一样的代码.

});