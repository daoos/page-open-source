export default {
  /*
     * return an string from query by the arg name.
     *
     * if arg name is not specialed, it will return an object parsed from query.
     */
  get(name) {
    const query = window.location.search;
    if (name) {
      const r = new RegExp('[?&]' + name + '=([^&]*)');
      const m = r.exec(query);
      if (m) {
        return m[1];
      } else {
        return null;
      }
    } else {
      return this.parseQueryString(query);
    }
  },

  /*
     * return an object parsed from query.
     */
  parseQueryString(query) {
    if (query[0] === '?') {
      query = query.substring(1);
    }
    const args = {};
    const fragments = query.split('&');
    let fragment,
      pos,
      i;
    const length = fragments.length;
    for (i = 0; i < length; i++) {
      fragment = fragments[i];
      pos = fragment.indexOf('=');
      if (pos > 0) {
        args[fragment.substring(0, pos)] = fragment.substring(pos + 1);
      } else {
        args[fragment] = null;
      }
    }
    return args;
  },

  /*
     * return an new url joined all args.
     */
  join(url, args) {
    if (!args) {
      return url;
    }
    const array = [];
    let k,
      v;
    for (k in args) {
      v = args[k];
      if (typeof v === 'function' || typeof v === 'undefined') {
        continue;
      }
      if (v === null) {
        array.push(k + '=');
      } else {
        array.push(k + '=' + encodeURIComponent(v));
      }
    }
    if (array.length === 0) {
      return url;
    }
    let joined = url;
    joined += (joined.indexOf('?') >= 0) ? '&' : '?';
    joined += array.join('&');
    return joined;
  }
};
