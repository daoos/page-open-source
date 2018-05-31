'use strict';
const { resolve } = require('path') 
module.exports = {
  plugins: [
    require('postcss-import')({
      path:[resolve(__dirname,'./app/web/asset/css')]
    }),
    require('postcss-cssnext'),
    require('postcss-pxtorem')({ rootValue: 75, propList: ['*', '!font*'] }),
  ]
};
