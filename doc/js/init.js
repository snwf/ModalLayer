/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-11-10 16:59:21
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-11-13 21:14:30
*/

'use strict';

import getMessage from './i18n.js';
import themeConfig from './theme.js';

const init = Object.create(null);

let loading = null;

let language = navigator.language;

const contentStatus = ['start', false];

let theme = localStorage.getItem('theme-style');

init.theme = function (nTheme = 'light') {
  let oTheme = theme;
  let mainNode = document.body;
  let themeShow = document.querySelector('#show-theme');
  let themeList = document.querySelector('#theme-list');
  let codeList = document.querySelectorAll('.highlight');
  let contentTables = document.querySelectorAll('.content.bd-content .table');

  mainNode.classList.remove('bg-' + themeConfig[oTheme]?.normal?.bg);
  mainNode.classList.remove('text-' + themeConfig[oTheme]?.normal?.color);
  mainNode.classList.add('bg-' + themeConfig[nTheme].normal.bg);
  mainNode.classList.add('text-' + themeConfig[nTheme].normal.color);

  for (let i = 0; i < codeList.length; i++) {
    codeList[i].classList.remove('bg-' + themeConfig[oTheme]?.code?.bg);
    codeList[i].classList.remove('text-' + themeConfig[oTheme]?.code?.color);
    themeConfig[nTheme]?.code?.bg && codeList[i].classList.add('bg-' + themeConfig[nTheme].code.bg);
    themeConfig[nTheme]?.code?.color && codeList[i].classList.add('text-' + themeConfig[nTheme].code.color);
  }

  for (let i = 0; i < contentTables.length; i++) {
    contentTables[i].classList.remove('table-' + themeConfig[oTheme]?.normal.table);
    themeConfig[nTheme]?.normal?.table && contentTables[i].classList.add('table-' + themeConfig[nTheme].normal.table);
  }

  theme = nTheme;
  localStorage.setItem('theme-style', theme);
  themeShow.innerText = themeList.querySelector(`button[theme="${theme}"]`)?.innerText ?? 'light';
}

init.content = function (name = 'start') {
  let allowContent = ['start', 'option', 'event', 'method', 'assistant'];
  if (!allowContent.includes(name) || (contentStatus[0] === name && contentStatus[1])) return;
  contentStatus[0] = name;
  contentStatus[1] = false;
  if (loading)
    loading.show();
  else
    loading = ModalLayer.loading({layer: {icon: 3}});
  fetch('./docs/' + name, {
    mode: 'cors',
    method: 'get',
    cache: 'no-cache',
    redirect: 'follow',
    credentials: 'include',
    referrer: 'no-referrer',
    headers: {'content-type': 'text/plain'}
  }).then(response => {
    if (response.status === 200)
      return response.text();
    else
      throw Error(`Not Found ${name} Doc.`);
  }).then(text => {
    contentStatus[1] = true;
    document.querySelector('.container-lg .row div.col-8').innerHTML = text
    init.language(language);
    init.theme(theme);
    init.quickNav();
    loading.hide();
  });
}

init.language = function (lang = 'zh-CN') {
  let themeShow = document.querySelector('#show-theme');
  let languageShow = document.querySelector('#show-language');
  let languageList = document.querySelector('#language-list');
  let i18nList = document.querySelectorAll('*[i18n-message]');
  let select = languageList.querySelector(`button[language="${lang}"]`);

  themeShow.innerText = getMessage(theme, lang);
  for (let i = 0; i < i18nList.length; i++)
    i18nList[i].innerHTML = getMessage(i18nList[i].getAttribute('i18n-message'), lang);

  language = lang;
  languageShow.innerText = select.innerText;
}

init.sidebar = function (config, lang) {
  let fragment, sidebarNode;
  const node = document.createElement('div');
  fragment = document.createDocumentFragment();
  sidebarNode = document.querySelector('.bd-sidebar #bd-docs-nav .list-unstyled');
  function getSidebarItem (itemConfig) {
    let html = '';
    html += '<li class="mb-1">';
    html += `<a class="d-inline-flex align-items-center rounded collapsed" data-toggle="collapse" data-target="#${itemConfig.target}" href="#" role="button" aria-expanded="false" data-content-name="${itemConfig.content}"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" i18n-message="${itemConfig.title}">${getMessage(itemConfig.title, lang)}</font></font></a>`;
    html += `<div class="collapse" id="${itemConfig.target}">`;
    html += '<ul class="list-unstyled font-weight-normal pb-1 small">'
    for (let i = 0; i < itemConfig.child.length; i++)
      html += `<li><a href="#${itemConfig.child[i].target}" class="d-inline-flex align-items-center rounded"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" i18n-message="${itemConfig.child[i].title}">${getMessage(itemConfig.child[i].title, lang)}</font></font></a></li>`;
    html += '</ul></div></li>';
    node.innerHTML = html;
    return node.children[0];
  }
  for (let i = 0; i < config.length; i++)
    fragment.appendChild(getSidebarItem(config[i]));
  sidebarNode.appendChild(fragment);
}

init.quickNav = function () {
  let quickNav, content, fragment, navList, parentNav;
  content = document.querySelector('.content.bd-content');

  quickNav = document.querySelector('aside #TableOfContents > ul');
  
  quickNav.innerHTML = '';
  if (!content) return;
  
  fragment = document.createDocumentFragment();
  navList = content.querySelectorAll('h2[id],h3[id],h4[id],h5[id]');
  parentNav = quickNav;
  function getQuickItem (navItem) {
    let item, mark, title, index;
    mark = navItem.id;
    title = navItem.innerText;
    item = document.createElement('li');
    item.innerHTML = `<a href="#${mark}">${title}</a>`;
    return item;
  }

  for (let i = 0; i < navList.length; i++) {
    if (quickNav === parentNav) {
      let quickItem = null;
      if ((navList.item(i + 1) ?? navList.item(i)).nodeName[1] > navList.item(i).nodeName[1]) {
        quickItem = getQuickItem(navList.item(i));
        parentNav = document.createElement('ul');
        fragment.appendChild(quickItem);
        quickItem.appendChild(parentNav)
      } else {
        quickItem = getQuickItem(navList.item(i));
        fragment.appendChild(quickItem);
      }
    } else {
      parentNav.appendChild(getQuickItem(navList.item(i)));
      if ((navList.item(i + 1) ?? navList.item(i)).nodeName[1] < navList.item(i).nodeName[1])
        parentNav = parentNav.parentNode.parentNode === fragment ? quickNav : parentNav.parentNode.parentNode;
    }
  }
  quickNav.appendChild(fragment);
}

export default init;
