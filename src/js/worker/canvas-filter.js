/*
* @Author:             wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-19 00:52:59
* @Description         专门用于处理画布图像层画布滤镜worker代码
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-25 00:40:30
*/

// TODO 如果数据比较大需要更多Worker并行执行.
if (window.Worker) {
  ModalLayer['_worker'].set('canvasFilter', function () {

    /**
     * 图像灰度化
     *
     * @Author   Wolf
     * @DateTime 2020-09-21T22:33:51+0800
     * @param    {Object}                 args 
     * @return   {Uint8ClampedArray}           处理完毕的像素
     */
    function gray (args) {
      let pixels, nPixels;
      let r, g, b, a, gray;

      pixels = new Uint8ClampedArray(args['buffer']);
      nPixels = new Uint8ClampedArray(pixels.length);

      for (let i = 0; i < pixels.length; i += 4) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
        a = pixels[i + 3];
        gray = (r * 0.299) + (g * 0.587) + (b * 0.114);

        nPixels[i] = gray;
        nPixels[i + 1] = gray;
        nPixels[i + 2] = gray;
        nPixels[i + 3] = a;
      }  

      return nPixels;
    }

    /**
     * [mirror description]
     *
     * @Author   Wolf
     * @DateTime 2020-09-21T22:34:47+0800
     * @param    {Object}                 args
     * @return   {Uint8ClampedArray}           处理完毕的像素
     */
    function mirror (args) {
      let imgX, imgY;
      let currIndex, mirrIndex;
      let r, g, b, axis, width, height, pixels, nPixels;

      axis = args['axis'];
      [width, height] = args['size'];
      pixels = new Uint8ClampedArray(args['buffer']);
      nPixels = new Uint8ClampedArray(pixels.length);

      for (imgY = 0; imgY < height; imgY++) {
        for (imgX = 0; imgX < width; imgX++) {
          currIndex = (imgY * width + imgX) * 4;
          if (axis == 0)
            mirrIndex = (imgY * width + width - imgX) * 4
          else if (axis == 1)
            mirrIndex = ((height - imgY) * width + imgX) * 4
          else
            throw new Error('not give axis');
          
          nPixels[currIndex] = pixels[mirrIndex];
          nPixels[currIndex + 1] = pixels[mirrIndex + 1];
          nPixels[currIndex + 2] = pixels[mirrIndex + 2];
          nPixels[currIndex + 3] = pixels[mirrIndex + 3];
          nPixels[mirrIndex] = pixels[currIndex];
          nPixels[mirrIndex + 1] = pixels[currIndex + 1];
          nPixels[mirrIndex + 2] = pixels[currIndex + 2];
          nPixels[mirrIndex + 3] = pixels[currIndex + 3];
        }
      }

      return nPixels;
  }

    /**
     * 返回经过高斯模糊处理后的像素.
     *
     * @Author   Wolf
     * @DateTime 2020-09-19T01:59:46+0800
     * @param    {Object}                 args 
     * @return   {Uint8ClampedArray}           处理完毕的像素                
     */
    function blur (args) {
      let width, height;
      let pixels, nPixels;
      let sigma, radius, divisor, gaussianMask;
      let r, g, b, imgX, imgY, maskIdx, currIdx, tempIdx, pixelIdx;

      sigma = args['sigma'];
      radius = args['radius'];
      [width, height] = args['size'];
      gaussianMask = args['gaussianMask'];
      pixels = new Uint8ClampedArray(args['buffer']);
      nPixels = new Uint8ClampedArray(pixels.length);

      // X轴处理
      for (imgY = 0; imgY < height; imgY++) {
        for (imgX = 0; imgX < width; imgX++) {
          // 一维运算时可以除以累加权值解决高斯运算不足的问题(原理不清楚)
          divisor = 0;
          // 初始化rgb;
          r = g = b = 0;
          pixelIdx = (imgY * width + imgX) * 4;
          for (let i = -radius; i <= radius; i++) {
            tempIdx = imgX + i;
            maskIdx = i + radius;
            // 确保当前索引没有超出每一列长度范围
            if (tempIdx >= 0 && tempIdx < width) {
              currIdx = (imgY * width + tempIdx) * 4;
              r += pixels[currIdx] * gaussianMask[maskIdx];
              g += pixels[currIdx + 1] * gaussianMask[maskIdx];
              b += pixels[currIdx + 2] * gaussianMask[maskIdx];
              divisor += gaussianMask[maskIdx];
            }
          }
          nPixels[pixelIdx] = r / divisor;
          nPixels[pixelIdx + 1] = g / divisor;
          nPixels[pixelIdx + 2] = b / divisor;
          nPixels[pixelIdx + 3] = pixels[pixelIdx + 3];
        }
      }

      // Y轴处理
      for (imgX = 0; imgX < width; imgX++) {
        for (imgY = 0; imgY < height; imgY++) {
          // 一维运算时可以除以累加权值解决高斯运算不足的问题(原理不清楚)
          divisor = 0;
          // 初始化rgb;
          r = g = b = 0;
          pixelIdx = (imgY * width + imgX) * 4;
          for (let i = -radius; i <= radius; i++) {
            tempIdx = imgY + i;
            maskIdx = i + radius;
            // 确保当前索引没有超出每一行长度范围
            if (tempIdx >= 0 && tempIdx < height) {
              currIdx = (tempIdx * width + imgX) * 4;
              r += nPixels[currIdx] * gaussianMask[maskIdx];
              g += nPixels[currIdx + 1] * gaussianMask[maskIdx];
              b += nPixels[currIdx + 2] * gaussianMask[maskIdx];
              divisor += gaussianMask[maskIdx];
            }
          }
          nPixels[pixelIdx] = r / divisor;
          nPixels[pixelIdx + 1] = g / divisor;
          nPixels[pixelIdx + 2] = b / divisor;
        }
      }
      return nPixels;
    }

    /**
     * 从主线程接受消息成功
     *
     * @Author   Wolf
     * @DateTime 2020-09-19T00:55:33+0800
     * @param    {Event}                  event MessageEvent
     */
    this.onmessage = function (event) {
      let pixels;

      pixels = event['data']['type']?.(event['data']);

      this.postMessage({
        'error': 0,
        'buffer': pixels ? pixels['buffer'] : undefined
      }, [pixels['buffer']]);
    }


    /**
     * 从主线程接受消息失败
     *
     * @Author   Wolf
     * @DateTime 2020-09-19T00:54:20+0800
     * @param    {Event}                  event MessageEvent
     */
    this.onmessageerror = function (event) {
      this.postMessage({
        'error': 1,
        'message': 'Failed to send message.'
      });
    }
  });
}