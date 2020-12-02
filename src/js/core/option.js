/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 16:14:29
* @Description         ModalLayer配置
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-01 23:23:32
*/

const OPTION = Object.create(null);

/**
 * 页面层默认配置
 *
 * @type {Object}
 */
Object.defineProperty(OPTION, 'page', {
  'value': {
    'src': null, // 展示的链接
    'srcdoc': null, // 展示的内容
    'frameborder': 0, // iframe边框
    'scrolling': 'no', // 是否启用滚动条
    'area': [800, 600], // 页面层默认大小
    'allowfullscreen': true, // 是否允许全屏
    'name': 'modal-layer-page-' // 名称前缀
  }
});
/**
 * tips 默认配置
 * 
 * @type {object}
 */
Object.defineProperty(OPTION, 'tips', {
  'value': {
    'location': null, // 获取用户绑定元素
    'position': 3, // 设置tips的位置 
    'iconSize': 10, // 设置tipsicon的大小
    }
});

/**
 * 加载层默认配置
 *
 * @type {Object}
 */
Object.defineProperty(OPTION, 'loading', {
  'value': {
    'icon': 0, // 加载动画图标
    'size': 48, // 图标大小, 主要是用于设置font-size
    'rate': null, // 规定了一次循环中的速度变化, 参考css animation中的animation-timing-function属性
    'duration': 2, // 完成一次循环所用时间, 单位为秒
    'area': [48, 48], // 尺寸, 对用css中的width与height
    'color': 'white', // 文字/图标颜色
    'background': 'transparent', // 背景颜色
    'position': ['center', 'center'], // 动画位置, 预设值 left, center, right或具体像素值
  }
});

/**
 * 图片层默认配置
 *
 * @type {Object}
 */
Object.defineProperty(OPTION, 'image', {
  'value': {
    'image': [], // 图片, 可以为file对象也可以为Image节点, 甚至可以为base64数据.当图片加载不成功时会迭代尝试.
    'size': null, // 指定图片大小, 格式为[w, h], 只能为具体的值, 单位是像素.如果设置了size则sizeRange不再起作用.
    'sizeRange': { // 指定图片大小范围, 格式为[w, h], 可以为像素或是百分比、小数.
      'min': [0.15625, 0.160257], // 最小尺寸
      'max': [0.9, 0.9] // 最大尺寸, 可以为像素、百分比(浏览器可视区域比例, 最好不要超过90%).
    },
    'toolbar': { // 工具栏设置
      'enable': false, // 是否开启
      'config': { // 相关工具设置
        'crop': { // 是否开启裁剪
          'enable': false,
          'title': 'crop',
          'grid': 'quarter', // 为null或false则不开启
          'icon': 'fas fa-crop-alt'
        },
        'spin': { // 是否开启旋转
          'enable': false,
          'title': 'spin',
          'icon': 'fas fa-redo-alt'
        },
        'filter': { // 是否开启滤镜
          'enable': false,
          'config': {
            'blur': {
              'enable': false,
              'title': 'blur',
              'icon': null,
              'textIcon': '模'
            },
            'gray': {
              'enable': false,
              'title': 'gray',
              'icon': null,
              'textIcon': '灰'
            },
            'mirror': {
              'enable': false,
              'title': 'mirror',
              'icon': null,
              'textIcon': '镜'
            }
          },
          'title': 'filter',
          'icon': 'fas fa-filter'
        },
        'revert': { // 是否开启重载
          'enable': false,
          'title': 'revert',
          'icon': 'fas fa-sync-alt'
        },
        'download': { // 是否开启下载
          'enable': false,
          'name': 'picture-',
          'mime': 'image/png',
          'title': 'download',
          'icon': 'fas fa-download',
        }
      }
    }
  }
});

/**
 * 公共默认配置
 *
 * @type {Object}
 */
Object.defineProperty(OPTION, 'common', {
  'value': {
    'index': 0, // ID
    'ui': 'modal-layer-ui', // 统一的class
    'title': null, // 标题(传入false则不显示标题栏)
    'window': null, // 父容器, 不能为static定位, 否则无法约束.
    'position': null, // 模态层定位 [x, y] 或 预设值ENUM.POSITION
    'popupTime': 5, // 模态层默认显示时间
    'skin': 'default', // 皮肤样式
    'parentModalLayer': null, // 父模态层
    'areaProportion': [0.18, 0.21], // 浏览器窗口(可见区域)与模态层的比例 [width, height]
    'content': { // 内容容器设置
      'value': null, // 容器内容, 可以为文本或String Node
      'fullContainer': false // 是否将内容填充整个模态层
    },
    'text': { // 文本描述
      'action': { // 响应按钮文本描述
        'close': '关闭', // 关闭按钮文本描述
        'expand': '全屏', // 全屏按钮文本描述
        'minimize': '最小化' // 最小化按钮文本描述
      },
      'interaction': { // 交互按钮文本描述
        'ok': '确定', // 确定按钮文本描述
        'no': '拒绝', // 拒绝按钮文本描述
        'cancel': '取消' // 取消按钮文本描述
      }
    },
    'transition': { // 过渡动画设置
      'duration': 0.2, // 持续时间
      'animation': 0, // 动画名称或Animation对象或预设方案
      'easing': 'ease', // 动画随时间变化速率
    },
    'mask': { // 遮罩层设置
      'enable': true, // 是否开启
      'clickRemove': true // 点击是否关闭
    },
    'drag': { // 拖拽窗口设置
      'enable': true, // 是否开启
      'overflow': false, // 拖拽过程中是否允许超出父元素
    },
    'resize': { // 改变窗口大小设置
      'enable': true // 是否开启
    },
    'progress': { // 模态层时限进度条提醒设置
      'enable': false, // 是否开启
      'position': 'bottom', // 进度条显示位置
      'color': 'deepskyblue', // 进度条颜色
      'background': '#cecece', // 进度条背景颜色
    },
    'layer': { // 不同模态层的特殊设置
    },
    'hook': { // 钩子
      'initStart': null, // 初始化之前执行
      'initEnded': null // 初始化之后执行
    }
  }
});

Object.freeze(OPTION);
