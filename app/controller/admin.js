'use strict';
module.exports = app => class AdminController extends app.Controller {
  async index () {
    const { ctx } = this
    await ctx.renderClient('admin/admin.js', { message: 'app page' })
  }
}