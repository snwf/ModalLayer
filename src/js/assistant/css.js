/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 21:20:11
* @Description         CSS助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-27 01:18:22
*/

class CssAssistant {
  /**
   * 临时css样式存放
   *
   * @type {Object}
   */
  static cssList = new Map;

  /**
   * 分隔符
   *
   * @type {String}
   */
  static delimiter = '\n';

  /**
   * style标签缓存
   *
   * @type {Element}
   */
  static styleNode = null;

  /**
   * 生成一段animation的css代码
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T21:42:19+0800
   * @param    {String}                 name   动画名称
   * @param    {Object}                 change 样式的改变
   * @return   {String}                        生成的css代码
   */
  static createAnimation (name, change) {
    let cssText = '@keyframes ' + name + ' {';
    Object.keys(change).forEach(k => {
      cssText += k + '{' + change[k] + '}';
    });
    return cssText + '}';
  }

  /**
   * 根据名称检索css是否已经添加
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T22:58:33+0800
   * @param    {String}                 name css代码块名称
   * @return   {Boolean}                     [description]
   */
  static hasCss (name) {
    return CssAssistant['cssList'].has(name);
  }

  /**
   * 添加一段css代码到style标签中
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T21:23:19+0800
   * @param    {String}                 name    css代码块名称
   * @param    {String}                 cssText css代码块
   */
  static addCss (name, cssText) {
    if (CssAssistant['hasCss'](name)) return false;
    if (!CssAssistant['styleNode']){
      CssAssistant['styleNode'] = document.createElement('style');
      document.head.appendChild(CssAssistant['styleNode']);
    }

    cssText = cssText.trim();
    CssAssistant['cssList'].set(name, cssText);
    CssAssistant['styleNode'].innerHTML += CssAssistant['delimiter'] + cssText;
  }

  /**
   * 移除一段css代码
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T21:25:52+0800
   * @param    {String}                 name css代码块名称
   */
  static delCss (name) {
    let regular;
    if (CssAssistant['hasCss'](name)) {
      regular = new RegExp(CssAssistant['delimiter'] + CssAssistant['cssList'].get(name), 'g');
      CssAssistant['styleNode'].innerHTML = CssAssistant['styleNode'].innerHTML.replace(regular, '');
    }
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'css', {value: CssAssistant});
