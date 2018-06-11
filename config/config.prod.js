/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */


module.exports = app => {
  const exports = {};
  
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/pages',
      options: {},
    }
  };
  return exports;
};
