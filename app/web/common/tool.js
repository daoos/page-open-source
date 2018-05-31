const toString = Object.prototype.toString;
export const isFunction = function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
};

export const isObj = function isObj(obj) {
  return toString.call(obj) === '[object Object]';
};

export const isArray = function(obj) {
  return toString.call(obj) === '[object Array]';
};

export const deepCopy = function(p, co) {
  const c = co || {};
  for (const i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
};
export const getUrlParam = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const p = window.location.search;
  const r = p && p.substr(1);
  const m = r.match(reg);
  const val = m && m.length > 1 && decodeURI(unescape(m[2])) || '';
  const result = val && val.replace('>', '&gt;').replace('<', '&gt');
  return result;
};

export const date = {
  parse(date) {
    // debugger
    let timestamp = Date.parse(date);
    if (isNaN(timestamp) == true) {
      timestamp = Date.parse(new Date());
    }
    return timestamp;
  },
  format(timestamp, type) {
    const date = new Date(timestamp);
    let dd = date.getDate(); // after 2 day
    let mm = date.getMonth() + 1; // January is 0!
    const yyyy = date.getFullYear();
    let res;
    if (type == 'zh') {
      res = yyyy + '年' + mm + '月' + dd + '日';
    } else {
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      res = yyyy + '-' + mm + '-' + dd;
    }
    return res;
  }
};

export const throttle = (fn, delay, mustRunTime) => {
  let timer = null;
  let tStart;
  return function() {
    const content = this;
    const arg = arguments;
    const tCurr = +new Date();
    clearTimeout(timer);
    if (!tStart) {
      tStart = tCurr;
    } else if (tCurr - tStart >= mustRunTime) {
      fn.apply(content, arg);
      tStart = tCurr;
    } else {
      timer = setTimeout(() => {
        fn.apply(content, arg);
      }, delay);
    }
  };
};

export const getCsrf = () => {
  const keyValue = document.cookie.match('(^|;) ?csrfToken=([^;]*)(;|$)');
  return keyValue ? keyValue[2] : null;
};

export const formateDate = (date) => {
  if (date.constructor !== Date) return console.log("数据格式不正确");
  const result = {};
  result.year = date.getFullYear();
  result.month = date.getMonth() + 1;
  result.date = date.getDate();
  result.hour = date.getHours();
  result.minutes = date.getMinutes();
  result.second = date.getSeconds();
  return `${result.year}-${result.month}-${result.date} ${result.hour}:${result.minutes}:${result.second}`;
}

export const IsPC = () => {
  
  const userAgentInfo = navigator.userAgent;  
  console.log('userAgentInfo',userAgentInfo)
  const Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
  let flag = true;    
  for (let v = 0; v < Agents.length; v++) {    
      if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }    
  }    
  return flag;    
}  