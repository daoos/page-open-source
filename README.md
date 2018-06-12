## vue+egg+easywebpack页面配置平台开源手册
本平台为基于[egg](4)全栈功能、[easywebpack](5)配置和[vue](6)动态组件功能的动态页面配置系统。该系统可完成h5（甚至pc）页面的动态配置，支持个性化组件设计。高度一体化，只需维护个性化的组件。

旨在解放前端大量重复的简单交互页面的编写工作，提高运营人员配置页面的自由度，节省人力，提高效率。常用于落地页快速生成、h5文章快速编写等等。
### 快速开始

1.本项目以mongodb作为数据库，所以需要先行安装mongodb（安装方式自行google）。
这里给几个安装教程（最好将monogod命令加入环境变量）
- [mac 下用 brew 安装mongodb](1)
- [Mac OSX 平台安装 MongoDB](2)
- [windows下面安装mongodb](3)
- 

2. 启动mongo

启动前我的习惯是能看到启动反馈,先看配置文件
```
// mongod.conf
systemLog:
  destination: file
  path: /data/db/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /data/db/mongodb
net:
  bindIp: 127.0.0.1
security:
  authorization: "disabled"
processManagement:
   fork: true // fork 启动进程

```

启动mongod后台服务
```
$ mongod （没有权限需要加sudo）
// 输出
$ 2018-06-01T14:45:32.407+0800 I CONTROL  [initandlisten] MongoDB starting : pid=96618 port=27017 dbpath=/data/db 64-bit host=MacBookPro.local
2018-06-01T14:45:32.407+0800 I CONTROL  [initandlisten] db version v3.4.9
2018-06-01T14:45:32.407+0800 I CONTROL  [initandlisten] git ....
2018-06-01T14:45:32.407+0800 I NETWORK  [thread1] waiting for connections on port 27017

在浏览器输入127.0.0.1:2:27017
出现

It looks like you are trying to access MongoDB over HTTP on the native driver port.
即可
```

启动mongo前台服务
```
$ mongo
MongoDB shell version v3.4.9
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.9
>

```

3. 初始化

```
npm install
or yarn install（推荐）
```
4. 启动

```
// 本地启动
npm run dev

// 发布上线
npm run build  // 构建代码
npm start      // 启动端口服务
(or pm2 维护)

// 重启
npm stop （or npm run kill-mac 该命令直接杀死进程）
npm start 


```
5. 添加自定义组件：
```
1. 在根目录下运行
npm run add-comps
> node ./commander add
请输入组件名称(默认default1):

输入组件名并确认

2. 在app/web/component/module/defaultSetting.js
找到最后一行如：
,{
    name: 'default1',
    props: {
        msg: '在这里添加修改组建的默认属性',
    }
}
修改props中的属性为自定义是属性，属性修改参考txt组建的props

3. 在/app/web/page/admin/page/newPage.vue中，找到

<el-menu-item index="pImg" style="padding-left: 0;">
    <img style="border: 1px solid #989393;" src="https://pic.8pig.com/img/pages/upload/WX20180418-1839422018-04-18285.png">
    <p>图片组件(兼容pc)</p>
</el-menu-item>
复制以上代码，在页面上就能看到你的组建了

```
ps：monogo的配置
```
// config/config.local.js
exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/pages',
      options: {},
    }
  };
 
 也可以配置账号登陆
 options:{
     user: 'xxx', pass: 'xxxx'
 }
/// http://mongoosejs.com/docs/api.html#mongoose_Mongoose-createConnection
```
### 目录结构

目录结构都是按照hubcarl的easywebpack-vue[项目](7)来的,阅读本项目前建议先看以上项目的目录结构。这里只大体解释自定义目录。
```
|--app
    |--controller              // 路由控制器
        |--admin.js            // 首页和新建页面controller，客户端渲染，可在此页面配置登陆权限，这里不展开登陆中间件
        |--page.js             // 对外开放页面 路径是/p/:pid 
        |--pages_api.js        // 页面所需后台服务api，restFul格式
    |--model
        |--pages.js            // mongoose结构定义 Schema都在这里做

    |--services               // 服务层，controller的补充，可定制各种后台服务
        |--pages.js           // 定义了pages的后台服务
    |--router.js              // 前端与controller对应的路由路径
    |--web
        |--page               // 项目页面
            |--admin          // 单页应用admin,有登陆权限要获取用户信息用spa比较方便
                |--main.js    // spa需自己写vue-router等,脱离项目外层路由（router.js）
                |--admin.vue  // admin主页面
                |--pages
                    |--list.vue   // 列表页面，admin子路由器页面
                    |--newpage.vue  // 新建页面 admin子路由器页面
            |--p
                |——index    // 对外公开页面
    |--components           
        |-- module          // 动态组件维护目录
            |--edit           // 组件属性编辑目录 
                |--pImg.vue   // 当前有两个组件，每个组件都有edit（编辑）、preview(预览)、publish（发布）三种组件，
                |--txt.vue    // 根据名字查找对应的组件（意思三种组件名字必须一一对应）
            |--preview
                |--pImg.vue
                |--txt.vue
            |--publish
                |--pImg.vue
                |--txt.vue
            |-- defaultSetting.js  // 配置组件初始化属性，每增加一个组件需在该文件数组中添加一个组件初始化信息

.... 其他的目录结构就不解释了，跟hubcarl的项目差不多

```
### 动态组件配置原理
这里主要解释`components/module`的三个文件夹和`defaultSetting.js`的作用
![page-reason](http://8pig-file.oss-cn-shenzhen.aliyuncs.com/page/page-reason.png)


其他的可以参考系列文章
1. [基于vue的动态组件配置系统设计一：vue的动态组件的妙用](https://segmentfault.com/n/1330000012755580)
2. [基于vue的动态组件配置系统设计二：设计思路与实现](https://segmentfault.com/n/1330000012895094)


有不明白的，可以加qq留言 584196757

#### 常见问题

1. webpack插件添加方式

```
// webpack.config.jg
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
...
plugins:{
analyzer:{
      enable:false,
      env:['dev'],
      name: new BundleAnalyzerPlugin(options)
    },
  // options-- 可选
}

```
2. vue ssr渲染：window is not defined
```
前端解决方案：
https://zhuanlan.zhihu.com/p/36233639

npm插件解决方案（如vconsole）

在页面中用require和typeof(或EASY_ENV_IS_BROWSER)组合饮用

如：
if (typeof window === 'object'){
    const VConsole = require('vconsole')
    new VConsole()
}

 // typeof window === 'object' 等效 EASY_ENV_IS_BROWSER
```

3. js跨域请求 ‘String Error’
```
其实在vuessr渲染的时候可以添加crossorigin配置项，在引入的js中会自动添加crossorigin=anonymous的标示

// config.default.js
exports.vuessr = {
  crossorigin:true  
}
```
3. 

[1]:http://yijiebuyi.com/blog/b6a3f4a726b9c0454e28156dcc96c342.html
[2]:http://www.runoob.com/mongodb/mongodb-osx-install.html
[3]:http://www.haorooms.com/post/window_install_mongo

[4]:https://eggjs.org/zh-cn/
[5]:http://hubcarl.github.io/easywebpack/
[6]:https://cn.vuejs.org/
[7]:https://github.com/hubcarl/egg-vue-webpack-boilerplate