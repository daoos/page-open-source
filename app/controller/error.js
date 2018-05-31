'use strict';
module.exports = app => class ErrorController extends app.Controller {
  async index () {
    const { ctx } = this
    await ctx.renderClient('error/error.js', { message: 'error' })
  }
}