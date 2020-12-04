/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 14:54:45
* @Description         确认层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-04 23:42:12
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

    let interaction, interactionButton;
    
    interaction = this['variable']['struct']['_backup']['interaction'];
    interactionButton = this['variable']['struct']['_backup']['interaction_button'];

    if (interaction.innerHTML.includes(interactionButton['ok'])) {
      interactionButton['no']['data-index'] = interaction.innerHTML.length;
      interaction.innerHTML.push(interactionButton['no']);
    }
  }
}
ModalLayer['_achieve'].set('confirm', ConfirmLayer);
