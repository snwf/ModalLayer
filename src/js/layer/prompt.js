/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 16:53:04
* @Description         输入层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-11-13 23:27:04
*/

class PromptLayer extends AlertLayer {
  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:10:16+0800
   */
  initStruct () {
    super.initStruct();

    this['variable']['struct']['_backup']['interaction'].innerHTML.push(this['variable']['struct']['_backup']['interaction_button']['cancel']);
  }
}

ModalLayer['_achieve'].set('prompt', PromptLayer);
