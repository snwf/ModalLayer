/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-24 04:48:22
* @Description         CSS助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-24 05:12:41
*/

'use strict';

describe('CssAssistant —— CSS助手', function () {

  it('createAnimation —— 构建CSS Animation代码', function () {
    let variable = ['test', {'0%': 'opacity: 0', '100%': 'opacity: 1;'}];
    let animationText = CssAssistant.createAnimation(...variable);
    expect(animationText).toBeInstanceOf(String);
    expect(animationText).toBe('@keyframes test {0%{opacity: 0}100%{opacity: 1;}}');
  });

  it('hasCss —— 指定CSS是否生效(只能判断由该助手生成的CSS结构)', function () {
    let variable = ['test', {'0%': 'opacity: 0', '100%': 'opacity: 1;'}];
    CssAssistant.addCss('test', CssAssistant.createAnimation(...variable));
    let testVariable = [
      ['test', true],
      ['嘻嘻嘻', false]
    ];
    testVariable.forEach(function (v) {
      let bool = CssAssistant.hasCss(v[0]);
      expect(bool).toBeInstanceOf(Boolean);
      expect(bool).toBe(v[1]);
    });
  });

  it('addCss —— 将给定CSS结构添加到head标签中', function () {
    let variable = ['test', {'0%': 'opacity: 0', '100%': 'opacity: 1;'}];
    let animationText = CssAssistant.createAnimation(...variable);
    expect(CssAssistant.addCss('test', animationText)).nothing();
  });

  it('delCss —— 删除指定CSS结构(只能删除由该助手生成的CSS结构)', function () {
    let variable = ['test', {'0%': 'opacity: 0', '100%': 'opacity: 1;'}];
    let animationText = CssAssistant.createAnimation(...variable);
    CssAssistant.addCss('test', animationText);
    expect(CssAssistant.delCss('test')).nothing();
  });

});