
module.exports = app => {
  class PagesService extends app.Service {
    async index(query) {
      const { app, ctx } = this;
      const pages = await ctx.model.Pages.find({}, { comps: 0, description: 0, keywords: 0, uid: 0, wDesc: 0, wImgUrl: 0, wTitle: 0,tags:0  });
      const result = {};
      const totalCount = pages.length; // 总条数
      const pageSize = Number(query.pageSize) || 10; // 每页条数
      const pageNo = Number(query.pageNo) || 1; // 当前页码
      const start = Math.max(pageSize * (pageNo - 1), 0);
      const end = Math.min(pageSize * pageNo, totalCount);
	    result.ret = 0;
      result.pager = { pageSize, pageNo, totalCount };
      result.data = pages.slice(start, end);
      return result;
    }

    async show(params) {
      const { app, ctx } = this;
      const pages = await ctx.model.Pages.findOne({ pid: params.id });
      const result = {};
      if (pages) {
        result.ret = 0;
        result.data = pages;
      } else {
        result.ret = -101;
      }
      return result;
    }

    async update(pid, request) {
      const { app, ctx } = this;
      const result = await ctx.model.Pages.findOneAndUpdate({ pid }, { $set: request });
      result.ret = 0;
	    result.data = result;
      return result;
    }

    async create(request) {
      if (!request) { return; }
      const { app, ctx } = this;
      const result = await ctx.model.Pages.create(request);
      console.log('create--',result)
	    result.ret = 0;
      result.data = result;
      return result;
    }

    async destroy(params) {
      // 删除前先查询
      const { app, ctx } = this;
      const ifExist = await ctx.model.Pages.findOne({ pid: params.id })
      const result = {}
      result.data = null
      if(ifExist){
        result.data = await ctx.model.Pages.remove({ pid: { $in: params.id.split(',') } });
        // 删除缓存
        app.disconf.removeCache(pid);
        result.ret = 0
        result.retMsg = '删除成功'
      } else {
        result.ret = 1002
        result.resMsg = '当前id不存在，请勿重复删除'
      }
      return result;
    }
  }
  return PagesService;
};
