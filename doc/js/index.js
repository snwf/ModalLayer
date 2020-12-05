/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-31 20:33:56
* @Description         文档
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-05 01:50:32
*/

'use strict';

import init from './init.js';
import docConfig from './doc.js';

let codeArea, codeTextLayer = null;
let mainContent = document.querySelector('main div.col-8.my-4');

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

// 代码执行监听
ModalLayer._assistant.event.add(mainContent, 'click', '.highlight .run-code-btn', function () {
  let code = this.parentNode.innerText.split('\n\n');
  code.shift();
  code = code.join('\n');
  codeArea.value = code;
  codeArea.parentNode.parentNode.querySelector('.modal-layer-interaction-btn-ok').click();
});

// 初始化侧边栏
init.sidebar(docConfig.sidebar);
init.content();
// 初始化代码调试窗口.
codeTextLayer = ModalLayer.prompt({
  mask: false,
  drag: false,
  popupTime: 0,
  resize: false,
  position: [mainContent.offsetLeft + mainContent.offsetWidth, window.innerHeight - 301],
  title: '<span i18n-message="try it"></span>',
  transition: {animation: [
    {transform: 'translateY(100%)'}, {transform: 'translateX(0)'}
  ]},
  interaction: [{text: 'Run', alias: 'modal-layer-interaction-btn-ok', attr: {style: 'flex: 1'}}],
  event : {
    interaction: [
      function () {
        let code, textarea;
        textarea = this.variable.nodes.container.querySelector('#code-try-text');
        code = textarea.value.trim();
        new Function (code)();
      }
    ]
  },
  content: {
    fullContainer: true,
    value: '<textarea id="code-try-text" placeholder="输入代码进行尝试...">ModalLayer.msg("Welcome to ModalLayer!")</textarea>'
  },
});

codeArea = codeTextLayer.variable.nodes.container.querySelector('#code-try-text');
codeArea.onkeyup = function (e) {
  let run = e.code === 'Enter' && e.ctrlKey;
  let runButton = this.parentNode.parentNode.querySelector('.modal-layer-interaction-btn-ok');
  if (run) {
    runButton.click();
    codeArea.blur();
  }
}

export default null;
