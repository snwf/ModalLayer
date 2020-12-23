/*
* @Author:             Makeit
* @Email:              1597352185@qq.com
* @Date:               2020-11-15 17:33:58
* @Description
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-23 21:50:33
*/
class TipsLayer extends MessageLayer {
  // 兼容性配置
  compatibleOption(options) {
    super.compatibleOption(options);
    // 父容器
    if (ModalLayer['_assistant']['object']['isString'](options['layer']['location']))
      options['layer']['location'] = document.querySelector(options['layer']['location']);
  }
  
  // 检查配置
  checkOption() {
    super.checkOption();
    let tipsArray = Object.values(ModalLayer['_enum']['TIPS_POSITION']);
    if (!(this['option']['layer']['location'] instanceof Element))
      throw Error('option.layer.location does not meet the expected value');
    if (!tipsArray.includes(this['option']['layer']['position']))
      throw Error('option.layer.position does not meet the expected value.');
    // 防止出现多个tips，允许出现不同位置
    ModalLayer['_instance'].forEach(v => {
      if (v instanceof TipsLayer && v !== this)
        if ((v['option']['layer']['location'] == this['option']['layer']['location']) && (v['option']['layer']['position'] == this['option']['layer']['position']))
          v.remove();
    });
  }

  // 初始化结构
  initStruct() {
    super.initStruct();

    let container, iconPosition, position, iconSize;
    container = this['variable']['struct']['_build']['container'];
    iconPosition = ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['TIPS_POSITION'], this['option']['layer']['position']);
    iconSize = this['option']['layer']['iconSize'];
    position = {
      'left': 'right',
      'right': 'left',
      'up': 'bottom',
      'down': 'top'
    }[iconPosition.toLowerCase()];
    container['child'].push({
      type: 'span',
      class: `depend-icon triangle-${position}`,
      attribute: [{'key': 'style', 'value': `${position}: -${iconSize}px; border-width: ${iconSize}px; border-${position}-width: 0px`}]
    });
  };
  //初始化结构
  initNode() {
    let radius, container;
    super.initNode();
    radius = this['option']['layer']['radius'];
    container = this['variable']['nodes']['container'];
    container.style.cssText += `border-radius: ${radius}px`;
  }

  // 初始化配置
  initOption(options) {
    super.initOption(options);
    // 初始化tips特有的属性
    this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['tips']);
    this['option']['resize']['enable'] = false;
    this['option']['progress']['enable'] = false;
    this['option']['mask']['enable'] = false;
    this['option']['areaProportion'] = null;
  }

  // tips定位
  positioning() {
    let bindTips, bindTipsElement, tipsTop, tipsLeft, tipsPosition, containerPosition, iconBorder;
    // 图标的border
    iconBorder = this['option']['layer']['iconSize'];
    // 获取tips层的位置
    tipsPosition = this['option']['layer']['position'];
    // 绑定元素的选择
    bindTips = this['option']['layer']['location'];
    // tips容器位置
    containerPosition = this['variable']['nodes']['container'].getBoundingClientRect();
    // 获取绑定元素的位置
    bindTipsElement = bindTips.getBoundingClientRect();
    // 获取icon图标的位置

    // 绑定元素的左边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['LEFT']) {
      tipsLeft = bindTipsElement.left - containerPosition.width - iconBorder;
      tipsTop = bindTipsElement.top + (bindTipsElement.height - containerPosition.height) / 2;
    }
    // 绑定元素的上边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['UP']) {
      tipsLeft = bindTipsElement.left - (containerPosition.width - bindTipsElement.width) / 2;
      tipsTop = bindTipsElement.top - containerPosition.height - iconBorder;
    }
    // 绑定元素下边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['DOWN']) {
      tipsLeft = bindTipsElement.left - (containerPosition.width - bindTipsElement.width) / 2;
      tipsTop = bindTipsElement.top + bindTipsElement.height + iconBorder;
    }
    // 绑定元素右边
    if (tipsPosition == ModalLayer['_enum']['TIPS_POSITION']['RIGHT']) {
      tipsLeft = bindTipsElement.width + bindTipsElement.left + iconBorder;
      tipsTop = bindTipsElement.top + (bindTipsElement.height - containerPosition.height) / 2;
    }
    this['variable']['nodes']['container'].style.cssText += `top: ${tipsTop}px; left: ${tipsLeft}px;`;
  }
}

ModalLayer['_achieve'].set('tips', TipsLayer);
