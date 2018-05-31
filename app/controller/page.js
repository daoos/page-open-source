'use strict';
const Controller = require('egg').Controller;
class PageController extends Controller {
  async mobile() {
    const { ctx } = this
    const pageId = ctx.params.id;
    const result = await ctx.service.pages.show(ctx.params);
    if (result.ret == 0) {
      let httpContent = await ctx.renderView('p/index.js', {pageData: result.data});
      // 替换大小
      httpContent = httpContent.replace('/*__page__size__*/', `window.__page_size = ${httpContent.length};`)
      ctx.body = httpContent
    }
    else {
      let message = '未知错误';
      if (result.ret == -101) {
        ctx.status = 404;
        message = '页面找不到了';
      }
      else {
        ctx.status = 500;
      }
      await ctx.render('error/error.js', {message: message});
    }
  }

}

module.exports = PageController;