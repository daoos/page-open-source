import app from './admin.vue';
import App from 'app';
import Vue from 'vue';
import VueRouter from 'vue-router';


import ListView from './pages/list.vue';
import newPageView from './pages/newPage.vue';


import ElementUI from 'element-ui';

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // history 路径不会有# 默认是hash，有#
  base: '/admin',
  routes: [
    {
      path: '/',
      redirect:'/list'
    },
    {
      path: '/list',
      component: ListView
    },
    {
      path: '/newpage/:pid?',
      name: 'newpage',
      component: newPageView
    }
  ]
});

export default App.init({
  ...app,
  router
});
