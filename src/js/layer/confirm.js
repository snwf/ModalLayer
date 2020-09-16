/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 14:54:45
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-17 00:27:14
*/

class ConfirmLayer extends AlertLayer {
  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:10:16+0800
   */
  initStruct () {
    ModalLayer['_assistant']['object']['getMethod'](this, AlertLayer,'initStruct').call(this);

    this['variable']['struct']['_backup']['interaction'].innerHTML.push(this['variable']['struct']['_backup']['interaction_button']['no']);
  }
}

Object.defineProperty(ModalLayer['_achieve'], 'confirm', {value: ConfirmLayer});