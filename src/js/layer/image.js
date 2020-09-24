/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-04 00:13:10
* @Description         
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-09-25 01:06:46
*/

class ImageLayer extends ModalLayer {
  /**
   * 初始化配置
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T00:14:24+0800
   * @param    {Object}                 options 配置
   */
  initOption (options) {
    let base, wSize;

    // 初始化公共配置
    super.initOption(options);

    // 初始化图片层独有的配置
    this['option']['layer'] = ModalLayer['_assistant']['object']['merge'](this['option']['layer'], ModalLayer['_option']['image']);

    // 计算最大/最小尺寸
    wSize = [window.innerWidth, window.innerHeight];
    Object.values(this['option']['layer']['sizeRange']).forEach(v => {
      v.forEach((size, i) => {
        if (('' + size).endsWith('%'))
          base = 100;
        else if (('' + size).endsWith('‰'))
          base = 1000;
        else if (('' + size).includes('0.'))
          base = 1;
        else
          return size;

        v[i] = wSize[i] * window.parseFloat(size) / base;
      });
    })

    if (this['option']['layer']['sizeRange']['min'][0] > this['option']['layer']['sizeRange']['max'][0])
      this['option']['layer']['sizeRange']['min'][0] = this['option']['layer']['sizeRange']['max'][0];
    if (this['option']['layer']['sizeRange']['min'][1] > this['option']['layer']['sizeRange']['max'][1])
      this['option']['layer']['sizeRange']['min'][1] = this['option']['layer']['sizeRange']['max'][1];

    // 一级工具栏
    Object.keys(this['option']['layer']['toolbar']['config']).forEach((key, val) => {
      val = this['option']['layer']['toolbar']['config'][key];
      if (typeof val == 'boolean')
        this['option']['layer']['toolbar']['config'][key] = {
          'enable': val,
          'title': ModalLayer['_option']['image']['toolbar']['config'][key]['title'],
          'icon': ModalLayer['_option']['image']['toolbar']['config'][key]['icon']
        }
      // 二级工具栏
      if (ModalLayer['_assistant']['object']['isOnlyObject'](val['config'])) {
        Object.keys(val['config']).forEach((k, v) => {
          v = val['config'][k];
          if (typeof v == 'boolean')
            this['option']['layer']['toolbar']['config'][key]['config'][k] = {
              'enable': v,
              'title': ModalLayer['_option']['image']['toolbar']['config'][key]['config'][k]['title'],
              'icon': ModalLayer['_option']['image']['toolbar']['config'][key]['config'][k]['icon']
            }
        })
      } else if (ModalLayer['_option']['image']['toolbar']['config'][key]['config']) {
        this['option']['layer']['toolbar']['config'][key]['config'] = JSON.parse(JSON.stringify(ModalLayer['_option']['image']['toolbar']['config'][key]['config']));
      }
    });
  }

  /**
   * 配置兼容性处理
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:14:23+0800
   */
  compatibleOption (options) {
    let imageList;
    let base, wSize;
    let filterConfig, toolbarConfig;

    super.compatibleOption(options);

    imageList = ModalLayer['_assistant']['object'].get(options, 'layer.image');
    if (imageList instanceof FileList)
      options['layer']['image'] = Object.values(imageList);
    if (!Array.isArray(options['layer']['image']))
      options['layer']['image'] = [options['layer']['image']];

    toolbarConfig = ModalLayer['_assistant']['object'].get(options, 'layer.toolbar.config') ?? [];
    Object.keys(toolbarConfig).forEach(k => {
      toolbarConfig[k] = typeof toolbarConfig[k] === 'boolean' ? {enable: toolbarConfig[k]} : toolbarConfig[k];
    });

    filterConfig = ModalLayer['_assistant']['object'].get(options, 'layer.toolbar.config.filter.config') ?? [];
    Object.keys(filterConfig).forEach(k => {
      filterConfig[k] = typeof filterConfig[k] === 'boolean' ? {enable: filterConfig[k]} : filterConfig[k];
    });

  }

  /**
   * 配置联动
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T14:22:02+0800
   */
  linkageOption () {
    let filterEnable, toolbarEnable;
    let filterEntries, toolbarEntries;

    super.linkageOption();

    toolbarEnable = filterEnable = false;
    toolbarEntries = Object.entries(this['option']['layer']['toolbar']['config']);
    filterEntries = Object.entries(this['option']['layer']['toolbar']['config']['filter']['config']);

    // filter工具校验
    for (let i = 0; i < filterEntries.length; i++) {
      if (filterEntries[i][1]['enable'] === true) {
        filterEnable = true;
        break;
      }
    }
    this['option']['layer']['toolbar']['config']['filter']['enable'] = filterEnable;

    // 工具栏配置校验
    for (let i = 0; i < toolbarEntries.length; i++) {
      if (toolbarEntries[i][1]['enable'] === true) {
        toolbarEnable = true;
        break;
      }
    }
    this['option']['layer']['toolbar']['enable'] = toolbarEnable;

  }


