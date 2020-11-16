/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-01 14:40:21
* @Description         枚举
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-27 02:17:36
*/

const ENUM = Object.create(null);

/**
 * 方向键(Keycode)
 *
 * @type {Object}
 */
Object.defineProperty(ENUM, 'ARROW', {
  'enumerable': true,
  'value': {
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  }
});

/**
 * 方位
 *
 * @type {Object}
 */
Object.defineProperty(ENUM, 'POSITION', {
  'enumerable': true,
  'value': {
    'EAST': 'e', // 东
    'WEST': 'w', // 西
    'SOUTH': 's', // 南
    'NORTH': 'n' // 北
  }
})

/**
 * 模态层类型
 *
 * @type {Object}
 */
Object.defineProperty(ENUM, 'TYPE', {
  'enumerable': true,
  'value': {
    'MSG': 0,
    'MESSAGE': 0,
    'ALERT': 1,
    'PROMPT': 2,
    'CONFIRM': 3,
    'PAGE': 4,
    'LOADING': 5,
    'IMAGE': 6,
    'VIDEO': 7,
    'AUTDIO': 8,
    'TIPS': 9
  }
});

/**
 * 模态层状态
 *
 * @type {Object}
 */
Object.defineProperty(ENUM, 'STATUS', {
  'enumerable': true,
  'value': {
    'HIDE': 0,
    'SHOW': 1,
    'EXPAND': 2,
    'MINIMIZE': 3,
    'REMOVING': 4,
    'REMOVED': 5,
    'DRAG': 6,
    'RESIZE': 7
  }
});

/**
 * 资源加载状态
 *
 * @type {Object}
 */
Object.defineProperty(ENUM, 'LOAD_STATUS', {
  'enumerable': true,
  'value': {
    'FAILED': 0,
    'LOADED': 1,
    'LOADING': 2
  }
});

/**
 * 浏览器数据库
 *
 * @type {Object}
 */
Object.defineProperty(ENUM, 'BROWSER_STORAGE', {
  'enumerable': true,
  'value': {
    'WEBSQL': 'webSQL',
    'INDEXDB': 'indexedDB',
    'LOCALSTORAGE': 'localStorage',
    'SESSIONSTORAGE': 'sessionStorage'
  }
});

Object.freeze(ENUM);
