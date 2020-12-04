/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 02:30:04
* @Description         提示层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-05 00:04:37
*/

class AlertLayer extends ModalLayer {
  /**
   * 初始化节点结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-01T23:10:16+0800
   */
  initStruct () {
    let action, actionButton;
    let interaction, interactionButton;
    let title, content, resize, progress, container;

   super.initStruct();

    content = this['variable']['struct']['_backup']['content'];
    container = this['variable']['struct']['_build']['container'];
    interaction = this['variable']['struct']['_backup']['interaction'];
    title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
    action = this['variable']['struct']['_backup']['action'] = ModalLayer['_struct']['action'];
    actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];
    interactionButton = this['variable']['struct']['_backup']['interaction_button'] = ModalLayer['_struct']['interaction_button'];

    action.innerHTML.push(actionButton.close);

    title.innerHTML.push(action);

    if (this['option']['title'] !== false)
      container.innerHTML.push(title);

    container.innerHTML.push(content);
    
    if (this['option']['resize']['enable']) {
      resize = this['variable']['struct']['_backup']['resize_box'] = ModalLayer['_struct']['resize_box'];
      container.innerHTML.push(resize);
    }
    
    if (this['option']['progress']['enable']) {
      progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
      container.innerHTML.push(progress);
    }

    if (interaction.innerHTML.length === 0) {
      interactionButton.ok['data-index'] = 0;
      interaction.innerHTML.push(interactionButton.ok);
    }

    container.innerHTML.push(interaction);
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
    if (Array.isArray(this['option']['content']['value'])) {
      contentChild = ModalLayer['_assistant']['element']['objectToNode'](this['option']['content']['value'])
      Object.keys(contentChild).forEach(function (k) {
        contentNode.appendChild(contentChild[k]);
      });
    } else {
      contentNode.innerHTML = this['option']['content']['value'];
    }
  }

  /**
   * 初始化事件
   *
   * @Author    wolf
   * @Datetime  2020-12-04T22:32:39+0800
   */
  initEvent () {
    super.initEvent();

    let index = this['variable']['struct']['_backup']['interaction'].innerHTML.indexOf(this['variable']['struct']['_backup']['interaction_button']['ok']);
    if (!this['event']['interaction'][index]) this['event']['interaction'][index] = this.remove;
  }
}

ModalLayer['_achieve'].set('alert', AlertLayer);
