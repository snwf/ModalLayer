/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 14:50:51
* @Description         构建ModalLayer所需的Node数据
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-04 23:52:15
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
      'nodeType': 'div',
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
      'innerHTML': [],
      'nodeType': 'div',
      'class': 'modal-layer-container'
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 响应栏
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'action', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'innerHTML': [],
      'nodeType': 'div',
      'class': 'modal-layer-action',
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

/**
 * 响应按钮
 *
 * @type {Object}
 */
Object.defineProperty(STRUCT, 'action_button', {
  get: function () {
    return JSON.parse(JSON.stringify({
      'minimize': {
        'nodeType': 'span',
        'data-fa-transform': 'up-4 shrink-2',
        'class': 'fas fa-window-minimize modal-layer-action-btn modal-layer-action-btn-minimize'
      },
      'expand': {
        'nodeType': 'span',
        'data-fa-transform': 'shrink-2',
        'class': 'fas fa-expand-arrows-alt modal-layer-action-btn modal-layer-action-btn-expand'
      },
      'close': {
        'nodeType': 'span',
        'data-fa-transform': 'rotate-45 grow-1',
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
      'nodeType': 'div',
      'class': 'modal-layer-title',
      'innerHTML': [{
        'nodeType': 'h4',
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
      'innerHTML': [],
      'nodeType': 'div',
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
      'nodeType': 'div',
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
      'name': '',
      'frameborder': 0,
      'scrolling': 'no',
      'nodeType': 'iframe',
      'class': 'modal-layer-page-content'
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
      'load-status': 2,
      'nodeType': 'canvas',
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
      'nodeType': 'div',
      'class': 'modal-layer-loading-box',
      'innerHTML': [{
        'nodeType': 'span',
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
        'nodeType': 'span',
        'class': 'modal-layer-loading-icon fas fa-spinner fa-spin fa-fw'
      },
      {
        'nodeType': 'span',
        'class': 'modal-layer-loading-icon fas fa-circle-notch fa-spin fa-fw'
      },
      {
        'nodeType': 'span',
        'class': 'modal-layer-loading-icon fas fa-sync fa-spin fa-fw'
      },
      {
        'nodeType': 'span',
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
      'innerHTML': [],
      'nodeType': 'div',
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
      'innerHTML': [],
      'nodeType': 'div',
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
        'nodeType': 'span',
        'innerText': 'Confirm',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-ok'
      },
      'no': {
        'nodeType': 'span',
        'innerText': 'Reject',
        'class': 'modal-layer-interaction-btn modal-layer-interaction-btn-no'
      },
      'cancel': {
        'nodeType': 'span',
        'innerText': 'Cancel',
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
      'nodeType': 'div',
      'class': 'modal-layer-progress-bar',
      'innerHTML': [{
        'nodeType': 'div',
        'class': 'modal-layer-progress-bar-background',
        'innerHTML': [{
          'nodeType': 'span',
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
      'nodeType': 'div',
      'class': 'modal-layer-resize-box',
      'innerHTML':[
        {
          'nodeType': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'top'
        },
        {
          'nodeType': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'left'
        },
        {
          'nodeType': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'right'
        },
        {
          'nodeType': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'bottom'
        },
        {
          'nodeType': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'left-top'
        },
        {
          'nodeType': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'right-top'
        },
        {
          'nodeType': 'div',
          'class': 'modal-layer-resize-bar',
          'position-resize-bar': 'left-bottom'
        },
        {
          'nodeType': 'div',
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
      'innerHTML': [],
      'nodeType': 'div',
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
      'nodeType': 'div',
      'class': 'modal-layer-minimize-queue-item',
      'innerHTML': [{
        'nodeType': 'h4',
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
        'title': 'crop',
        'nodeType': 'div',
        'tool-type': 'crop',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
      },
      'spin': {
        'title': 'spin',
        'nodeType': 'div',
        'tool-type': 'spin',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
      },
      'revert': {
        'title': 'revert',
        'nodeType': 'div',
        'tool-type': 'revert',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
      },
      'filter': {
        'title': 'filter',
        'nodeType': 'div',
        'tool-type': 'filter',
        'innerHTML': [
          {
            'nodeType': 'span',
            'class': 'modal-layer-toolbar-item-icon'
          },
          {
            'innerHTML': [],
            'nodeType': 'div',
            'class': 'modal-layer-toolbar-item-child-list'
          },
        ],
        'class': 'modal-layer-toolbar-item'
      },
      'download': {
        'title': 'save',
        'nodeType': 'div',
        'tool-type': 'download',
        'innerHTML': [{
          'nodeType': 'span',
          'class': 'modal-layer-toolbar-item-icon'
        }],
        'class': 'modal-layer-toolbar-item'
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
          'title': '镜像',
          'innerText': '镜',
          'nodeType': 'span',
          'filter-type': 'mirror',
          'class': 'modal-layer-toolbar-filter-icon'
        },
        'blur': {
          'data-radius': 3,
          'data-sigma': 1.5,
          'innerText': '模',
          'title': '高斯模糊',
          'nodeType': 'span',
          'filter-type': 'blur',
          'class': 'modal-layer-toolbar-filter-icon'
        },
        'gray': {
          'title': '灰度化',
          'innerText': '灰',
          'nodeType': 'span',
          'filter-type': 'gray',
          'class': 'modal-layer-toolbar-filter-icon'
        }
      }
    }));
  },
  'enumerable' : true,
  'configurable' : false
});

Object.freeze(STRUCT);