  /**
   * 检查配置
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T00:36:26+0800
   */
  checkOption () {
    super.checkOption();

    if (ModalLayer['_assistant']['object']['isEmpty'](this['option']['layer']['image']))
      throw new Error('layer.image can not be empty!');

    if (this['option']['layer']['size'] && !Array.isArray(this['option']['layer']['size']))
      throw new Error('layer.size does not meet expectations.');

    if (
      !this['option']['layer']['size'] && 
      (
        window.isNaN(parseInt(this['option']['layer']['sizeRange']['min'][0])) ||
        window.isNaN(parseInt(this['option']['layer']['sizeRange']['min'][1])) ||
        window.isNaN(parseInt(this['option']['layer']['sizeRange']['max'][0])) ||
        window.isNaN(parseInt(this['option']['layer']['sizeRange']['max'][1]))
      )
    )
      throw new Error('layer.sizeRange does not meet expectations.');
  }

  /**
   * 初始化变量
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T12:25:37+0800
   */
  initVariable () {
    super.initVariable();

    // 获取图片Blob内容
    this['variable']['image'] = {
      'spin': {
        'scale': 1,
        'angle': 90
      },
      'default': {
        'size': null,
        'imageData': null
      },
      'reload': 0,
      'link': null,
      'history': [],
      'finish': null, // 保存一个图片加载完成的Promise对象
      'status': ModalLayer['_enum']['LOAD_STATUS']['LOADING']
    };
  }

  /**
   * 初始化结构
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T12:27:13+0800
   */
  initStruct () {
    let action, actionButton;
    let tools, toolbar, toolChild, contentImage;
    let title, content, resize, progress, container;

    super.initStruct();

    container = this['variable']['struct']['_build']['container'];
    title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
    action = this['variable']['struct']['_backup']['action'] = ModalLayer['_struct']['action'];
    toolbar = this['variable']['struct']['_backup']['toolbar'] = ModalLayer['_struct']['toolbar'];
    tools = this['variable']['struct']['_backup']['tools'] = ModalLayer['_struct']['image_tools'];
    content = this['variable']['struct']['_backup']['content'] = ModalLayer['_struct']['content'];
    actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];
    contentImage = this['variable']['struct']['_backup']['content_image'] = ModalLayer['_struct']['content_image'];
    toolChild = this['variable']['struct']['_backup']['image_tools_child'] = ModalLayer['_struct']['image_tools_child'];

    action.innerHTML.push(actionButton['close']);

    title.innerHTML.push(action);

    if (this['option']['title'] !== false)
      container.innerHTML.push(title);

    // 工具
    Object.keys(this['option']['layer']['toolbar']['config']).forEach(k => {
      if (this['option']['layer']['toolbar']['config'][k]['enable'])
        toolbar.innerHTML.push(tools[k]);
      if (this['option']['layer']['toolbar']['config'][k]['config'] instanceof Object && this['option']['layer']['toolbar']['config'][k]['enable']) {
        Object.keys(this['option']['layer']['toolbar']['config'][k]['config']).forEach(key => {
            tools[k].innerHTML[1].innerHTML.push(toolChild[k][key]);
        });
      }
    });

    // 工具栏
    if (this['option']['layer']['toolbar']['enable'])
      container.innerHTML.push(toolbar);

    content.innerHTML.push(contentImage);

    container.innerHTML.push(content);
    
    if (this['option']['resize']['enable']) {
      resize = this['variable']['struct']['_backup']['resize_box'] = ModalLayer['_struct']['resize_box'];
      container.innerHTML.push(resize);
    }
    
