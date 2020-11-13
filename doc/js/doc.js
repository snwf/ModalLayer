/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-31 01:21:59
* @Description         手册参数
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-11-13 21:33:17
*/

'use strict';

const doc = Object.create(null);

doc.sidebar = [
  {
    title: 'start',
    content: 'start',
    target: 'getting-started-collapse',
    child: [
      {
        title: 'introduction',
        target: 'introduction',
      },
      {
        title: 'download',
        target: 'download',
      },
      {
        title: 'build',
        target: 'build',
      },
      {
        title: 'project structure',
        target: 'project-structure',
      },
      {
        title: 'source structure',
        target: 'source-structure',
      },
      {
        title: 'Example',
        target: 'example',
      }
    ]
  },
  {
    title: 'option',
    content: 'option',
    target: 'customize-collapse',
    child: [
      {
        title: 'common',
        target: 'common',
      },
      {
        title: 'pagelayer',
        target: 'pagelayer',
      },
      {
        title: 'loadinglayer',
        target: 'loadinglayer',
      },
      {
        title: 'imagelayer',
        target: 'imagelayer',
      },
    ]
  },
  // {
  //   title: 'event',
  //   content: 'event',
  //   target: 'event-collapse',
  //   child: [
  //   ]
  // },
  // {
  //   title: 'method',
  //   content: 'method',
  //   target: 'method-collapse',
  //   child: [
  //   ]
  // },
  // {
  //   title: 'assistant',
  //   content: 'assistant',
  //   target: 'assistant-collapse',
  //   child: [
  //     {
  //       title: 'StringAssistant',
  //       target: 'StringAssistant',
  //     },
  //   ]
  // },


];

export default doc;
