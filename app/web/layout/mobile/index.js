import MainLayout from './main';

const content = '<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>';

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{vTitle}}</title>
  <meta name="keywords" :content="vKeywords">
  <meta name="description" :content="vDescription">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <link href="//pic.8pig.com/h5/img/favicon.png" rel="icon" data-n-head="true" type="image/png">
  <script src="//pic.8pig.com/h5/js/flexible.js"></script>
</head>
<body :class="baseClass" style="margin:0;padding:0">
  <div id="html-fist-loading" style="width:100%;height:100%;background:#f3f8ff;display: flex;align-items:center;justify-content: center;z-index:10000;">
      <p style="font-size:12px">页面加载中，请稍候...</p>
  </div>
  <div id="app">
    <MainLayout><div slot="main"><slot></slot></div></MainLayout>
  </div>
  <script>
    
    /*__page__size__*/
  </script>
</body>
</html>`;

export default {
  name: 'mobile-layout',
  props: ['title', 'description', 'keywords', 'isWX'],
  components: {
    MainLayout
  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || '';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || '';
    },
    vDescription() {
      return this.$root.description || this.description || '';
    },
    baseClass() {
      return this.$root.baseClass;
    }
    // ,isWX() {
    //   const agent = typeof window === 'object' ? window.navigator.userAgent :
    //   return /micromessenger/i.test(agent || window.navigator.userAgent)
    // }
  },
  template: typeof window === 'object' ? content : template
};
