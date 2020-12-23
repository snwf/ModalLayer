/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-05 01:59:42
* @Description         画布滤镜助手
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-23 22:51:20
*/

class CanvasFilterAssistant {
  /**
   * 解析图像获取图像数据
   *
   * @Author   wolf
   *
   * @DateTime 2020-07-25T02:48:17+0800
   *
   * @param    {Mixed}                 image 图片[Image, ImageData]
   *
   * @return   {ImageData}                   图像数据
   */
  static getImagedata (image) {
    let cas, ctx, result;

    if (image instanceof Image) {
      cas = document.createElement('canvas');
      ctx = cas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      result = ctx.getImageData(0, 0, cas.width, cas.height);
    } else if (image instanceof ImageData) {
      result = image;
    } else {
      throw new Error('can not parse image');
    }

    return result;
  }

  /**
   * 高斯掩码缓存
   *
   * @type {Object}
   */
  static __gaussianMask = {};

  /**
   * 返回灰度化后的图像数据
   *
   * @Author   wolf
   *
   * @DateTime 2020-07-25T03:22:19+0800
   *
   * @param    {Mixed}                  image     图片[Image, ImageData]
   *
   * @return   {ImageData}                        处理后的ImageData
   */
  static grayscale (image) {
    let r, g, b, a, gray, pixelSize, imageData, newImgData;

    try {
      // 获取图像数据;
      imageData = CanvasFilterAssistant['getImagedata'](image);
      pixelSize = imageData.width * imageData.height * 4;

      newImgData = new Uint8ClampedArray(imageData.data.length);

      for (let i = 0; i < pixelSize; i += 4) {
        r = imageData.data[i];
        g = imageData.data[i + 1];
        b = imageData.data[i + 2];
        a = imageData.data[i + 3];
        gray = (r * 0.299) + (g * 0.587) + (b * 0.114);

        newImgData[i] = gray;
        newImgData[i + 1] = gray;
        newImgData[i + 2] = gray;
        newImgData[i + 3] = a;
      }

    } catch (e) {
      throw e;
    }

    return new ImageData(newImgData, imageData.width, imageData.height);
  }

