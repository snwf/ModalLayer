/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 16:53:04
* @Description         输入层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-21 05:33:32
*/

class PromptLayer extends AlertLayer {
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

    if (interaction.child.includes(interactionButton['ok'])) {
      if (!interactionButton['cancel']['attribute']) interactionButton['cancel']['attribute'] = [];
      interactionButton['cancel']['attribute'].push({'key': 'data-index', 'value': interaction.child.length});
      interaction.child.push(interactionButton['cancel']);
    }
  }

  /**
   * 初始化事件
   *
   * @Author    wolf
   * @Datetime  2020-12-04T23:32:32+0800
   */
  initEvent () {
    super.initEvent();

    let index = this['variable']['struct']['_backup']['interaction'].child.indexOf(this['variable']['struct']['_backup']['interaction_button']['cancel']);
    if (!this['event']['interaction'][index]) this['event']['interaction'][index] = this.remove;
  }
}

ModalLayer['_achieve'].set('prompt', PromptLayer);
