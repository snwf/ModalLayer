/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 14:50:51
* @Description         构建ModalLayer所需的Node数据
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-21 05:24:03
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
        'type': 'span',
        'attribute': [{'key': 'data-fa-transform', 'value': 'up-4 shrink-2'}],
        'class': 'fas fa-window-minimize modal-layer-action-btn modal-layer-action-btn-minimize'
      },
      'expand': {
        'type': 'span',
        'attribute': [{'key': 'data-fa-transform', 'value': 'shrink-2'}],
        'class': 'fas fa-expand-arrows-alt modal-layer-action-btn modal-layer-action-btn-expand'
      },
      'close': {
        'type': 'span',
        'attribute': [{'key': 'data-fa-transform', 'value': 'rotate-45 grow-1'}],
        'class': 'fas fa-plus modal-layer-action-btn modal-layer-action-btn-close'
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
