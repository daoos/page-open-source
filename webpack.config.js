'use strict';
const { resolve } = require('path');
module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    include: ['app/web/page/', {
      'admin/admin': 'app/web/page/admin/main.js?loader=false'
    }],
    exclude: [],
    loader: {
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
    }
  },
  alias: {
    common:'app/web/common',
    server: 'app/web/framework/vue/entry/server.js',
    client: 'app/web/framework/vue/entry/client.js',
    app: 'app/web/framework/vue/app.js',
    asset: 'app/web/asset',
    component: 'app/web/component',
    pages: 'app/web/pages',
    layout: 'app/web/layout',
    vue: 'vue/dist/vue.js',
  },
  dll: ['vue', 'axios', 'element-ui'],
  loaders: {
    css: {
      test: /\.css/,
      use: [
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'postcss-loader', options: { sourceMap: true } }
      ],
      postcss: false
    },
    eslint: {
      enable: false
    },
    sass: false,
    less: false
  },
  plugins: {
    serviceworker: false
  },
  optimization: {},
  done() {
    console.log('如果启动成功后, Chrome控制台浏览器脚本报错, 可以尝试执行 npm run clean 清除缓存解决');
  }
};