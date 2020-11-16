/*
* @Author:             Makeit
* @Email:              1597352185@qq.com
* @Date:               2020-11-15 17:33:58
* @Description         
*
* @Last Modified by:   Makeit
* @Last Modified time: 2020-11-15 21:51:59
*/
class TipsLayer extends ModalLayer{
  //初始化配置
  initOption (options) {
    super.initOption(options);
    this['option']['title'] = false;
    this['option']['drag']['enable'] = false;
    this['option']['drag']['overflow'] = false;
  }
  
  initStruct(){
    let content,progress,container;
    super.initStruct();
    container = this['variable']['struct']['_build']['container'];
    content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
    container.innerHTML.push(content);
    if (this['option']['progress']['enable']) {
        progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
        container.innerHTML.push(progress);
    }

  }
  //初始化节点
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
  //定位节点
  xtips(){
    let eleCoord = '';
    let elemCoord = '';
    let element = '';
    
    if(ModalLayer._assistant.object.isString(this['option']['layer']['location']))
      element = document.querySelector(this['option']['layer']['location']);
    
 
    //获取元素坐标
    eleCoord = element.getBoundingClientRect();
    /*//获取需要定位元素坐标
    elemCoord = this['variable']['nodes']['container'].getBoundingClientRect();*/
    //重置定位元素的位置
    this['variable']['nodes']['container'].style.position = 'absolute';
    this['variable']['nodes']['container'].style.margin = 'unset';
    this['variable']['nodes']['container'].style.top = (eleCoord.height-parseInt(getComputedStyle(this['variable']['nodes']['container'],null).height))/2+eleCoord.y+'px';
    this['variable']['nodes']['container'].style.left = (eleCoord.x+eleCoord.width)+'px';        
  }      
}
ModalLayer['_achieve'].set('tips',TipsLayer);
