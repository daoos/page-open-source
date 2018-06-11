

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
