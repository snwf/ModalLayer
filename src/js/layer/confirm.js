/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 14:54:45
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-21 00:54:21
*/

class ConfirmLayer extends AlertLayer {
  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:10:16+0800
   */
  initStruct () {
    super.initStruct();

    this['variable']['struct']['_backup']['interaction'].innerHTML.push(this['variable']['struct']['_backup']['interaction_button']['no']);
  }
}
ModalLayer['_achieve'].set('confirm', ConfirmLayer);