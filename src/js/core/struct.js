/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 14:50:51
* @Description         构建ModalLayer所需的Node数据
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-28 02:52:20
*/

const STRUCT = Object.create(null);

/**
 * 遮罩层
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'mask', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'div',
      'class': 'modal-layer-mask'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 容器节点
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'container', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'child': [],
      'type': 'div',
      'class': 'modal-layer-container'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 动作栏
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'action', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'child': [],
      'type': 'div',
      'class': 'modal-layer-action',
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 动作按钮
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'action_button', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'minimize': {
        'type': 'svg',
        'namespace': 'http://www.w3.org/2000/svg',
        'class': 'modal-layer-action-btn modal-layer-action-btn-minimize',
        'attribute': [
          {'key': 'role', 'value': 'img'},
          {'key': 'viewBox', 'value': '0 0 512 512'},
          {'key': 'xmlns', 'value': 'http://www.w3.org/2000/svg'},
          {'key': 'style', 'value': 'width: .875em; vertical-align: -.125em; transform-origin: 0.4375em 0.5em;'},
        ],
        'child': [
          {
            'type': 'g',
            'namespace': 'http://www.w3.org/2000/svg',
            'attribute': [{'key': 'transform', 'value': 'translate(256 256)'}],
            'child': [
              {
                'type': 'g',
                'namespace': 'http://www.w3.org/2000/svg',
                'attribute': [{'key': 'transform', 'value': 'translate(0, -128)  scale(0.875, 0.875)  rotate(0 0 0)'}],
                'child': [
                  {
                    'type': 'path',
                    'namespace': 'http://www.w3.org/2000/svg',
                    'attribute': [
                      {'key': 'fill', 'value': 'currentColor'},
                      {'key': 'transform', 'value': 'translate(-256 -256)'},
                      {'key': 'd', 'value': 'M464 352H48c-26.5 0-48 21.5-48 48v32c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-32c0-26.5-21.5-48-48-48z'}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'expand': {
        'type': 'svg',
        'namespace': 'http://www.w3.org/2000/svg',
        'class': 'modal-layer-action-btn modal-layer-action-btn-expand',
        'attribute': [
          {'key': 'role', 'value': 'img'},
          {'key': 'viewBox', 'value': '0 0 448 512'},
          {'key': 'xmlns', 'value': 'http://www.w3.org/2000/svg'},
          {'key': 'style', 'value': 'width: .875em; vertical-align: -.125em; transform-origin: 0.4375em 0.5em;'},
        ],
        'child': [
          {
            'type': 'g',
            'namespace': 'http://www.w3.org/2000/svg',
            'attribute': [{'key': 'transform', 'value': 'translate(224 256)'}],
            'child': [
              {
                'type': 'g',
                'namespace': 'http://www.w3.org/2000/svg',
                'attribute': [{'key': 'transform', 'value': 'translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)'}],
                'child': [
                  {
                    'type': 'path',
                    'namespace': 'http://www.w3.org/2000/svg',
                    'attribute': [
                      {'key': 'fill', 'value': 'currentColor'},
                      {'key': 'transform', 'value': 'translate(-224 -256)'},
                      {'key': 'd', 'value': 'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z'}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'close': {
        'type': 'svg',
        'namespace': 'http://www.w3.org/2000/svg',
        'class': 'modal-layer-action-btn modal-layer-action-btn-close',
        'attribute': [
          {'key': 'role', 'value': 'img'},
          {'key': 'viewBox', 'value': '0 0 448 512'},
          {'key': 'xmlns', 'value': 'http://www.w3.org/2000/svg'},
          {'key': 'style', 'value': 'width: .875em; vertical-align: -.125em; transform-origin: 0.4375em 0.5em;'},
        ],
        'child': [
          {
            'type': 'g',
            'namespace': 'http://www.w3.org/2000/svg',
            'attribute': [{'key': 'transform', 'value': 'translate(224 256)'}],
            'child': [
              {
                'type': 'g',
                'namespace': 'http://www.w3.org/2000/svg',
                'attribute': [{'key': 'transform', 'value': 'translate(0, 0)  scale(1.0625, 1.0625)  rotate(45 0 0)'}],
                'child': [
                  {
                    'type': 'path',
                    'namespace': 'http://www.w3.org/2000/svg',
                    'attribute': [
                      {'key': 'fill', 'value': 'currentColor'},
                      {'key': 'transform', 'value': 'translate(-224 -256)'},
                      {'key': 'd', 'value': 'M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 标题栏
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'title', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'div',
      'class': 'modal-layer-title',
      'child': [{
        'type': 'h4',
        'class': 'modal-layer-title-content'
      }]
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 内容容器
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'content', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'child': [],
      'type': 'div',
      'class': 'modal-layer-content'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 文本层内容节点
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'content_text', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'div',
      'class': 'modal-layer-text-content'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 页面层内容节点
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'content_page', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'iframe',
      'class': 'modal-layer-page-content',
      'attribute': [
        {'key': 'name', 'value': ''},
        {'key': 'frameborder', 'value': 0},
        {'key': 'scrolling', 'value': 'no'},
      ]
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 图片层内容节点
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'content_image', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'canvas',
      'class': 'modal-layer-image-canvas'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 加载层内容节点
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'content_loading', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'div',
      'class': 'modal-layer-loading-box',
      'child': []
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 加载层内容节点
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'content_loading_icon', {
  get: function () {
    return JSON.parse(JSON.stringify([
      {"type":"svg","class":"modal-layer-loading-icon modal-layer-spin","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"role","value":"img"},{"key":"xmlns","value":"http://www.w3.org/2000/svg","namespace":"http://www.w3.org/2000/xmlns/"},{"key":"viewBox","value":"0 0 512 512"},{"key":"data-fa-i2svg","value":""}],"child":[{"type":"path","class":"","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"fill","value":"currentColor"},{"key":"d","value":"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"}]}]},
      {"type":"svg","class":"modal-layer-loading-icon modal-layer-spin","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"role","value":"img"},{"key":"xmlns","value":"http://www.w3.org/2000/svg","namespace":"http://www.w3.org/2000/xmlns/"},{"key":"viewBox","value":"0 0 512 512"},{"key":"data-fa-i2svg","value":""}],"child":[{"type":"path","class":"","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"fill","value":"currentColor"},{"key":"d","value":"M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"}]}]},
      {"type":"svg","class":"modal-layer-loading-icon modal-layer-spin","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"role","value":"img"},{"key":"xmlns","value":"http://www.w3.org/2000/svg","namespace":"http://www.w3.org/2000/xmlns/"},{"key":"viewBox","value":"0 0 512 512"},{"key":"data-fa-i2svg","value":""}],"child":[{"type":"path","class":"","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"fill","value":"currentColor"},{"key":"d","value":"M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"}]}]},
      {"type":"svg","class":"modal-layer-loading-icon modal-layer-spin","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"role","value":"img"},{"key":"xmlns","value":"http://www.w3.org/2000/svg","namespace":"http://www.w3.org/2000/xmlns/"},{"key":"viewBox","value":"0 0 512 512"},{"key":"data-fa-i2svg","value":""}],"child":[{"type":"path","class":"","namespace":"http://www.w3.org/2000/svg","attribute":[{"key":"fill","value":"currentColor"},{"key":"d","value":"M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"}]}]},
    ]));
  },
  'enumerable' : true,
  'configurable' : false
});


/**
 * 工具栏
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'toolbar', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'child': [],
      'type': 'div',
      'class': 'modal-layer-toolbar'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 交互栏
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'interaction', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'child': [],
      'type': 'div',
      'class': 'modal-layer-interaction'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});


/**
 * 交互按钮
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'interaction_button', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'ok': {
        'type': 'span',
        'text': 'Confirm',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-ok'
      },
      'no': {
        'type': 'span',
        'text': 'Reject',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-no'
      },
      'cancel': {
        'type': 'span',
        'text': 'Cancel',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-cancel'
      }
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 进度条
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'progress_bar', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'div',
      'class': 'modal-layer-progress-bar',
      'child': [{
        'type': 'div',
        'class': 'modal-layer-progress-bar-background',
        'child': [{
          'type': 'span',
          'class': 'modal-layer-progress-bar-progress'
        }]
      }]
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 调整大小容器
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'resize_box', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'div',
      'class': 'modal-layer-resize-box',
      'child':[
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'top'}]
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'left'}]
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'right'}]
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'bottom'}]
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'left-top'}]
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'right-top'}]
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'left-bottom'}]
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'attribute': [{'key': 'position-resize-bar', 'value': 'right-bottom'}]
        }
      ]
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 最小化队列
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'minimize_queue', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'child': [],
      'type': 'div',
      'id': 'modal-layer-minimize-queue'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 队列成员
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'minimize_queue_item', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'type': 'div',
      'class': 'modal-layer-minimize-queue-item',
      'child': [{
        'type': 'h4',
        'class': 'modal-layer-minimize-queue-item-title'
      }]
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 图片层工具
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'image_tools', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'crop': {
        'type': 'div',
        'class': 'modal-layer-toolbar-item',
        'child': [{
          'type': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'attribute': [
          {'key': 'title', 'value': 'crop'},
          {'key': 'tool-type', 'value': 'crop'},
        ]
      },
      'spin': {
        'type': 'div',
        'class': 'modal-layer-toolbar-item',
        'child': [{
          'type': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'attribute': [
          {'key': 'title', 'value': 'spin'},
          {'key': 'tool-type', 'value': 'spin'},
        ]
      },
      'revert': {
        'type': 'div',
        'class': 'modal-layer-toolbar-item',
        'child': [{
          'type': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'attribute': [
          {'key': 'title', 'value': 'revert'},
          {'key': 'tool-type', 'value': 'revert'},
        ]
      },
      'filter': {
        'type': 'div',
        'class': 'modal-layer-toolbar-item',
        'attribute': [
          {'key': 'title', 'value': 'filter'},
          {'key': 'tool-type', 'value': 'filter'},
        ],
        'child': [
          {
            'type': 'span',
            'class': 'modal-layer-toolbar-item-icon'
          },
          {
            'child': [],
            'type': 'div',
            'class': 'modal-layer-toolbar-item-child-list'
          },
        ],
      },
      'download': {
        'type': 'div',
        'class': 'modal-layer-toolbar-item',
        'child': [{
          'type': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'attribute': [
          {'key': 'title', 'value': 'save'},
          {'key': 'tool-type', 'value': 'download'},
        ]
      }
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

Object.defineProperty(STRUCT, 'image_tools_child', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'filter': {
        'mirror': {
          'text': '镜',
          'type': 'span',
          'class': 'modal-layer-toolbar-filter-icon',
          'attribute': [
            {'key': 'title', 'value': '镜像'},
            {'key': 'filter-type', 'value': 'mirror'},
          ]
        },
        'blur': {
          'text': '模',
          'type': 'span',
          'class': 'modal-layer-toolbar-filter-icon',
          'attribute': [
            {'key': 'data-radius', 'value': 3},
            {'key': 'data-sigma', 'value': 1.5},
            {'key': 'title', 'value': '高斯模糊'},
            {'key': 'filter-type', 'value': 'blur'},
          ]
        },
        'gray': {
          'text': '灰',
          'type': 'span',
          'class': 'modal-layer-toolbar-filter-icon',
          'attribute': [
            {'key': 'title', 'value': '灰度化'},
            {'key': 'filter-type', 'value': 'gray'},
          ]
        }
      }
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

Object.freeze(STRUCT);
