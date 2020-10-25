/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-26 00:39:16
* @Description         文件助手单元测试
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-26 02:31:14
*/

'use strict';

describe('FileAssistant —— 文件助手', function () {

  it('getFileBinary —— 获取文件的二进制数据', function () {
    let fetch = FileAssistant.getFileBinary('./image/01.jpg');
    return expectAsync(fetch).toBeResolved();
  });

  it('getFileBlob —— 获取文件的blob数据', function () {
    let blob = FileAssistant.getFileBlob('./image/01.jpg');
    return expectAsync(blob).toBeResolved();
  });

  it('getImage —— 获取图片地址', function () {
    let url = FileAssistant.getImage(new Image('./image/222.gif'));
    expect(url).toBeInstanceOf(String);
  });

});
