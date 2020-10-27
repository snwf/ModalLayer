/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-28 01:07:24
* @Description         存储库助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-28 01:24:37
*/

class StorageAssistant {
  /**
   * 存储库实现
   *
   * @type  {Object}
   */
  static _achieve = Object.create(null);

  /**
   * 获取一个存储库实例
   *
   * @Author    wolf
   * @Datetime  2020-10-28T01:11:59+0800
   * @param     {String}                  type   存储库类型
   * @param     {Array}                   param  实例化需要的参数
   * @return    {StorageAbstract}                实例化存储库封装对象
   */
  static getStorage (type, param = []) {
    if (!StorageAssistant['_achieve'][type])
      throw Error(`The specified storage ${type} was not found.`);
    return new StorageAssistant['_achieve'][type](...param);
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'storage', {value: StorageAssistant});