  /**
   * 返回经过高斯模糊处理后的图像数据.
   *
   * @Author   wolf
   *
   * @DateTime 2020-07-24T22:42:04+0800
   *
   * @param    {Mixed}                  image     图片[Image, ImageData]
   * @param    {Number}                 radius    模糊半径
   * @param    {Number}                 sigma     西格玛值
   *
   * @return   {ImageData}                        处理后的ImageData
   */
  static gaussianBlur (image, radius = 3, sigma = 1) {
    let width, height;
    let divisor, imageData, newImgData, gaussianMask, gaussianMaskMap;
    let r, g, b, imgX, imgY, maskIndex, currIndex, tempIndex, imgDataIndex;

    try {
      // 获取图像数据;
      imageData = CanvasFilterAssistant['getImagedata'](image);
      width = imageData.width;
      height = imageData.height;

      // 根据半径计算高斯掩码
      divisor = 0;
      if (!(gaussianMaskMap = CacheAssistant['get']('gaussianMask', CanvasFilterAssistant))) {
        gaussianMaskMap = new Map;
        CacheAssistant['set']('gaussianMask', gaussianMaskMap, CanvasFilterAssistant);
      }

      if (!(gaussianMask = gaussianMaskMap.get(`${radius},${sigma}`))) {
        gaussianMask = [];
        for (maskIndex = -radius; maskIndex <= radius; maskIndex++) {
          let distribution = FormulaAssistant['getDistribution'](maskIndex, sigma, 1);
          gaussianMask.push(distribution);
          divisor += distribution;
        }
        
        // 归一化处理
        for (let i = 0; i < gaussianMask.length; i++)
          gaussianMask[i] /= divisor;

        gaussianMaskMap.set(`${radius},${sigma}`, gaussianMask);
      }

      // 初始化newImgData
      newImgData = new Uint8ClampedArray(imageData.data.length);

      // X轴处理
      for (imgY = 0; imgY < height; imgY++) {
        for (imgX = 0; imgX < width; imgX++) {
          // 一维运算时可以除以累加权值解决高斯运算不足的问题(原理不清楚)
          divisor = 0;
          // 初始化rgb;
          r = g = b = 0;
          imgDataIndex = (imgY * width + imgX) * 4;
          for (let i = -radius; i <= radius; i++) {
            tempIndex = imgX + i;
            maskIndex = i + radius;
            // 确保当前索引没有超出每一列长度范围
            if (tempIndex >= 0 && tempIndex < width) {
              currIndex = (imgY * width + tempIndex) * 4;
              r += imageData.data[currIndex] * gaussianMask[maskIndex];
              g += imageData.data[currIndex + 1] * gaussianMask[maskIndex];
              b += imageData.data[currIndex + 2] * gaussianMask[maskIndex];
              divisor += gaussianMask[maskIndex];
            }
          }
          newImgData[imgDataIndex] = r / divisor;
          newImgData[imgDataIndex + 1] = g / divisor;
          newImgData[imgDataIndex + 2] = b / divisor;
          newImgData[imgDataIndex + 3] = imageData.data[imgDataIndex + 3];
        }
      }

      // Y轴处理
      for (imgX = 0; imgX < width; imgX++) {
        for (imgY = 0; imgY < height; imgY++) {
          // 一维运算时可以除以累加权值解决高斯运算不足的问题(原理不清楚)
          divisor = 0;
          // 初始化rgb;
          r = g = b = 0;
          imgDataIndex = (imgY * width + imgX) * 4;
          for (let i = -radius; i <= radius; i++) {
            tempIndex = imgY + i;
            maskIndex = i + radius;
            // 确保当前索引没有超出每一行长度范围
            if (tempIndex >= 0 && tempIndex < height) {
              currIndex = (tempIndex * width + imgX) * 4;
              r += newImgData[currIndex] * gaussianMask[maskIndex];
              g += newImgData[currIndex + 1] * gaussianMask[maskIndex];
              b += newImgData[currIndex + 2] * gaussianMask[maskIndex];
              divisor += gaussianMask[maskIndex];
            }
          }
          newImgData[imgDataIndex] = r / divisor;
          newImgData[imgDataIndex + 1] = g / divisor;
          newImgData[imgDataIndex + 2] = b / divisor;
        }
      }
    } catch(e) {
      throw e;
    }

    return new ImageData(newImgData, width, height);
  }

  /**
   * 返回镜像后的图像数据
   *
   * @Author   wolf
   *
   * @DateTime 2020-07-25T02:46:44+0800
   *
   * @param    {Mixed}                  image 图片[Image, ImageData]
   * @param    {Number}                 axis  中心轴[0: x, 1: y]
   *
   * @return   {ImageData}                    处理后的图像数据
   */
  static mirror (image, axis = 1) {
    let imgX, imgY;
    let currIndex, mirrIndex;
    let r, g, b, width, height, imageData, newImgData;

    try {
      // 获取图像数据
      imageData = CanvasFilterAssistant['getImagedata'](image)
      width = imageData.width;
      height = imageData.height;

      // 初始化新的图像数据
      newImgData = new Uint8ClampedArray(imageData.data.length);

      for (imgY = 0; imgY < height; imgY++) {
        for (imgX = 0; imgX < width; imgX++) {
          currIndex = (imgY * width + imgX) * 4;
          if (axis == 0)
            mirrIndex = (imgY * width + width - imgX) * 4
          else if (axis == 1)
            mirrIndex = ((height - imgY) * width + imgX) * 4
          else
            throw new Error('not give axis');
          
          newImgData[currIndex] = imageData.data[mirrIndex];
          newImgData[currIndex + 1] = imageData.data[mirrIndex + 1];
          newImgData[currIndex + 2] = imageData.data[mirrIndex + 2];
          newImgData[currIndex + 3] = imageData.data[mirrIndex + 3];
          newImgData[mirrIndex] = imageData.data[currIndex];
          newImgData[mirrIndex + 1] = imageData.data[currIndex + 1];
          newImgData[mirrIndex + 2] = imageData.data[currIndex + 2];
          newImgData[mirrIndex + 3] = imageData.data[currIndex + 3];
        }
      }

    } catch (e) {
      throw e;
    }

    return new ImageData(newImgData, width, height);
  }
}

Object.defineProperty(ModalLayer['_assistant'], 'canvasFilter', {value: CanvasFilterAssistant});
