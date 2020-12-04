/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 20:04:23
* @Description         消息层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-05 00:05:14
*/

class MessageLayer extends ModalLayer {
  /**
   * 初始化配置
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:01:58+0800
   */
  initOption (options) {
    super.initOption(options);

    this['option']['title'] = false;
    this['option']['drag']['enable'] = false;
    this['option']['drag']['overflow'] = false;
  }

  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:10:16+0800
   */
  initStruct () {
    let content, resize, progress, container;

    super.initStruct();

    content = this['variable']['struct']['_backup']['content'];
    container = this['variable']['struct']['_build']['container'];

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

  /**
   * 初始化节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-03T18:25:33+0800
   */
  initNode () {
    let contentNode, contentChild;

    super.initNode();

    contentNode = this['variable']['nodes']['container'].querySelector('.modal-layer-content');

    // 设置内容
    if (this['option']['content']['value'] instanceof Object) {
      contentChild = ModalLayer['_assistant']['element']['objectToNode'](this['option']['content']['value'])
      Object.keys(contentChild).forEach(function (k) {
        contentNode.appendChild(contentChild[k]);
      });
    } else {
      contentNode.innerHTML = this['option']['content']['value'];
    }
  }
}

ModalLayer['_achieve'].set('msg', MessageLayer);
ModalLayer['_achieve'].set('message', MessageLayer);

