/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-02 00:02:01
* @Description         
*
* @Last Modified by:   Wolf
* @Last Modified time: 2020-09-16 17:26:30
*/

class FileAssistant {
  /**
   * 获取文件的二进制数据
   *
   * @Author   wolf
   * @DateTime 2020-05-24T02:06:31+0800
   * @param    {String}                 url 文件链接
   * @return   {Fetch}                      Fetch对象
   */
  static getFileBinary (url) {
    return fetch (url, {
      mode: 'cors',
      method: 'get',
      cache: 'no-cache',
      redirect: 'follow',
      referrer: 'no-referrer',
      credentials: 'same-origin',
      headers: {'content-type': 'text/plain'}
    });
  }

  /**
   * 获取文件的blob数据
   *
   * @Author   wolf
   * @DateTime 2020-05-25T22:42:07+0800
   * @param    {Mixed}                  mixed 数据
   * @return   {Promise}                      Promise对象
   */
  static getFileBlob (mixed) {
    let blob = null;

    if (mixed instanceof Blob)
      blob = Promise.resolve(mixed);
    else if (mixed instanceof Image || (mixed instanceof Element && mixed.nodeName === 'IMAGE'))
      blob = this.getFileBinary(mixed.src).then(response => response.blob());
    else if (typeof mixed === 'string' || mixed instanceof String)
      blob = this.getFileBinary(mixed).then(response => response.blob());
    else
      blob = Promise.reject(false);

    return blob;
  }

  /**
   * 获取图片地址
   * 未能获取返回false
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T00:05:10+0800
   * @param    {Mixed}                 mixed 有可能获取图片地址的对象
   * @return   {String}                      图片url
   */
  static getImage (mixed) {
    let image = null;

    // 当传入对象为字符串时
    if (typeof mixed === 'string' || mixed instanceof String) {
      image = mixed;

    // 当传入的的对象为Image标签或对象时.
    } else if (mixed instanceof Image || (mixed instanceof Element && mixed.nodeName === 'IMAGE')) {
      image = mixed.src;

    // 当传入对象为Blob、File、MediaSource时.
    } else if (mixed instanceof Blob || mixed instanceof MediaSource) {
      image = URL.createObjectURL(mixed);
    } else {
      image = false;
    }
    
    return image;
  }


  /**
   * 图片加载完毕后获取尺寸
   *
   * @Author   Wolf
   * @DateTime 2020-09-02T00:07:30+0800
   * @param    {String}                 url 图片url
   * @return   {Promise}                    Promise对象
   */
  static getImageSize (url) {
    let i = new Image();
    let p = new Promise((resolve, reject) => {
      i.onload = () => {
        resolve([i.width, i.height]);
      }
      i.onerror = () => {
        reject(false);
      }
    });
    i.src = url;
    return p;
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'file', {value: FileAssistant});