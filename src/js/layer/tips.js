/*
* @Author:             Makeit
* @Email:              1597352185@qq.com
* @Date:               2020-11-15 17:33:58
* @Description
*
* @Last Modified by:   Makeit
* @Last Modified time: 2020-11-18 01:24:16
*/
class TipsLayer extends MessageLayer {
  //兼容配置
  compatibleOption(options) {
    super.compatibleOption(options);
    let tipsArray = Object.values(ModalLayer['_enum']['TIPS_POSITION']);
    if (!tipsArray.includes(options['layer']['position']))
      options['layer']['position'] = ModalLayer['_enum']['TIPS_POSITION']['RIGHT'];
  }
  //初始化结构
  initStruct(){
    super.initStruct();
    let container, iconPosition ,positionMap;
    positionMap = {
      left: 'right',
      right: 'left',
      up: 'down',
      down: 'up' 
    }

    container = this['variable']['struct']['_build']['container'];
    iconPosition = ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['TIPS_POSITION'], this['option']['layer']['position']);
    container.innerHTML.push({
      nodeType: 'i',
      'icon-position': `${iconPosition.toLowerCase()}`,
      class: `fas fa-caret-${positionMap[iconPosition.toLowerCase()]}  fa-lg depend-icon`,
    });
  }
  //初始化配置
  initOption(options) {
    super.initOption(options);
    //防止出现多个tips 
    ModalLayer._instance.forEach(v => {
      if (v instanceof TipsLayer && v !== this)
        if (v.option.location = '#tips')
          v.remove();
    })
    this['option']['resize']['enable'] = false;
    this['option']['progress']['enable'] = false;
    this['option']['mask']['enable'] = false;
  }
  //tips定位
  positioning() {
    let bindTips, bindTipsElement, tipsTop, tipsLeft, tipsPosition, containerPosition;
    // 获取tips层的位置
    tipsPosition = this['option']['layer']['position'];
    // 绑定元素的选择
    bindTips = this['option']['layer']['location'];
    // tips容器位置
    containerPosition = this['variable']['nodes']['container'].getBoundingClientRect();
    // 获取绑定元素的位置
    bindTipsElement = document.querySelector(bindTips).getBoundingClientRect();

    //绑定元素的左边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['LEFT']) {
      tipsLeft = bindTipsElement.left - containerPosition.width;
      tipsTop = bindTipsElement.top + (bindTipsElement.height - containerPosition.height) / 2;
    }
    //绑定元素的上边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['UP']) {
      tipsLeft = bindTipsElement.left - (containerPosition.width - bindTipsElement.width) / 2;
      tipsTop = bindTipsElement.top - containerPosition.height;
    }
    //绑定元素下边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['DOWN']) {
      tipsLeft = bindTipsElement.left - (containerPosition.width - bindTipsElement.width) / 2;
      tipsTop = bindTipsElement.top + bindTipsElement.height;
    }
    //绑定元素右边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['RIGHT']) {
      tipsLeft = bindTipsElement.width + bindTipsElement.left;
      tipsTop = bindTipsElement.top + (bindTipsElement.height - containerPosition.height) / 2;
    }
    this['variable']['nodes']['container'].style.cssText += `top: ${tipsTop}px; left: ${tipsLeft}px;`;
  }
}

ModalLayer['_achieve'].set('tips', TipsLayer);
