/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 14:50:51
* @Description         构建ModalLayer所需的Node数据
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-24 02:44:26
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
      'child': [{
        'type': 'span',
        'class': 'modal-layer-loading-icon'
      }]
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
      {
        'type': 'span',
        'class': 'modal-layer-loading-icon fas fa-spinner fa-spin fa-fw'
      },
      {
        'type': 'span',
        'class': 'modal-layer-loading-icon fas fa-circle-notch fa-spin fa-fw'
      },
      {
        'type': 'span',
        'class': 'modal-layer-loading-icon fas fa-sync fa-spin fa-fw'
      },
      {
        'type': 'span',
        'class': 'modal-layer-loading-icon fas fa-cog fa-spin fa-fw'
      },
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
          'position-resize-bar': 'top'
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'left'
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'right'
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'bottom'
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'left-top'
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'right-top'
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'left-bottom'
        },
        {
          'type': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'right-bottom'
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
