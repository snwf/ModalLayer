/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-31 20:33:56
* @Description         文档
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-11-15 03:47:49
*/

'use strict';

import init from './init.js';
import docConfig from './doc.js';

// 监听语言选择事件
ModalLayer._assistant.event.add(document.querySelector('#language-list'), 'click', '.dropdown-item', function () {
  init.language(this.getAttribute('language'));
});

// 监听主题选择事件
ModalLayer._assistant.event.add(document.querySelector('#theme-list'), 'click', '.dropdown-item', function () {
  init.theme(this.getAttribute('theme'));
});

// 监听更换文档内容事件
ModalLayer._assistant.event.add(document.querySelector('.bd-links'), 'click', 'li.mb-1 > a[aria-expanded="true"], .list-unstyled > li > a.d-inline-flex', function (e) {
  let target, contentName;

  e.preventDefault()
  
  target = this;

  do {
    if (target.getAttribute('aria-expanded') === 'true' || target.previousElementSibling?.getAttribute('aria-expanded') === 'true') {
      contentName = target.getAttribute('data-content-name') ?? target.previousElementSibling.getAttribute('data-content-name');
      break;
    }
    target = target.parentNode;
  } while (target !== document.body);
    
  contentName && init.content(contentName).then(() => window.location.hash = this.getAttribute('href'));

});

// 初始化侧边栏
init.sidebar(docConfig.sidebar);
init.content();

export default null;