    if (this['option']['progress']['enable']) {
      progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
      container.innerHTML.push(progress);
    }
  }

  /**
   * 初始化节点
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T13:35:44+0800
   */
  initNode () {
    let container, toolbar;

    super.initNode();

    container = this['variable']['nodes']['container'];
    toolbar = container.querySelector('.modal-layer-toolbar');

    // 工具栏工具图标\描述设置
    if (this['option']['layer']['toolbar']['enable']) {
      Object.keys(this['option']['layer']['toolbar']['config']).forEach((k, v) => {
        v = this['option']['layer']['toolbar']['config'][k];
        if (v['enable']) {
          let itemNode, itemIconNode;
          
          itemNode = toolbar.querySelector('.modal-layer-toolbar-item[tool-type="' + k + '"]');
          itemIconNode = itemNode.querySelector('.modal-layer-toolbar-item-icon');

          itemNode.setAttribute('title', v['title']);
          itemIconNode.classList.add(...v['icon'].split(' '));

          if (v['config'] instanceof Object) {
            Object.entries(v['config']).forEach((val, key) => {
              key = val[0];
              val = val[1];
              if (val['enable']) {
                let childNode, childIconNode;

                childNode = itemNode.querySelector('.modal-layer-toolbar-item-child-list');
                childIconNode = itemNode.querySelector('.modal-layer-toolbar-' + k + '-icon[' + k + '-type="' + key + '"]');

                childNode.setAttribute('title', val['title']);
                if (val['icon'])
                  childIconNode.classList.add(val['icon']);
                else
                  childIconNode.innerText = val['textIcon'];
              }
            });
          }
        }
      });
    }

    this['load']()

    // 图片加载成功
    .then(img => this['loaded'](img))

    // 图片加载失败
    .catch(() => this['failed']());
  }

  /**
   * 绑定事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T15:46:52+0800
   */
  bindEvent () {
    let options;
    let container;
    let failedText;

    super.bindEvent();

    options = {
      'once': false,
      'capture': false,
      'passive': false,
      'mozSystemGroup': false
    };    

    container = this['variable']['nodes']['container'];
    failedText = ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['FAILED']);

    // 绑定重新加载事件
    this['variable']['eventSymbol']['imageReload'] = ModalLayer['_assistant']['event']['add'](container, 'click', '.modal-layer-image-canvas[load-status="' + failedText + '"]', this['reload'], this, null, options);

    // 绑定工具栏相关事件
    Object.keys(this['event']['imageTools']).forEach(k => {
      if (this['event']['imageTools'][k] && this['event']['imageTools'][k] instanceof Function)
        this['variable']['eventSymbol'][`imageTool${k}`] = ModalLayer['_assistant']['event']['add'](container, 'click', `.modal-layer-toolbar-item[tool-type="${k}"]`, this['event']['imageTools'][k], this, null, options);
        // ModalLayer['_assistant']['element']['eventTarget'](container, '.modal-layer-toolbar-item[tool-type="' + k + '"]', 'click', this['event']['imageTools'][k], this);
    });
  }

  /**
   * 重新调整模态层大小
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T22:44:59+0800
   */
  resize () {
    let defaultArea;
    let canvas, canvasRect;
    let container, contentNode;
    let toolbar, toolbarHeight, oriToolbarHeight;
    let totalHeight, contentComputedStyle, contentBeforeHeight, contentOffsetTop;

    container = this['variable']['nodes']['container'];
    contentNode = container.querySelector('.modal-layer-content');
    canvas = contentNode.querySelector('.modal-layer-image-canvas');
    canvasRect = canvas.getBoundingClientRect();
    toolbar = container.querySelector('.modal-layer-toolbar');
    oriToolbarHeight = toolbar.getBoundingClientRect().height;

    contentComputedStyle = window.getComputedStyle(contentNode, null);
    // Content之前的兄弟节点总共有多高
    contentBeforeHeight = ModalLayer['_assistant']['element']['getBeforeElementHeight'](contentNode);
    // Content距离上一个兄弟节点的上间距
    contentOffsetTop = contentNode.offsetTop - contentBeforeHeight;
    // Content距离Container有多少距离
    totalHeight = contentBeforeHeight + (this['option']['content']['fullContainer'] ? 0 : contentOffsetTop * 2);

    if (this['option']['layer']['size'])
      defaultArea = [...this['option']['layer']['size']];
    else {
      if (this['variable']['image']['status'] !== ModalLayer['_enum']['LOAD_STATUS']['LOADING'])
        defaultArea = [canvasRect.width, canvasRect.height];
      else
        defaultArea = [...this['option']['layer']['sizeRange']['min']];
    }

    defaultArea[0] += parseFloat(contentComputedStyle.marginLeft) + parseFloat(contentComputedStyle.marginRight);
    defaultArea[1] += totalHeight;

    container.style.width = defaultArea[0] + 'px';

    // 校准高度
    if (this['option']['layer']['toolbar']['enable']) {
      toolbarHeight = toolbar.getBoundingClientRect().height;
      defaultArea[1] = defaultArea[1] - oriToolbarHeight + toolbarHeight;
    }

    container.style.height = defaultArea[1] + 'px';

    // 记录初始化后的最小值
    this['variable']['defaultArea'] = defaultArea;

    // 判断是否允许超出屏幕, 若不允许且已经超出则需要进行纠正
    if (!this['option']['drag']['overflow'] && ModalLayer['_assistant']['element']['isOverflow'](container, this['option']['window']))
      container.style.cssText += 'margin-top: auto; margin-left: auto';
  }

  /**
   * 图片加载
   * 只加载一次
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T17:56:29+0800
   * @return   {Promise}                包含加载状态的Promise对象
   */
  load () {
    let cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');

    this['variable']['image']['status'] = ModalLayer['_enum']['LOAD_STATUS']['LOADING'];
    cas.setAttribute('load-status', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['LOADING']))

    // 弹出加载层
    if (this['variable']['image']['layer'] instanceof LoadingLayer)
      this['variable']['image']['layer']['show']();
    else
      this['variable']['image']['layer'] = ModalLayer['loading']({
        'mask': false,
        'popupTime': 0,
        'layer': {
          'icon': 1,
          'duration': 1,
          'color': 'deepskyblue'
        },
        'window': this['variable']['nodes']['container']
      }, e => {throw e;});

    return this['variable']['image']['finish'] = new Promise((resolve, reject) => {
      let node = new Image;

      while (!this['variable']['image']['link'] && this['variable']['image']['reload'] < this['option']['layer']['image'].length) {
        if (this['variable']['image']['link']?.startsWith('blob:'))
          URL.revokeObjectURL(this['variable']['image']['link']);
        this['variable']['image']['link'] = ModalLayer['_assistant']['file']['getImage'](this['option']['layer']['image'][this['variable']['image']['reload']++]);
      }
      // this['variable']['image']['link'] = ModalLayer['_assistant']['file']['getImage'](this['option']['layer']['image'][this['variable']['image']['reload']++]);

     // 绑定图片加载成功事件
      node['onload'] = () => resolve(node);

      // 绑定图片加载失败事件
      node['onerror'] = reject;

      // 将link设置到Image开始加载
      node.src = this['variable']['image']['link'];
    });
  }

  /**
   * 图片重新加载.
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T18:00:22+0800
   * @return   {Promise}                 一个包含加载状态的Promise对象
   */
  reload () {
    return this['load']()

    // 图片加载成功
    .then(img => this['loaded'](img))

    // 图片加载失败
    .catch(() => this['failed']())

    // 重绘图片层大小
    .then(() => this.resize());
  }

  /**
   * 图片加载成功
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T18:05:33+0800
   */
  loaded (img) {
    let cas, container;
    let priority, aspectRatio;

    container = this['variable']['nodes']['container'];
    cas = container.querySelector('.modal-layer-image-canvas');

    this['variable']['image']['status'] = ModalLayer['_enum']['LOAD_STATUS']['LOADED'];

    if (this['option']['layer']['size']) {
      this['variable']['image']['default']['size'] = this['option']['layer']['size'];
    } else {
      if (img.naturalWidth > this['option']['layer']['sizeRange']['max'][0] || img.naturalHeight > this['option']['layer']['sizeRange']['max'][1])
        this['variable']['image']['default']['size'] = ModalLayer['_assistant']['number']['getMaxLegalSize']([img.naturalWidth, img.naturalHeight], this['option']['layer']['sizeRange']['max']);
      else if (img.naturalWidth < this['option']['layer']['sizeRange']['min'][0] || img.naturalHeight < this['option']['layer']['sizeRange']['min'][1])
        this['variable']['image']['default']['size'] = ModalLayer['_assistant']['number']['getMinLegalSize']([img.naturalWidth, img.naturalHeight], this['option']['layer']['sizeRange']['min']);
      else
        this['variable']['image']['default']['size'] = [img.naturalWidth, img.naturalHeight];
    }

    cas.width = this['variable']['image']['default']['size'][0];
    cas.height = this['variable']['image']['default']['size'][1];

    this['variable']['image']['fadeAttr'] && cas.setAttribute(this['variable']['image']['fadeAttr'], 0);
    cas.setAttribute('load-status', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['LOADED']));

    window.requestAnimationFrame(() => {
      // 移除加载层
      if (this['variable']['image']['layer'] && this['variable']['image']['layer'] instanceof LoadingLayer)
        this['variable']['image']['layer']['hide']();

      cas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, ...this['variable']['image']['default']['size']);

      this['variable']['image']['default']['imageData'] = cas.getContext('2d').getImageData(0, 0, ...this['variable']['image']['default']['size']);
    });
  }

  /**
   * 当图片尝试所有备份后最终依然加载失败
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T18:02:24+0800
   */
  failed () {
    let fadeOption;
    let cas, container;

    container = this['variable']['nodes']['container'];
    cas = container.querySelector('.modal-layer-image-canvas');

    this['variable']['image']['status'] = ModalLayer['_enum']['LOAD_STATUS']['FAILED'];

    cas.setAttribute('load-status', ModalLayer['_assistant']['object']['getKeyByValue'](ModalLayer['_enum']['LOAD_STATUS'], ModalLayer['_enum']['LOAD_STATUS']['FAILED']));
    
    if (this['variable']['image']['reload'] < this['option']['layer']['image'].length)
      fadeOption = {
        size: 72,
        char: '!?',
        canvas: cas,
        sign: 'load-failed',
        speed: [25, 20, 20, 25],
        family: 'Microsoft YaHei',
        text: '图片加载失败, 请点击重试.',
        round: {
          radius: 50,
          lineWidth: 5,
          color: 'rgb(230, 230, 230)'
        }
      };
    else
      fadeOption = {
        size: 80,
        char: '×',
        canvas: cas,
        speed: 10,
        family: 'Microsoft YaHei',
        sign: 'finally-load-failed',
        text: '图片加载失败, 请联系管理员.',
        round: {
          radius: 50,
          lineWidth: 5,
          y: cas.height / 2 - 15,
          color: 'rgb(230, 230, 230)'
        }
      };

    this['variable']['image']['fadeAttr'] = ModalLayer['_assistant']['canvasAnimation']['fade'](fadeOption);

    // 销毁加载失败的图像并且将link置空
    if (this['variable']['image']['link']?.startsWith('blob:'))
      URL.revokeObjectURL(this['variable']['image']['link']);
    this['variable']['image']['link'] = null;

    // 移除加载层
    if (this['variable']['image']['layer'] instanceof LoadingLayer)
      this['variable']['image']['layer']['hide']();
  }

  /**
   * 移除模态层时释放事件
   *
   * @Author   Wolf
   * @DateTime 2020-09-04T22:51:31+0800
   */
  removeAllEvent () {
    let container = this['variable']['nodes']['container'];

    super.removeAllEvent();

    // 释放工具栏相关事件
    Object.keys(this['event']['imageTools']).forEach(k => {
      if (this['event']['imageTools'][k] && this['event']['imageTools'][k] instanceof Function)
        container.removeEventListener('click', this['event']['imageTools'][k]);
    });
  }

  /**
   * 裁剪
   *
   * @Author   Wolf
   * @DateTime 2020-09-05T01:12:31+0800
   */
  crop () {
    let cas;
    let newImgData;
    let raf, repaint;
    let cropImgPoint;
    let text, fontSize, cropTextPoint;
    let minWidth, minHeight, maxWidth, maxHeight;
    let mousedown, mousedownPoint, mousedownRect;
    let cropCas, cropCtx, cropVariable, cropCasStyle;
    let cropBoxLeft, cropBoxTop, cropBoxWidth, cropBoxHeight;
    let resizeX, resizeY, resizeBoxBorderSize, resizeBoxBorderHalfSize;
    let stopEvent, cropEvent, keyupEvent, mouseupEvent, mousedownEvent, mousemoveEvent, repaintCropWindowEvent;

    repaint = true;

    resizeBoxBorderSize = 10;
    resizeBoxBorderHalfSize = resizeBoxBorderSize / 2;

    fontSize = 22;
    text = '双击鼠标左键或按回车截取, ESC退出.';
    cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
    maxWidth = cas.width;
    maxHeight = cas.height;
    cropCas = cas.cloneNode();
    cropCtx = cropCas.getContext('2d');
    minWidth = window.Math.floor(maxWidth * 0.1);
    minHeight = window.Math.floor(maxHeight * 0.1);
    cropCasStyle = 'display: block; position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px; visibility: visible; opacity: 1; border: 0px; margin: 0px; z-index: ' + ModalLayer['_assistant']['element']['maxZIndex']() + ';';

    cropCas.width = window.innerWidth;
    cropCas.height = window.innerHeight;
    cropCas.style.cssText = cropCasStyle;

    cropImgPoint = [(cropCas.width - maxWidth) / 2, (cropCas.height - maxHeight) / 2];
    cropVariable = [0, 0, cas.width, cas.height, ...cropImgPoint, cas.width, cas.height];
    cropTextPoint = [cropImgPoint[0], (cropCas.height + maxHeight) / 2 + fontSize];

    repaintCropWindowEvent = () => {
      cropCtx.save();
      cropCtx.clearRect(0, 0, cropCas.width, cropCas.height);

      cropCtx.drawImage(cas, ...cropImgPoint);

      cropCtx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      cropCtx.fillRect(0, 0, cropCas.width, cropCas.height);

      cropCtx.fillStyle = 'white';
      cropCtx.font = fontSize + 'px serif';
      cropCtx.fillText(text, ...cropTextPoint);

      cropCtx.drawImage(cas, ...cropVariable);

      cropCtx.restore();

      if (repaint)
        raf = window.requestAnimationFrame(repaintCropWindowEvent);
      else
        window.cancelAnimationFrame(raf);
    }

    stopEvent = () => {
      document.removeEventListener('keyup', keyupEvent);

      cropCas.removeEventListener('mousemove', mousemoveEvent);
      cropCas.removeEventListener('mousedown', mousedownEvent);
      cropCas.removeEventListener('mouseup', mouseupEvent);
      // 移除截取事件
      cropCas.removeEventListener('dbclick', cropEvent);

      // 停止重绘截取画布
      repaint = false;

      // 移除截取用画布
      cropCas.remove();
    };

    cropEvent = e => {
      e = e ?? window.event;

      stopEvent();

      // 清理相关数据, 并将截取后图像绘制到原画布上.
      cas.width = cropVariable[2];
      cas.height = cropVariable[3];
      cas.getContext('2d').drawImage(cropCas, cropVariable[4], cropVariable[5], cas.width, cas.height, 0, 0, cas.width, cas.height);

      this.resize();
    };

    keyupEvent = kEvent => {
      switch (kEvent.code) {
        case 'Enter':
          cropEvent();
          kEvent.preventDefault();
          break;
        case 'Escape':
          stopEvent();
          kEvent.preventDefault();
          break;
        default:
          return;
      }
    };

    mouseupEvent = upEvent => {
      mousedown = false
      mousedownRect = null;
      mousedownPoint = null;
    };
    mousedownEvent = downEvent => {
      mousedownPoint = [downEvent.x, downEvent.y];
      mousedown = (resizeX || resizeY) ? true : false;
      mousedownRect = [cropVariable[4], cropVariable[5], cropVariable[2], cropVariable[3]];

      if (resizeX) {
        if (downEvent.x >= cropVariable[4] - resizeBoxBorderSize && downEvent.x <= cropVariable[4] + resizeBoxBorderSize)
          mousedownPoint[0] = cropVariable[4];
        else
          mousedownPoint[0] = cropVariable[2] + cropVariable[4];
      } else {
        mousedownPoint[0] = downEvent.x;
      }

      if (resizeY) {
        if (downEvent.y >= cropVariable[5] - resizeBoxBorderSize && downEvent.y <= cropVariable[5] + resizeBoxBorderSize)
          mousedownPoint[1] = cropVariable[5];
        else
          mousedownPoint[1] = cropVariable[3] + cropVariable[5];
      } else {
        mousedownPoint[1] = downEvent.y;        
      }
    };

    mousemoveEvent = moveEvent => {
      let mousePoint;
      let resizeEvent;
      let cropPoint, resizeRect, insideRect;

      moveEvent = moveEvent ?? window.event;
      mousePoint = [moveEvent.x, moveEvent.y];

      // 当允许调整截取区域大小时
      if (mousedown && moveEvent.buttons === 1) {
        let diffX, diffY;
        let cropX, cropY, cropWidth, cropHeight;

        if (resizeX) {
          diffX = mousedownPoint[0] - mousePoint[0];
          // 当按下鼠标时鼠标位于图像最左侧时.
          if (mousedownPoint[0] === mousedownRect[0]) {
            cropX = mousedownRect[0] - diffX;
            cropWidth = mousedownRect[2] + diffX;
            diffX = mousedownRect[0] - cropImgPoint[0] - diffX;

            if (cropWidth < minWidth)
              cropWidth = minWidth;
            else if (cropWidth > maxWidth)
              cropWidth = maxWidth;

            if (cropX < cropImgPoint[0]) {
              diffX = 0;
              cropX = cropImgPoint[0];
            } else if (cropX > cropImgPoint[0] + maxWidth - minWidth) {
              diffX = maxWidth - minWidth;
              cropX = cropImgPoint[0] + maxWidth - minWidth;
            }
            
            cropVariable[4] = cropX;
            cropVariable[0] = diffX;

            cropVariable[2] = cropVariable[6] = cropWidth;
          } else {
            cropWidth = mousedownRect[2] - diffX;
            if (cropWidth < minWidth)
              cropWidth = minWidth;
            else if (cropWidth > maxWidth)
              cropWidth = maxWidth;

            cropVariable[2] = cropVariable[6] = cropWidth;
          }
        }

        if (resizeY) {
          diffY = mousedownPoint[1] - mousePoint[1];
          // 当按下鼠标时鼠标位于图像上方时.
          if (mousedownPoint[1] === mousedownRect[1]) {
            cropY = mousedownRect[1] - diffY;
            cropHeight = mousedownRect[3] + diffY;
            diffY = mousedownRect[1] - cropImgPoint[1] - diffY;

            if (cropHeight < minHeight)
              cropHeight = minHeight;
            else if (cropHeight > maxHeight)
              cropHeight = maxHeight;

            if (cropY < cropImgPoint[1]) {
              diffY = 0;
              cropY = cropImgPoint[1];
            } else if (cropY > cropImgPoint[1] + maxHeight - minHeight) {
              diffY = maxHeight - minHeight;
              cropY = cropImgPoint[1] + maxHeight - minHeight;
            }
            
            cropVariable[5] = cropY;
            cropVariable[1] = diffY;

            cropVariable[3] = cropVariable[7] = cropHeight;
          } else {
            cropHeight = mousedownRect[3] - diffY;
            if (cropHeight < minHeight)
              cropHeight = minHeight;
            else if (cropHeight > maxHeight)
              cropHeight = maxHeight;

            cropVariable[3] = cropVariable[7] = cropHeight;
          }
        }
      } else {
        resizeX = resizeY = false;
        cropPoint = [cropVariable[4], cropVariable[5]];
        resizeRect = {
          'top': [
            [cropPoint[0] - resizeBoxBorderHalfSize, cropPoint[1] - resizeBoxBorderHalfSize],
            [cropPoint[0] + cropVariable[2] + resizeBoxBorderHalfSize, cropPoint[1] + resizeBoxBorderHalfSize]
          ],
          'left': [
            [cropPoint[0] - resizeBoxBorderHalfSize, cropPoint[1] - resizeBoxBorderHalfSize],
            [cropPoint[0] + resizeBoxBorderHalfSize, cropPoint[1] + cropVariable[3] + resizeBoxBorderHalfSize]
          ],
          'right': [
            [cropPoint[0] + cropVariable[2] - resizeBoxBorderHalfSize, cropPoint[1] - resizeBoxBorderHalfSize],
            [cropPoint[0] + cropVariable[2] + resizeBoxBorderHalfSize, cropPoint[1] + cropVariable[3] + resizeBoxBorderHalfSize]
          ],
          'bottom': [
            [cropPoint[0] - resizeBoxBorderHalfSize, cropPoint[1] + cropVariable[3] - resizeBoxBorderHalfSize],
            [cropPoint[0] + cropVariable[2] + resizeBoxBorderHalfSize, cropPoint[1] + cropVariable[3] + resizeBoxBorderHalfSize]
          ]
        };

        insideRect = {
          top: ModalLayer['_assistant']['number']['insideRect'](mousePoint, resizeRect.top),
          left: ModalLayer['_assistant']['number']['insideRect'](mousePoint, resizeRect.left),
          right: ModalLayer['_assistant']['number']['insideRect'](mousePoint, resizeRect.right),
          bottom: ModalLayer['_assistant']['number']['insideRect'](mousePoint, resizeRect.bottom),
        }

        if ((insideRect.left && insideRect.top) || (insideRect.right && insideRect.bottom)) {
          resizeX = resizeY = true;
          cropCas.style.cssText += 'cursor: nwse-resize';
        } else if ((insideRect.right && insideRect.top) || (insideRect.left && insideRect.bottom)) {
          resizeX = resizeY = true;
          cropCas.style.cssText += 'cursor: nesw-resize';
        } else if (insideRect.left || insideRect.right) {
          resizeX = true;
          resizeY = false;
          cropCas.style.cssText += 'cursor: ew-resize';
        } else if (insideRect.top || insideRect.bottom) {
          resizeY = true;
          resizeX = false;
          cropCas.style.cssText += 'cursor: ns-resize';
        } else {
          resizeX = resizeY = false;
          cropCas.style.cssText += 'cursor: default';
        }
      }

    }

    repaintCropWindowEvent();

    document.addEventListener('keyup', keyupEvent);

    cropCas.addEventListener('mousemove', mousemoveEvent);
    cropCas.addEventListener('mousedown', mousedownEvent);
    cropCas.addEventListener('mouseup', mouseupEvent);
    cropCas.addEventListener('dblclick', cropEvent);

    document.body.appendChild(cropCas);
  }

  /**
   * 旋转
   *
   * @Author   Wolf
   * @DateTime 2020-09-05T01:12:42+0800
   * @param    {Number}                 angle 旋转角度
   */
  spin (angle = undefined) {
    let rect, radian;
    let cas, ctx, backup;
    let scale, newSize, newPoint;

    cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
    ctx = cas.getContext('2d');

    backup = new OffscreenCanvas(cas.width, cas.height);
    backup.getContext('2d').drawImage(cas, 0, 0, cas.width, cas.height);

    this['variable']['image']['finish'].then(img => {
      angle = angle ?? this['variable']['image']['spin']['angle'];

      cas.style.transform = 'rotate(' + angle + 'deg)';
      rect = cas.getBoundingClientRect();
      cas.style.transform = `scale(${this['variable']['image']['spin']['scale']})`;

      if (this['option']['layer']['size'] || (this['option']['layer']['sizeRange']['max'][0] >= rect.width && this['option']['layer']['sizeRange']['max'][1] >= rect.height)) {
        scale = this['variable']['image']['spin']['scale'];
      } else {
        newSize = ModalLayer['_assistant']['number']['getMaxLegalSize']([rect.width, rect.height], this['option']['layer']['sizeRange']['max']);
        scale = newSize[0] / rect.width;
      }

      cas.width = rect.width;
      cas.height = rect.height;
      cas.style.transform = `scale(${scale})`;
      radian = angle * window.Math.PI / 180;

      ctx.save();
      ctx.translate(cas.width / 2, cas.height / 2);
      ctx.rotate(radian);
      ctx.drawImage(backup, -backup.width / 2, -backup.height / 2);
      ctx.restore();

      this.resize();
    });
  }

  /**
   * 滤镜
   *
   * @Author   Wolf
   * @DateTime 2020-09-05T01:12:49+0800
   */
  filter (target) {

    let wKey, sText, wScript;
    let cas, ctx, imgData, filterType;

    filterType = target.getAttribute('filter-type');

    cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
    if (cas.getAttribute('load-status') == ModalLayer['_enum']['LOAD_STATUS']['FAILED'] || !filterType) return;

    ctx = cas.getContext('2d');
    imgData = ctx.getImageData(0, 0, cas.width, cas.height);

    this['variable']['image']['layer']['show']();

    if (ModalLayer['_env']['feature']['worker']) {
      wKey = 'image-layer-worker-' + Date.now();
      sText = '!' + ModalLayer['_worker'].get('canvasFilter').toString() + '()';
      wScript = URL.createObjectURL(new Blob(sText.split(''), {'type': 'text/javascript'}));
      if (!ModalLayer['_assistant']['worker']['has'](wKey))
        ModalLayer['_assistant']['worker']['create'](wKey, wScript);
      ModalLayer['_assistant']['worker']['listener'](wKey).then(e => {
        if (e['data']['error'] == 0)
          ctx.putImageData(new ImageData(new Uint8ClampedArray(e['data']['buffer']), cas.width, cas.height), 0 , 0);
        else
          console.error(Error(e['data']['message']));
        this['variable']['image']['layer']['hide']();

        // 使用完毕关闭worker
        ModalLayer['_assistant']['worker']['close'](wKey);
      });
    }

    ({
      'blur': () => {
        let sigma, radius;

        sigma = Number(target.getAttribute('data-sigma')) ?? 1;
        radius = Number(target.getAttribute('data-radius')) ?? 3;

        if (ModalLayer['_env']['feature']['worker']) {
          let divisor, maskIndex, gaussianMask;

          // 根据半径计算高斯掩码
          if (ModalLayer['_assistant']['canvasFilter']['__gaussianMask'][[`${radius},${sigma}`]]) {
            gaussianMask = ModalLayer['_assistant']['canvasFilter']['__gaussianMask'][[`${radius},${sigma}`]];
          } else {
            divisor = 0;
            gaussianMask = [];
            for (maskIndex = -radius; maskIndex <= radius; maskIndex++) {
              let distribution = ModalLayer['_assistant']['formula']['gaussian']['getDistribution'](maskIndex, sigma, 1);
              gaussianMask.push(distribution);
              divisor += distribution;
            }

            // 归一化处理
            for (let i = 0; i < gaussianMask.length; i++)
              gaussianMask[i] /= divisor;

            ModalLayer['_assistant']['canvasFilter']['__gaussianMask'][[`${radius},${sigma}`]] = gaussianMask;
          }

          ModalLayer['_assistant']['worker']['get'](wKey).postMessage({
            'sigma': sigma,
            'radius': radius,
            'type': filterType,
            'gaussianMask': gaussianMask,
            'buffer': imgData.data.buffer,
            'size': [cas.width, cas.height]
          }, [imgData.data.buffer]);
        } else {
          imgData = ModalLayer['_assistant']['canvasFilter']['gaussianBlur'](imgData, radius, sigma);
          ctx.putImageData(imgData, 0 , 0);
          this['variable']['image']['layer']['hide']();
        }
      },
      'gray': () => {
        if (ModalLayer['_env']['feature']['worker']) {
          ModalLayer['_assistant']['worker']['get'](wKey).postMessage({
            'type': filterType,
            'buffer': imgData.data.buffer
          }, [imgData.data.buffer]);

        } else {
          imgData = ModalLayer['_assistant']['canvasFilter']['grayscale'](ctx.getImageData(0, 0, cas.width, cas.height));
          ctx.putImageData(imgData, 0, 0);
          this['variable']['image']['layer']['hide']();
        }
      },
      'mirror': () => {
        let axis = Number(target.getAttribute('mirror-axis')) ?? 0;
        if (ModalLayer['_env']['feature']['worker']) {
          ModalLayer['_assistant']['worker']['get'](wKey).postMessage({
            'axis': axis,
            'type': filterType,
            'buffer': imgData.data.buffer,
            'size': [cas.width, cas.height]
          }, [imgData.data.buffer]);
        } else {
          imgData = ModalLayer['_assistant']['canvasFilter']['mirror'](ctx.getImageData(0, 0, cas.width, cas.height), axis);
          ctx.putImageData(imgData, 0, 0);
          this['variable']['image']['layer']['hide']();
        }
      }
    }[filterType])?.();    
  }

  /**
   * 复位
   *
   * @Author   Wolf
   * @DateTime 2020-09-05T01:12:55+0800
   */
  revert () {
    let cas, ctx;

    cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
    ctx = cas.getContext('2d');

    this['variable']['image']['spin']['scale'] = 1;
    cas.width = this['variable']['image']['default']['size'][0];
    cas.height = this['variable']['image']['default']['size'][1];
    cas.removeAttribute('style');

    ctx.putImageData(this['variable']['image']['default']['imageData'], 0, 0);

    this.resize();
  }

  /**
   * 下载
   *
   * @Author   Wolf
   * @DateTime 2020-09-05T01:13:07+0800
   */
  download () {
    let cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');

    ModalLayer['_assistant']['canvas']['download'](cas, this['option']['title'], 'image/png');    
  }
}

ModalLayer['_achieve'].set('image', ImageLayer);