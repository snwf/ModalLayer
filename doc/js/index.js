/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-31 20:33:56
* @Description         文档
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-04 01:35:09
*/

'use strict';

import init from './init.js';
import docConfig from './doc.js';

let codeTextArea;

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
// 初始化代码调试窗口.
let mainNode = document.querySelector('main div.col-8.my-4');
codeTextArea = ModalLayer.alert({
  mask: false,
  drag: false,
  popupTime: 0,
  resize: false,
  position: [mainNode.offsetLeft + mainNode.offsetWidth, window.innerHeight - 301],
  title: '<span i18n-message="try it"></span>',
  transition: {animation: [
    {transform: 'translateY(100%)'}, {transform: 'translateX(0)'}
  ]},
  text: {interaction: {ok: '运行'}},
  event : {
    interaction: {
      ok: function () {
        let code, textarea;
        textarea = this.variable.nodes.container.querySelector('#code-try-text');
        code = textarea.value.trim();
        new Function (code)();
      }
    }
  },
  content: {
    fullContainer: true,
    value: '<textarea id="code-try-text" placeholder="输入代码进行尝试...">ModalLayer.msg("Welcome to ModalLayer!")</textarea>'
  },
});

codeTextArea.variable.nodes.container.querySelector('#code-try-text').onkeyup = function (e) {
  let run = e.code === 'Enter' && e.ctrlKey;
  let runButton = this.parentNode.parentNode.querySelector('.modal-layer-interaction-btn-ok');
  run && runButton.click();
  runButton.blur();
}

export default null;
