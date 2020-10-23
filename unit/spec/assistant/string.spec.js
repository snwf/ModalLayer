/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-21 02:11:06
* @Description         字符串助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-24 04:24:15
*/

'use strict';

describe('StringAssistant —— 字符串助手', function () {
  it('ucfirst —— 首字母大写', function () {
    let testStr = [
      '测试字符串首字母大写',
      '1354645as6d135834asd',
      'dashjdkahsdjzhjskdlwhualihdsjkzhldiauwhd'
    ];
    testStr.forEach(function (str) {
      expect(StringAssistant.ucfirst(str)[0]).toBe(str[0].toUpperCase());
    });
  });

  describe('base64 —— 解决不支持中文', function () {
    let str = '这是一条测试用字符串';

    it('base64Encode —— 编码', function () {
      expect(StringAssistant.base64Encode(str)).toBeInstanceOf(String);
    });

    it('base64Decode —— 解码', function () {
      let encodeStr, decodeStr;
      encodeStr = StringAssistant.base64Encode(str);
      decodeStr = StringAssistant.base64Decode(encodeStr);
      expect(decodeStr).toBeInstanceOf(String);
      expect(decodeStr).toBe(str);
    })
  });

  it('replace —— 字符串替换', function () {
    let testVariable = [
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', '奇怪', '怪奇'],
        '这是一条奇怪奇怪的字符串, 可能会被替换成空白'
      ],
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', '奇', '怪', 1],
        '这是一条怪奇怪怪的字符串, 可能会被替换成空白'
      ],
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', '奇', '怪', 2],
        '这是一条怪怪怪怪的字符串, 可能会被替换成空白'
      ],
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', ['空白', '字符串'], '略略路'],
        '这是一条奇奇怪怪的略略路, 可能会被替换成略略路'
      ],
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', ['空白', '字符串'], '略略路', 1],
        '这是一条奇奇怪怪的字符串, 可能会被替换成略略路'
      ],
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', ['空白', '字符串'], ['略略路', '嘻嘻嘻']],
        '这是一条奇奇怪怪的嘻嘻嘻, 可能会被替换成略略路'
      ],
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', ['空白', '字符串'], ['略略路', '嘻嘻嘻'], 1],
        '这是一条奇奇怪怪的字符串, 可能会被替换成略略路'
      ],
      [
        ['这是一条奇奇怪怪的字符串, 可能会被替换成空白', ['空白', '字符串'], ['略略路', '嘻嘻嘻'], 3],
        '这是一条奇奇怪怪的嘻嘻嘻, 可能会被替换成略略路'
      ],
      [
        ['rgba(255, 255, 255, 1)', ['rgba', 'rgb'], '',],
        '(255, 255, 255, 1)'
      ]
    ];
    testVariable.forEach(function (variable) {
      let str = StringAssistant.replace.apply(null, variable[0]);
      if (Array.isArray(variable[0][0])) {
        expect(str).toBeInstanceOf(Array);
        expect(str.length).toBe(variable[0].length);
        str.forEach(function (s, i) {
          expect(s).toBe(variable[1][i]);
        });
      } else {
        expect(str).toBeInstanceOf(String);
        expect(str).toBe(variable[1]);
      }
    });
  });

  it ('colorConvert —— 颜色代码转换', function () {
    let colors = [
      ['rgba(0, 0, 0, 1)', '#000000'],
      ['rgba(0, 0, 0, 0)', '#000000'],
      ['rgb(255, 255, 255)', '#ffffff'],
      ['rgba(0, 191, 255, 1)', '#00BFFF'],
    ];
    colors.forEach(function (color) {
      let convColor = StringAssistant.colorConvert(color[0]);
      expect(convColor).toBeInstanceOf(String);
      expect(convColor).toBe(color[1].toLowerCase());
    });
  });
});