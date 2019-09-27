class MyDragBox {
  public elem: HTMLElement; // 当前的盒子dom元素
  public element: HTMLElement; // 同上指向同一个东西

  public width: number; // 盒子的宽度
  public height: number; // 盒子的高度 
  public left: number; // 盒子当前的left
  public top: number; // 盒子当前的top
  public zIndex: number; // 盒子当前的zIndex
  public isFixAspect: boolean; // 是否保持大小比例，即放大缩小的时候，是否保持比例
  public deg: number; // 旋转度数，默认0
  private baseDeg: number = 0; // 基础旋转值
  private isShowRotate: boolean = false; // 是否显示旋转条

  public onChange: Function; // 改变的时候触发，根据type值区分

  private l: HTMLElement; // 左边点
  private lt: HTMLElement; // 左上点
  private t: HTMLElement; // 上边点
  private rt: HTMLElement; // 右上点
  private r: HTMLElement; // 右边点
  private rb: HTMLElement; // 右下点
  private b: HTMLElement; // 下边点
  private lb: HTMLElement; // 左下点
  private rotateLine: HTMLElement; // 旋转点和盒子的连线
  private rotateDot: HTMLElement; // 旋转点

  static style = {
    // 盒子样式
    elem: {
      display: 'block',
      cursor: 'move',
      position: 'absolute',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#000',
      fontSize: '16px'
    },
    // 点样式
    dot: {
      width: '0.4em',
      height: '0.4em',
      position: 'absolute',
      zIndex: 2,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#000',
      borderRadius: '50%',
      backgroundColor: '#FFF'
    },
    l: {
      left: '-0.2em',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'w-resize'
    },
    lt: {
      left: '-0.2em',
      top: '-0.2em',
      cursor: 'nw-resize'
    },
    t: {
      top: '-0.2em',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'n-resize'
    },
    rt: {
      right: '-0.2em',
      top: '-0.2em',
      cursor: 'ne-resize'
    },
    r: {
      right: '-0.2em',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'e-resize'
    },
    rb: {
      right: '-0.2em',
      bottom: '-0.2em',
      cursor: 'se-resize'
    },
    b: {
      bottom: '-0.2em',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 's-resize'
    },
    lb: {
      left: '-0.2em',
      bottom: '-0.2em',
      cursor: 'sw-resize'
    },
    rotateLine: {
      position: 'absolute',
      width: '1px',
      backgroundColor: '#000',
      height: '1em',
      left: '50%',
      top: '-1.25em',
      transform: 'translateX(-50%)'
    },
    rotateDot: {
      left: '50%',
      top: '-1.75em',
      transform: 'translateX(-50%)',
      cursor: 'auto'
    }
  }

  constructor({
    elem = null,
    width = 100, // 宽度
    height = 100, // 高度
    left = 0,
    top = 0,
    zIndex = 10,
    isFixAspect = false,
    isShowRotate = false,
    onChange = null,
    rotate = 0
  } = {}) {
    if (!elem) {
      elem = document.createElement('div');
    } else if (typeof elem === 'string') {
      elem = document.querySelector(elem);
    }

    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.zIndex = zIndex;
    this.isFixAspect = isFixAspect;
    this.isShowRotate = isShowRotate;

    this.elem = elem;
    this.element = elem;

    this.onChange = onChange;

    if (rotate != 0) {
      this.deg = rotate;
      this.baseDeg = rotate;
    }

    this.initElement();

    this.initEvent();
  }

  initElement() {

    let elem = this.elem;

    elem.style.width = `${this.width}px`;
    elem.style.height = `${this.height}px`;
    elem.style.left = `${this.left}px`;
    elem.style.top = `${this.top}px`;
    elem.style.zIndex = `${this.zIndex}`;
    setStyle(elem, MyDragBox.style.elem);
    if (this.deg !== 0) {
      elem.style.transform = `rotate(${this.deg}deg)`;
    }

    let l = document.createElement('div');
    setStyle(l, MyDragBox.style.dot);
    setStyle(l, MyDragBox.style.l);

    let lt = document.createElement('div');
    setStyle(lt, MyDragBox.style.dot);
    setStyle(lt, MyDragBox.style.lt);

    let t = document.createElement('div');
    setStyle(t, MyDragBox.style.dot);
    setStyle(t, MyDragBox.style.t);

    let rt = document.createElement('div');
    setStyle(rt, MyDragBox.style.dot);
    setStyle(rt, MyDragBox.style.rt);

    let r = document.createElement('div');
    setStyle(r, MyDragBox.style.dot);
    setStyle(r, MyDragBox.style.r);

    let rb = document.createElement('div');
    setStyle(rb, MyDragBox.style.dot);
    setStyle(rb, MyDragBox.style.rb);

    let b = document.createElement('div');
    setStyle(b, MyDragBox.style.dot);
    setStyle(b, MyDragBox.style.b);

    let lb = document.createElement('div');
    setStyle(lb, MyDragBox.style.dot);
    setStyle(lb, MyDragBox.style.lb);

    this.l = l;
    this.t = t;
    this.r = r;
    this.b = b;
    this.lt = lt;
    this.rt = rt;
    this.rb = rb;
    this.lb = lb;

    elem.appendChild(l);
    elem.appendChild(r);
    elem.appendChild(t);
    elem.appendChild(b);
    elem.appendChild(lt);
    elem.appendChild(lb);
    elem.appendChild(rt);
    elem.appendChild(rb);

    if (this.isShowRotate) {
      let rotateLine = document.createElement('div');
      setStyle(rotateLine, MyDragBox.style.rotateLine);

      let rotateDot = document.createElement('div');
      setStyle(rotateDot, MyDragBox.style.dot);
      setStyle(rotateDot, MyDragBox.style.rotateDot);

      this.rotateLine = rotateLine;
      this.rotateDot = rotateDot;

      elem.appendChild(rotateLine);
      elem.appendChild(rotateDot);
    }

  }

  initEvent() {
    let _this = this;
    let elem = this.elem;
    elem.addEventListener('mousedown', function (e) {

      // 当前点击点距离盒子边缘的距离
      let disX = e.pageX - _this.left;
      let disY = e.pageY - _this.top;

      // 记录时间，节流
      let t1: Date = new Date(), t2: Date;

      _this.triggerChange('movestart', 'box', e);

      document.onmousemove = function (moveEvent) {

        let left = moveEvent.pageX - disX;
        let top = moveEvent.pageY - disY;

        _this.left = left;
        _this.top = top;

        elem.style.left = `${left}px`;
        elem.style.top = `${top}px`;
        t2 = new Date();
        if (t2.getTime() - t1.getTime() > 1000 / 60) {
          t1 = t2;
          _this.triggerChange('move', 'box', moveEvent);
        }
      }

      document.onmouseup = function (upEvent) {
        document.onmousemove = null;
        document.onmouseup = null;
        _this.triggerChange('moveend', 'box', upEvent);
      }

      return false;
    });

    this.resize(this.l, true, false, false, true, 'l');
    this.resize(this.lt, true, true, false, false, 'lt');
    this.resize(this.t, false, true, true, false, 't');
    this.resize(this.rt, true, true, true, false, 'rt');
    this.resize(this.r, true, false, true, true, 'r');
    this.resize(this.rb, true, true, true, true, 'rb');
    this.resize(this.b, false, true, true, true, 'b');
    this.resize(this.lb, true, true, false, true, 'lb');

    if (this.rotateDot !== undefined) {
      this.rotateDot.addEventListener('mousedown', function (e) {
        e.cancelBubble = true;
        let rect = _this.elem.getBoundingClientRect();
        let cX = rect.left + rect.width / 2; // 中心点的横坐标
        let cY = rect.top + rect.height / 2; // 中心点的纵坐标
        let startX = e.pageX; // 起始点鼠标的横坐标
        let startY = e.pageY; // 起始店鼠标的纵坐标

        let d1 = Math.sqrt((startX - cX) * (startX - cX) + (startY - cY) * (startY - cY));

        _this.triggerChange('rotatestart', 'box', e);

        document.onmousemove = function (moveEvent) {
          let curX = moveEvent.pageX;
          let curY = moveEvent.pageY;

          let d2 = Math.sqrt((curX - cX) * (curX - cX) + (curY - cY) * (curY - cY));

          let cosValue = ((curX - cX) * (startX - cX) + (curY - cY) * (startY - cY)) / (d1 * d2);
          let deg = Math.acos(cosValue) * 180 / Math.PI;
          let tmp = (cY - startY) * curX + (startX - cX) * curY + cX * startY - startX * cY;
          // tmp负数表示往左，正的表示往右
          if (tmp < 0) {
            deg = 360 - deg;
          }
          _this.deg = _this.baseDeg + deg;
          elem.style.transform = `rotate(${_this.deg}deg)`;
          _this.triggerChange('rotate', 'box', moveEvent);
        }

        document.onmouseup = function (upEvent) {
          document.onmousemove = null;
          document.onmouseup = null;
          _this.baseDeg = _this.deg;
          _this.triggerChange('rotateend', 'box', upEvent);
        }

      });
    }

  }

  /**
   * 
   * @param curElem 当前对象
   * @param isLeft 计算大小以宽度为主
   * @param isTop 计算大小以高度为主
   * @param isLockX 盒子大小改变的时候是否固定好盒子的left
   * @param isLockY 盒子大小改变的时候是否固定好盒子的top
   * @param name 当前操作的点的名字
   */
  resize(curElem, isLeft = false, isTop = false, isLockX = true, isLockY = true, name = '') {
    let _this = this;
    let elem = this.elem;
    curElem.addEventListener('mousedown', function (e) {
      e = e || window.event;
      e.cancelBubble = true;

      let disX = e.pageX;
      let disY = e.pageY;

      let pLeft = _this.left;
      let pTop = _this.top;
      let pWidth = _this.width;
      let pHeight = _this.height;

      let aspect = pWidth / pHeight;

      let newLeft = pLeft;
      let newTop = pTop;
      let newWidth = pWidth;
      let newHeight = pHeight;

      // 记录时间，用于节流
      let t1: Date = new Date(), t2: Date;

      _this.triggerChange('scalestart', name, e);

      document.onmousemove = function (moveEvent) {
        let iW = newWidth, iH = newHeight;
        if (isLeft) {
          // 以宽度为主
          if (isLockX) {
            iW = pWidth + moveEvent.pageX - disX;
          } else {
            iW = pWidth + disX - moveEvent.pageX;
          }
          if (_this.isFixAspect || isTop) {
            // 固定宽高比或者是移动的四个角的点，则高度也要一起变化
            iH = iW / aspect;
          }
        } else {
          // 以高度为主
          if (isLockY) {
            iH = pHeight + moveEvent.pageY - disY;
          } else {
            iH = pHeight + disY - moveEvent.pageY;
          }
          if (_this.isFixAspect || isLeft) {
            // 固定宽高比或者是移动的四个角的点，则宽度也要一起变化
            iW = iH * aspect;
          }
        }

        _this.width = iW;
        _this.height = iH;

        elem.style.width = `${iW}px`;
        elem.style.height = `${iH}px`;

        if (!isLockX) {
          let disL = iW - pWidth;
          newLeft = pLeft - disL;
          _this.left = newLeft;
          elem.style.left = `${newLeft}px`;
        }
        if (!isLockY) {
          let disT = iH - pHeight;
          newTop = pTop - disT;
          _this.top = newTop;
          elem.style.top = `${newTop}px`;
        }
        t2 = new Date();
        if (t2.getTime() - t1.getTime() > 1000 / 60) {
          t1 = t2;
          _this.triggerChange('scale', name, moveEvent);
        }

        return false;
      };

      document.onmouseup = function (upEvent) {
        document.onmousemove = null;
        document.onmouseup = null;
        _this.triggerChange('scaleend', name, upEvent);
      };
      return false;
    });
  }

  triggerChange(type, name = '', e = null) {
    if (this.onChange) {
      this.onChange({
        width: this.width,
        height: this.height,
        left: this.left,
        top: this.top,
        rotate: this.deg,
        type: type,
        name: name,
        sourceEvent: e
      });
    }
  }

  update(options) {
    if (!isNaN(options.width)) {
      this.width = +options.width;
      this.elem.style.width = `${options.width}px`;
    }
    if (!isNaN(options.height)) {
      this.height = +options.height;
      this.elem.style.height = `${options.height}px`;
    }
    if (!isNaN(options.left)) {
      this.left = +options.left;
      this.elem.style.left = `${options.left}px`;
    }
    if (!isNaN(options.top)) {
      this.top = +options.top;
      this.elem.style.top = `${options.top}px`;
    }
    if (!isNaN(options.zIndex)) {
      this.zIndex = +options.zIndex;
      this.elem.style.zIndex = '' + options.zIndex;
    }
    if (!isNaN(options.rotate)) {
      this.deg = +options.rotate;
      this.baseDeg = this.deg;
      this.elem.style.transform = `rotate(${options.rotate}deg)`;
    }

    if (options.isFixAspect !== undefined) {
      if (options.isFixAspect) {
        this.isFixAspect = true;
      } else {
        this.isFixAspect = false;
      }
    }

  }

  hide() {
    this.elem.style.display = 'none';
  }

  show() {
    this.elem.style.display = 'block';
  }

}

function setStyle(elem, obj) {
  for (let key in obj) {
    elem.style[key] = obj[key];
  }
}
