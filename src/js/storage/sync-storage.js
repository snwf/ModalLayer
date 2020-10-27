/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-10-27 21:47:35
* @Description         sessionStorage与localStorage封装类
*                      Storage对象只能存储字符串类型的键值对,
*                      若想存储对象请先将其进行序列化再存储.
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-10-28 01:28:14
*/

class SyncStorage extends StorageAbstract {
  constructor (type = ModalLayer['_enum']['BROWSER_STORAGE']['SESSIONSTORAGE']) {
    if (!window[type])
      throw Error(`The current browser does not support ${type} function`);
    super();
    this['_record'] = [];
    this['_type'] = type;
    this['_storage'] = window[type];
  }

  has (k) {
    return this['_storage'].getItem(k) !== null ? true : false;
  }

  get (k) {
    return this['_storage'].getItem(k) ?? false;
  }

  set (k, v = '') {
    this['_storage'].setItem(k, v);
    this['_record'].push(k);
    return true;
  }

  del (k, f = false) {
    let recordIndex = this['_record'].indexOf(k);
    if (!f && recordIndex < 0) return false;
    if (recordIndex >= 0) this['_record'].splice(recordIndex, 1);
    this['_storage'].removeItem(k);
    return true;
  }

  clear () {
    while (this['_record'].length > 0)
      this['_storage'].removeItem(this['_record'].shift());
    return true;
  }
}

if (StorageAssistant) {
  Object.defineProperty(StorageAssistant['_achieve'], ModalLayer['_enum']['BROWSER_STORAGE']['LOCALSTORAGE'], {value: SyncStorage});
  Object.defineProperty(StorageAssistant['_achieve'], ModalLayer['_enum']['BROWSER_STORAGE']['SESSIONSTORAGE'], {value: SyncStorage});
}
