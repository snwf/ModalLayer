/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-18 21:23:00
* @Description         Worker助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-24 01:39:40
*/

class WorkerAssistant {
  /**
   * 检查worker是否存在
   *
   * @Author   Wolf
   * @DateTime 2020-09-18T22:01:31+0800
   * @param    {String}                 k 名称
   * @return   {Boolean}
   */
  static has (k) {
    return CacheAssistant['get']('list', WorkerAssistant)?.has(k) ?? false;
  }

  /**
   * 添加一个worker对象到列表中
   *
   * @Author   Wolf
   * @DateTime 2020-09-18T21:56:33+0800
   * @param    {String}                 k 名称
   * @param    {Worker}                 w Worker实例
   */
  static add (k, w) {
    let cache;
    
    if (!(cache = CacheAssistant['get']('list', WorkerAssistant)))
      CacheAssistant['set']('list', cache = new Map, WorkerAssistant);
    
    if (!(w instanceof Worker))
      throw new TypeError('Not a Worker instance.');
    if (WorkerAssistant['has'](k))
      throw new Error('The key already exists.');
    
    cache.set(k, w);
  }

  /**
   * 取出一个Worker对象
   *
   * @Author   Wolf
   * @DateTime 2020-09-18T22:02:54+0800
   * @param    {String}                 k 名称
   * @return   {Worker}                   Worker实例, 若不存在则返回undefined
   */
  static get (k) {
    return CacheAssistant['get']('list', WorkerAssistant)?.get(k);
  }

  /**
   * 实例化一个Worker对象.
   *
   * @Author   Wolf
   * @DateTime 2020-09-18T22:04:57+0800
   * @param    {String}                 k   worker名称
   * @param    {String}                 url 在worker中执行的脚本url
   * @param    {Boolean}                add 创建成功后是否添加到缓存中
   * @return   {Worker}                     成功返回一个Worker对象
   */
  static create (k, url, add = false) {
    let worker, cache;
    if (!(cache = CacheAssistant['get']('list', WorkerAssistant)))
      CacheAssistant['set']('list', cache = new Map, WorkerAssistant);
    try {
      worker = new Worker(url);
      cache.set(k, worker);
      if (add) WorkerAssistant.add(k, worker);
    } catch (e) {
      throw e;
    }
    return worker;
  }

  /**
   * 关闭一个worker
   *
   * @Author   Wolf
   * @DateTime 2020-09-21T22:56:31+0800
   * @param    {Mixed}                  worker 一个worker对象或是一个名称
   */
  static close (worker) {
    let key, cache;
    
    cache = CacheAssistant['get']('list', WorkerAssistant);

    if (!(worker instanceof Worker)) {
      key = worker;
      worker = WorkerAssistant['get'](worker);
    } else {
      for (let keys = cache.keys(); !keys.done; keys = keys.next()) {
        if (keys.value === worker) {
          key = keys.value;
          break;
        }
      }
    }

    if (worker) {
      worker.terminate();
      cache.delete(key);
    }
  }

  /**
   * 关闭所有Worker
   *
   * @Author    wolf
   * @Datetime  2020-12-23T23:41:17+0800
   */
  static closeAll () {
    let cache = CacheAssistant['get']('list', WorkerAssistant);
    if (cache) cache.forEach((v, k) => {
      v.terminate();
      cache.delete(k);
    });
  }

  /**
   * 监听一个worker进程
   * 该方法通过on属性进行监听, 如果想对同一个worker添加多个监听事件请使用addListener方法.
   *
   * @Author   Wolf
   * @DateTime 2020-09-18T22:11:29+0800
   * @param    {Mixed}                  worker   若不是worker对象则需要进一步查找
   * @param    {Function}               callback 事件触发执行的回调
   * @return   {Promise}                         Promise对象
   */
  static listener (worker, callback = undefined) {
    let promise;

    if (!(worker instanceof Worker)) {
      worker = WorkerAssistant['get'](worker)
      if (worker === undefined)
        throw Error('Worker not found.');
    }

    if (callback) {
      worker.onmessage = callback;
    } else {
      promise = new Promise((resolve, reject) => {
        worker.onmessageerror = reject;
        worker.onmessage = resolve;
      });
    }

    return promise;
  }

  /**
   * 监听一个worker进程
   * 该方法可以对同一个worker对象添加多次监听事件, 若只想监听一次请使用listener方法.
   *
   * @Author   Wolf
   * @DateTime 2020-09-18T22:11:29+0800
   * @param    {Mixed}                  worker   若不是worker对象则需要进一步查找
   * @param    {Function}               callback 事件触发执行的回调
   * @return   {Promise}                         Promise对象
   */
  static addListener (worker, callback = undefined) {
    let promise;
    
    if (!(worker instanceof Worker)) {
      worker = WorkerAssistant['get'](worker)
      if (worker === undefined)
        throw Error('Worker not found.');
    }

    if (callback) {
      worker.addEventListener('message', callback);
    } else {
      promise = new Promise((resolve, reject) => {
        worker.addEventListener('messageerror', reject);
        worker.addEventListener('message', resolve);
      });
    }

    return promise;
  }

}

Object.defineProperty(ModalLayer['_assistant'], 'worker', {value: WorkerAssistant});
