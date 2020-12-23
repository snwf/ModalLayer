/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-03 02:30:04
* @Description         提示层
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-23 21:57:28
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

    action = this['variable']['struct']['_backup']['action'];
    content = this['variable']['struct']['_backup']['content'];
    container = this['variable']['struct']['_build']['container'];
    interaction = this['variable']['struct']['_backup']['interaction'];
    title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
    actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];
    interactionButton = this['variable']['struct']['_backup']['interaction_button'] = ModalLayer['_struct']['interaction_button'];

    title['child'].push(action);

    if (this['option']['title'] !== false)
      container['child'].push(title);

    container['child'].push(content);
    
    if (this['option']['resize']['enable']) {
      resize = this['variable']['struct']['_backup']['resize_box'] = ModalLayer['_struct']['resize_box'];
      container['child'].push(resize);
    }
    
    if (this['option']['progress']['enable']) {
      progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
      container['child'].push(progress);
    }

    if (action['child'].length === 0) {
      actionButton.close['attribute'].push({'key': 'data-index', 'value': 0});
      action['child'].push(actionButton.close);
    }

    if (interaction['child'].length === 0) {
      if (!interactionButton['ok']['attribute']) interactionButton['ok']['attribute'] = [];
      interactionButton['ok']['attribute'].push({'key': 'data-index', 'value': 0});
      interaction['child'].push(interactionButton.ok);
    }

    container['child'].push(interaction);
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
      let fragment = document.createDocumentFragment();
      contentChild = ModalLayer['_assistant']['element']['objectToNode'](this['option']['content']['value']);
      contentChild.forEach(v => fragment.append(v));
      contentNode.appendChild(fragment);
    } else if (ModalLayer['_assistant']['object']['isOnlyObject'](this['option']['content']['value'])) {
      contentNode.appendChild(ModalLayer['_assistant']['element']['objectToNode'](this['option']['content']['value']));
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
    let actionIndex, interactionIndex;

    super.initEvent();

    actionIndex = this['variable']['struct']['_backup']['action']['child'].indexOf(this['variable']['struct']['_backup']['action_button']['close']);
    interactionIndex = this['variable']['struct']['_backup']['interaction']['child'].indexOf(this['variable']['struct']['_backup']['interaction_button']['ok']);

    if (!this['event']['action'][actionIndex]) this['event']['action'][actionIndex] = this.remove;
    if (!this['event']['interaction'][interactionIndex]) this['event']['interaction'][interactionIndex] = this.remove;
  }
}




ModalLayer['_achieve'].set('alert', AlertLayer);
