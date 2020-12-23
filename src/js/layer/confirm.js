/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 14:54:45
* @Description         确认层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-23 21:57:44
*/

class ConfirmLayer extends AlertLayer {
  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:10:16+0800
   */
  initStruct () {
    let interaction, interactionButton;

    super.initStruct();
    
    interaction = this['variable']['struct']['_backup']['interaction'];
    interactionButton = this['variable']['struct']['_backup']['interaction_button'];

    if (interaction['child'].includes(interactionButton['ok'])) {
      if (!interactionButton['no']['attribute']) interactionButton['no']['attribute'] = [];
      interactionButton['no']['attribute'].push({'key': 'data-index', 'value': interaction['child'].length});
      interaction['child'].push(interactionButton['no']);
    }
  }
}
ModalLayer['_achieve'].set('confirm', ConfirmLayer);
