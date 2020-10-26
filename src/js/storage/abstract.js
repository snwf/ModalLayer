/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-27 21:25:23
* @Description         Storage基础类
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-27 21:53:58
*/

class StorageAbstract {
  /**
   * 存储库的类型
   *
   * @type  {String}
   */
  _type = null;

  /**
   * 存储记录
   *
   * @type  {Array}
   */
  _record = null;

  /**
   * 存储库实例
   *
   * @type  {Object}
   */
  _storage = null;

  /**
   * 查询存储库是否存在对应键
   *
   * @Author    wolf
   * @Datetime  2020-10-27T21:36:57+0800
   * @param     {Mixed}                  k  键
   *
   * @return    {Boolean}
   */
  has (k) {}

  /**
   * 获取存储库内对应键的值
   *
   * @Author    wolf
   * @Datetime  2020-10-27T21:37:50+0800
   * @param     {Mixed}                  k  键
   * @return    {Mixed}                     若没找到则返回false
   */
  get (k) {}

  /**
   * 设置一个键值对
   *
   * @Author    wolf
   * @Datetime  2020-10-27T21:39:30+0800
   * @param     {Mixed}                  k  键
   * @param     {Mixed}                  v  值
   */
  set (k, v = null) {}

  /**
   * 删除存储库内某个键所对应的值
   * 只会删除由该类设置的键值对, 若想不受约束的删除, 请设置参数 f = true
   *
   * @Author    wolf
   * @Datetime  2020-10-27T21:40:51+0800
   * @param     {Mixed}                  k  键
   * @param     {Boolean}                 f  是否强制删除
   * @return    {Boolean}
   */
  del (k, f = false) {}

  /**
   * 删除由该类设置的所有键值对
   *
   * @Author    wolf
   * @Datetime  2020-10-27T21:44:36+0800
   * @return    {Boolean}
   */
  clear () {}
}
