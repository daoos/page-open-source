// Image lazy load plugin

/*
*  option {object}
*         container {Element} 监听元素，默认为 window
*         prefix    {String}  图片 src 属性，默认为 data-url
*         class     {String}  需要懒加载的标记样式，默认为 .lazy
*         async     {Bealoon} 页面中是否有异步加载，默认为 false
* */

let isInit = false;

export function autoLazyload() {
  if (!isInit) {
    isInit = true;
    return LazyLoadCtrl({
      async: true
    });
  }
}

export function LazyLoadCtrl(option = {}) {
  const _option = {
    container: window,
    prefix: 'data-url',
    class: '.lazy',
    async: false,
  };
  try {
    const lazy = new LazyLoad(Object.assign(_option, option));
    lazy.init();
    return lazy;
    // return ;(new LazyLoad(Object.assign(_option, option))).init()
  } catch (e) {
    alert(e.stack);
  }
}

function LazyLoad(option) {
  this.option = option;
  this.list = [];
  this.listenHandle = null;
  this.insertHandle = null;
  this.evens = ['scroll', 'resize', getWheelEvent()];
}

LazyLoad.prototype = {
  constructor: LazyLoad,

  init() {
    this._scan();
    this.listenHandle = this._listen();
    setTimeout(this.listenHandle, 300);
    this._on();
    return this;
  },

  _scan() {
    // const selector = this.option.class
    let list = document.querySelectorAll('img[' + this.option.prefix + ']'),
      imgCache = [];

    for (let i = 0; i < list.length; i++) {
      imgCache.push(list[i]);
    }

    this.list = imgCache;
  },

  _listen() {
    const self = this;
    return throttle(() => {
      self._update();
      if (!self.option.async && !self.list.length) {
        self._off();
      }
    }, 300);
  },

  _update() {
    let list = this.list,
      option = this.option,
      item,
      tempList = [];

    for (let i = 0; i < list.length; i++) {
      item = list[i];
      if (this._elemInViewport(item, option.container)) {
        const url = item.getAttribute(option.prefix);
        if (url) {
          item.src = url;
          item.removeAttribute(option.prefix);
          item.classList.remove(option.class.substr(1));
        }
      } else {
        tempList.push(item);
      }
    }

    this.list = tempList;
  },

  _elemInViewport(el, container) {
    let rect = el.getBoundingClientRect(),
      containerHeight;

    container = container || window;

    if (isWindow(container)) {
      containerHeight = window.innerHeight;
    } else {
      containerHeight = container.offsetHeight;
    }

    return (rect.top >= 0 && rect.top - containerHeight <= 150) ||
            (rect.bottom >= -150 && rect.bottom - containerHeight <= 0);
  },

  _async() {
    const option = this.option;
    let self = this,
      wrap = isWindow(option.container)
        ? document.body
        : option.container;

    if (!self.insertHandle) {
      self.insertHandle = throttle(() => {
        setTimeout(function() {
          self._scan();
          self.listenHandle();
        }, 300);
      }, 300);
    }
    wrap.addEventListener('DOMNodeInserted', self.insertHandle);
  },

  _on() {
    for (let i = 0; i < this.evens.length; i++) {
      this.option.container.addEventListener(this.evens[i], this.listenHandle);
    }
    this.option.async && this._async();
  },

  _off() {
    for (let i = 0; i < this.evens.length; i++) {
      this.option.container.removeEventListener(this.evens[i], this.listenHandle);
    }
  }

};

function throttle(action, delay) {
  let handle = null,
    lastRun = 0;

  return () => {
    if (handle) return;
    let time = Date.now() - lastRun,
      context = this,
      args = arguments,
      callback = function() {
        lastRun = Date.now();
        handle = false;
        action.apply(context, args);
      };

    if (time > delay) {
      callback();
    } else {
      handle = setTimeout(callback, delay);
    }
  };
}

function isWindow(obj) {
  return obj != null && obj == obj.window;
}

function getWheelEvent() {
  return 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
}
