
module.exports = app => {
  app.router.redirect('/', '/admin');
  app.router.get('/admin(/.+)?', app.controller.admin.index);
  app.router.get('/p/:id', app.controller.page.mobile);
  app.router.resources('pagesApi', '/api/pages', 'pagesApi');
  app.router.get('/error', app.controller.error.index);
};
