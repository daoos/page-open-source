import MainLayout from './main';

const content = '<div id="app"><MainLayout><div slot="main"><slot></slot></div></MainLayout></div>';

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{vTitle}}</title>
  <meta name="keywords" :content="vKeywords">
  <meta name="description" :content="vDescription">
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <link href="//pic.8pig.com/h5/img/favicon.png" rel="icon" data-n-head="true" type="image/png">
</head>
<body :class="baseClass" style="margin:0;padding:0">
  <div id="html-fist-loading" style="width:100%;height:100%;background:#f3f8ff;display: flex;align-items:center;justify-content: center;z-index:10000;">
      <p style="font-size:12px">页面加载中，请稍候...</p>
  </div>
  <div id="app">
    <MainLayout><div slot="main"><slot></slot></div></MainLayout>
  </div>
  <script>
    if (/micromessenger/i.test(window.navigator.userAgent)) {
      var jweixin = document.createElement('script');
      jweixin.src = '//res.wx.qq.com/open/js/jweixin-1.3.0.js';
      jweixin.defer = 'defer';
      document.body.appendChild(jweixin)
    }
    /*__page__size__*/
  </script>
</body>
</html>`;

export default {
  name: 'pc-layout',
  props: ['title', 'description', 'keywords', 'isWX'],
  components: {
    MainLayout
  },
  computed: {
    vTitle() {
      return this.$root.title || this.title || '';
    },
    vKeywords() {
      return this.$root.keywords || this.keywords || '8只小猪提供全球120多个国家,600多座城市私人导游,华人导游,中文导游,留学生导游预定服务.不用做攻略,玩遍全世界,来8只小猪体验独一无二的旅行！';
    },
    vDescription() {
      return this.$root.description || this.description || '私人导游,华人导游,中文导游,留学生导游';
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
