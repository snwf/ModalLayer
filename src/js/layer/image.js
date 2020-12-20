/*
* @Author:             Wolf
* @Email:              dd112389@gmail.com
* @Date:               2020-09-04 00:13:10
* @Description
*
* @Last Modified by:   wolf
* @Last Modified time: 2020-12-21 05:34:18
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

    // 如果裁剪未开启则将网格展示关闭.
    if (this['option']['layer']['toolbar']['config']['crop']['enable'] === false)
      this['option']['layer']['toolbar']['config']['crop']['grid'] = false;
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
        !Number.isFinite(parseInt(this['option']['layer']['sizeRange']['min'][0])) ||
        !Number.isFinite(parseInt(this['option']['layer']['sizeRange']['min'][1])) ||
        !Number.isFinite(parseInt(this['option']['layer']['sizeRange']['max'][0])) ||
        !Number.isFinite(parseInt(this['option']['layer']['sizeRange']['max'][1]))
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

    action = this['variable']['struct']['_backup']['action'];
    content = this['variable']['struct']['_backup']['content'];
    container = this['variable']['struct']['_build']['container'];
    title = this['variable']['struct']['_backup']['title'] = ModalLayer['_struct']['title'];
    toolbar = this['variable']['struct']['_backup']['toolbar'] = ModalLayer['_struct']['toolbar'];
    tools = this['variable']['struct']['_backup']['tools'] = ModalLayer['_struct']['image_tools'];
    actionButton = this['variable']['struct']['_backup']['action_button'] = ModalLayer['_struct']['action_button'];
    contentImage = this['variable']['struct']['_backup']['content_image'] = ModalLayer['_struct']['content_image'];
    toolChild = this['variable']['struct']['_backup']['image_tools_child'] = ModalLayer['_struct']['image_tools_child'];

    title.child.push(action);

    if (this['option']['title'] !== false)
      container.child.push(title);

    if (action.child.length === 0) {
      actionButton['close']['attribute'].push({'key': 'data-index', 'value': 0});
      action.child.push(actionButton.close);
    }

    // 工具
    Object.keys(this['option']['layer']['toolbar']['config']).forEach(k => {
      if (this['option']['layer']['toolbar']['config'][k]['enable'])
        toolbar.child.push(tools[k]);
      if (ModalLayer['_assistant']['object']['isOnlyObject'](this['option']['layer']['toolbar']['config'][k]['config']) && this['option']['layer']['toolbar']['config'][k]['enable']) {
        Object.keys(this['option']['layer']['toolbar']['config'][k]['config']).forEach(key => {
            tools[k].child[1].child.push(toolChild[k][key]);
        });
      }
    });

    // 工具栏
    if (this['option']['layer']['toolbar']['enable'])
      container.child.push(toolbar);

    content.child.push(contentImage);

    container.child.push(content);
    
    if (this['option']['resize']['enable']) {
      resize = this['variable']['struct']['_backup']['resize_box'] = ModalLayer['_struct']['resize_box'];
      container.child.push(resize);
    }
    
    if (this['option']['progress']['enable']) {
      progress = this['variable']['struct']['_backup']['progress_bar'] = ModalLayer['_struct']['progress_bar'];
      container.child.push(progress);
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

          if (ModalLayer['_assistant']['object']['isOnlyObject'](v['config'])) {
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

    this['variable']['image']['finish'] = this['load']()

    // 图片加载成功
    .then(img => this['loaded'](img))

    // 图片加载失败
    .catch(() => this['failed']());
  }

  /**
   * 初始化事件
   *
   * @Author    wolf
   * @Datetime  2020-12-09T22:32:57+0800
   */
  initEvent () {
    super.initEvent();

    let index = this['variable']['struct']['_backup']['action'].child.indexOf(this['variable']['struct']['_backup']['action_button']['close']);

    if (!this['event']['action'][index]) this['event']['action'][index] = this.remove;
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
    this['variable']['defaultRect']['width'] = defaultArea[0];
    this['variable']['defaultRect']['height'] = defaultArea[1];

    // 判断是否允许超出屏幕, 若不允许且已经超出则需要进行修正
    if (
      !this['option']['drag']['overflow'] &&
      ModalLayer['_assistant']['element']['isOverflow'](container, this['option']['window'])
    )
      this['positioning']();
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

    // 如果上次加载失败则移除失败动画.
    this['variable']['image']['fadeAttr'] && cas.removeAttribute(this['variable']['image']['fadeAttr']);

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
        'window': this['variable']['nodes']['container'].querySelector('.modal-layer-content')
      }, e => {throw e;});

    return this['variable']['image']['finish'] = new Promise((resolve, reject) => {
      let node = new Image;

      while (!this['variable']['image']['link'] && this['variable']['image']['reload'] < this['option']['layer']['image'].length) {
        if (this['variable']['image']['link']?.startsWith('blob:'))
          URL.revokeObjectURL(this['variable']['image']['link']);
        this['variable']['image']['link'] = ModalLayer['_assistant']['file']['getImage'](this['option']['layer']['image'][this['variable']['image']['reload']++]);
      }

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
   */
  reload () {
    this['variable']['image']['finish'] = this['load']()

    // 图片加载成功
    .then(img => this['loaded'](img))

    // 图片加载失败
    .catch(() => this['failed']())

    // 重绘图片层大小
    .finally(() => this.resize());
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
        'duration': 4,
        'sign': 'load-failed',
        'icon': {
          'size': 72,
          'char': '!?',
          'color': 'rgba(220, 53, 69)',
          'font': 'bold 72px Microsoft YaHei, serif',
        },
        'round': {
          'step': [4],
          'radius': 50,
          'borderWidth': 5,
          'borderColor': 'rgb(230, 230, 230)'
        },
        'text': {
          'color': 'rgba(220, 53, 69)',
          'text': '图片加载失败, 请点击重试',
          'font': 'lighter 16px Microsoft YaHei, serif'
        }
      }
    else
      fadeOption = {
        'duration': 4,
        'sign': 'finally-load-failed',
        'icon': {
          'size': 80,
          'char': '×',
          'font': 'bold 80px Microsoft YaHei, serif',
        },
        'round': {
          'step': [5],
          'radius': 50,
          'borderWidth': 5,
          'borderColor': 'rgb(230, 230, 230)'
        },
        'text': {
          'color': 'rgba(220, 53, 69)',
          'text': '图片加载失败, 请联系管理员',
          'font': 'lighter 16px Microsoft YaHei, serif'
        }
      }

    this['variable']['image']['fadeAttr'] = ModalLayer['_assistant']['canvasAnimation']['loadFailedFade'](cas.getContext('2d'), fadeOption);

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
   * @Author    wolf
   * @Datetime  2020-10-12T22:27:09+0800
   */
  crop () {
    let layer;
    let sPic, cropCasCenter;
    let operation, mousedown, direction;
    let repaint, animationFrame, repaintVariable;
    let minWidth, minHeight, maxWidth, maxHeight;
    let cropCas, cropCtx, cropBoxCas, cropBoxCtx;
    let cropBorderSize, cropBorderHalfSize, cropBorderSizeMul;
    let cropEvent, moveEvent, cleanEvent, keyupEvent, repaintEvent;

    // 是否重绘(调整截取区域)
    repaint = true;
    // 帧请求
    animationFrame = null;
    // 截取框边框粗细
    cropBorderSize = 5;
    // 初始化截取框粗细缓存
    cropBorderSizeMul = [];
    cropBorderHalfSize = ModalLayer['_assistant']['number']['divide'](cropBorderSize, 2);
    cropBorderSizeMul[2] = ModalLayer['_assistant']['number']['multiply'](cropBorderSize, 2);
    cropBorderSizeMul[4] = ModalLayer['_assistant']['number']['multiply'](cropBorderSize, 4);
    cropBorderSizeMul[6] = ModalLayer['_assistant']['number']['multiply'](cropBorderSize, 6);

    // 原图
    sPic = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');

    // 最大允许截取的区域
    maxWidth = sPic.width;
    maxHeight = sPic.height;
    // 最小允许截取的区域
    minWidth = ModalLayer['_assistant']['number']['floor'](maxWidth * 0.1);
    minHeight = ModalLayer['_assistant']['number']['floor'](maxHeight * 0.1);

    // 截取画布
    cropCas = sPic.cloneNode();
    cropCtx = cropCas.getContext('2d');
    cropCas.width = window.innerWidth;
    cropCas.height = window.innerHeight;
    cropCas.style = 'display: block; position: fixed; top: 0px; bottom: 0px; left: 0px; right: 0px; visibility: visible; opacity: 1; border: 0px; margin: 0px; z-index: ' + ModalLayer['_assistant']['element']['maxZIndex']() + ';';

    // 原图居中坐标轴偏移量
    cropCasCenter = [
      ModalLayer['_assistant']['number']['chain'](cropCas.width)['subtract'](maxWidth)['divide'](2)['round']().done(),
      ModalLayer['_assistant']['number']['chain'](cropCas.height)['subtract'](maxHeight)['divide'](2)['round']().done()
    ];
    repaintVariable = [...cropCasCenter, maxWidth, maxHeight];

    repaintEvent = () => {
      cropCtx.save();
      cropCtx.clearRect(0, 0, cropCas.width, cropCas.height);

      cropCtx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      cropCtx.fillRect(0, 0, cropCas.width, cropCas.height);

      cropCtx.globalCompositeOperation = 'destination-out';

      cropCtx.fillStyle = 'white';
      cropCtx.fillRect(...repaintVariable);
      cropCtx.globalCompositeOperation = 'source-over';
      ModalLayer['_assistant']['canvas']['drawGrid'](cropCtx, ...repaintVariable, 2, 'white', 'quarter');
      ModalLayer['_assistant']['canvas']['drawRect'](cropCtx, repaintVariable[0] - cropBorderHalfSize, repaintVariable[1] - cropBorderHalfSize, repaintVariable[2] + cropBorderSize, repaintVariable[3] + cropBorderSize, cropBorderSize, 'white', [0]);
      ModalLayer['_assistant']['canvas']['drawLBorder'](cropCtx, repaintVariable[0] - cropBorderSizeMul[2], repaintVariable[1] - cropBorderSizeMul[2], repaintVariable[2] + cropBorderSizeMul[4], repaintVariable[3] + cropBorderSizeMul[4], cropBorderSizeMul[6], cropBorderSize, 'white');

      cropCtx.globalCompositeOperation = 'destination-over';
      cropCtx.drawImage(sPic, ...cropCasCenter);
      cropCtx.restore();

      if (repaint)
        animationFrame = window.requestAnimationFrame(repaintEvent);
      else
        window.cancelAnimationFrame(animationFrame);
    }

    cleanEvent = () => {
      // 移除消息提示层
      layer && layer.delete();

      // 移除键盘监听
      document.removeEventListener('keyup', keyupEvent);

      // 移除鼠标监听
      cropCas.removeEventListener('mousemove', moveEvent);

      // 移除双击截取事件
      cropCas.removeEventListener('dbclick', cropEvent);

      // 停止重绘截取画布
      repaint = false;

      // 移除截取用画布
      cropCas.remove();
    };

    keyupEvent = kEvent => {
      kEvent = kEvent ?? window.event;
      switch (kEvent.code) {
        case 'Enter':
          cropEvent();
          kEvent.preventDefault();
          break;
        case 'Escape':
          this.show();
          cleanEvent();
          kEvent.preventDefault();
          break;
        default:
          return;
      }
    };

    cropEvent = e => {
      let sPicBackup;

      cleanEvent();

      e = e ?? window.event;
      sPicBackup = new OffscreenCanvas(sPic.width, sPic.height);
      sPicBackup.getContext('2d').drawImage(sPic, 0, 0);

      // 清理相关数据, 并将截取后图像绘制到原画布上.
      sPic.width = repaintVariable[2];
      sPic.height = repaintVariable[3];
      sPic.getContext('2d').drawImage(sPicBackup, repaintVariable[0] - cropCasCenter[0], repaintVariable[1] - cropCasCenter[1], repaintVariable[2], repaintVariable[3], 0, 0, sPic.width, sPic.height);

      this['show']().then(() => this['resize']());
    };

    moveEvent = mEvent => {
      let mPoint;
      let cursor, backup;
      let cropRect, resizeRect;
      mEvent = mEvent ?? window.event;
      // 鼠标左键点击后执行相应操作
      if (operation && mEvent.buttons === 1) {
        if (operation === 'drag') {
          if (
            repaintVariable[0] + mEvent.movementX > cropCasCenter[0] &&
            repaintVariable[0] + repaintVariable[2] + mEvent.movementX < cropCasCenter[0] + maxWidth
          )
            repaintVariable[0] += mEvent.movementX;
          if (
            repaintVariable[1] + mEvent.movementY > cropCasCenter[1] &&
            repaintVariable[1] + repaintVariable[3] + mEvent.movementY < cropCasCenter[1] + maxHeight
          )
            repaintVariable[1] += mEvent.movementY;
        } else if (operation === 'resize') {
          backup = [...repaintVariable];
          // 调整起始坐标位置与大小
          if (direction.includes(ModalLayer['_enum']['DIRECTION']['WEST'])) {
            repaintVariable[0] += mEvent.movementX;
            repaintVariable[2] -= mEvent.movementX;
          }

          if (direction.includes(ModalLayer['_enum']['DIRECTION']['EAST'])) {
            repaintVariable[2] += mEvent.movementX;
          }

          if (direction.includes(ModalLayer['_enum']['DIRECTION']['NORTH'])) {
            repaintVariable[1] += mEvent.movementY;
            repaintVariable[3] -= mEvent.movementY;
          }

          if (direction.includes(ModalLayer['_enum']['DIRECTION']['SOUTH'])) {
            repaintVariable[3] += mEvent.movementY;
          }

          // 限制resize后的截取框大小不能超过最大和最小值
          // 并且起始坐标位于整张图片之内
          if (
            repaintVariable[0] < cropCasCenter[0] ||
            repaintVariable[0] + repaintVariable[2] > cropCasCenter[0] + maxWidth
          ) {
            repaintVariable[0] = backup[0];
            repaintVariable[2] = backup[2];
          }

          if (
            repaintVariable[1] < cropCasCenter[1] ||
            repaintVariable[1] + repaintVariable[3] > cropCasCenter[1] + maxHeight
          ) {
            repaintVariable[1] = backup[1];
            repaintVariable[3] = backup[3];
          }

          if (repaintVariable[2] < minWidth) {
            repaintVariable[2] = backup[2];
            if (repaintVariable[0] + repaintVariable[2] > cropCasCenter[0] + maxWidth)
              repaintVariable[0] = cropCasCenter[0] + maxWidth - repaintVariable[2];
          }

          if (repaintVariable[3] < minHeight) {
            repaintVariable[3] = backup[3];
            if (repaintVariable[1] + repaintVariable[3] > cropCasCenter[1] + maxHeight)
              repaintVariable[1] = cropCasCenter[1] + maxHeight - repaintVariable[3];
          }
        }
      } else {
        mPoint = [mEvent.x, mEvent.y];
        resizeRect = [repaintVariable[0] - cropBorderSizeMul[2], repaintVariable[1] - cropBorderSizeMul[2], repaintVariable[2] + cropBorderSizeMul[4], repaintVariable[3] + cropBorderSizeMul[4]];
        cropRect = [repaintVariable[0] - cropBorderHalfSize, repaintVariable[1] - cropBorderHalfSize, repaintVariable[2] + cropBorderSize, repaintVariable[3] + cropBorderSize];
        // 鼠标左键未点击前判断当前鼠标位置, 设置当前允许操作.
        if (
          mPoint[0] > cropRect[0] &&
          mPoint[0] < cropRect[0] + cropRect[2] &&
          mPoint[1] > cropRect[1] &&
          mPoint[1] < cropRect[1] + cropRect[3]
        ) {
          cursor = 'move';
          operation = 'drag';
        } else if (
          mPoint[0] > resizeRect[0] &&
          mPoint[0] < resizeRect[0] + resizeRect[2] &&
          mPoint[1] > resizeRect[1] &&
          mPoint[1] < resizeRect[1] + resizeRect[3]
        ) {
          operation = 'resize';
          cursor = direction = '';
          // 上边
          if (mPoint[1] > resizeRect[1] && mPoint[1] < cropRect[1]) {
            cursor = direction += ModalLayer['_enum']['DIRECTION']['NORTH'];
          }
          // 下边
          if (mPoint[1] > cropRect[1] + cropRect[3] && mPoint[1] < resizeRect[1] + resizeRect[3]) {
            cursor = direction += ModalLayer['_enum']['DIRECTION']['SOUTH'];
          }
          // 左边
          if (mPoint[0] > resizeRect[0] && mPoint[0] < cropRect[0]) {
            cursor = direction += ModalLayer['_enum']['DIRECTION']['WEST'];
          }
          // 右边
          if (mPoint[0] > cropRect[0] + cropRect[2] && mPoint[0] < resizeRect[0] + resizeRect[2]) {
            cursor = direction += ModalLayer['_enum']['DIRECTION']['EAST'];
          }
          cursor += '-resize';
        } else {
          operation = null;
          cursor = 'default';
        }
        cropCas.style.cssText += 'cursor: ' + cursor;
      }

    }

    // 隐藏图片层.
    this['hide']();
    repaintEvent();

    document.addEventListener('keyup', keyupEvent);

    cropCas.addEventListener('mousemove', moveEvent);
    cropCas.addEventListener('dblclick', cropEvent);

    document.body.appendChild(cropCas);

    // 提示用户相关操作展示.
    layer = ModalLayer['msg']({
      'mask': false,
      'popupTime': 15,
      'resize': false,
      'position': 'lb',
      'areaProportion': null,
      'transition': {'animation': [{'transform': 'translateX(-100%)'}, {'transform': 'translateX(0)'}]},
      'content': '按 <span style="color: red">ESC</span> 退出裁剪模式.<br>双击裁剪框或者按下 <span style="color: red">空格(space)</span> 进行裁剪.<br>'
    });
  }

  /**
   * 旋转
   *
   * @Author   Wolf
   * @DateTime 2020-09-05T01:12:42+0800
   * @param    {Number}                 angle 旋转角度
   */
  spin (angle) {
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
    let showPromise;
    let wKey, sText, wScript;
    let cas, ctx, imgData, filterType;

    filterType = target.getAttribute('filter-type');

    cas = this['variable']['nodes']['container'].querySelector('.modal-layer-image-canvas');
    if (cas.getAttribute('load-status') == ModalLayer['_enum']['LOAD_STATUS']['FAILED'] || !filterType) return;

    ctx = cas.getContext('2d');
    imgData = ctx.getImageData(0, 0, cas.width, cas.height);

    showPromise = this['variable']['image']['layer']['show']();

    if (ModalLayer['_env']['feature']['Worker']) {
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
        showPromise.then(() => this['variable']['image']['layer']['hide']());

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
              let distribution = ModalLayer['_assistant']['formula']['getDistribution'](maskIndex, sigma, 1);
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
          showPromise.then(() => this['variable']['image']['layer']['hide']());
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
          showPromise.then(() => this['variable']['image']['layer']['hide']());
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
          showPromise.then(() => this['variable']['image']['layer']['hide']());
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

    let filename = cas.getAttribute('download-filename') ?? this['option']['layer']['toolbar']['config']['download']['name'] + Date.now();

    ModalLayer['_assistant']['canvas']['download'](cas, filename, this['option']['layer']['toolbar']['config']['download']['mime']);
  }
}

ModalLayer['_achieve'].set('image', ImageLayer);
