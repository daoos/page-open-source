// 定义创建接口的请求参数规则
const createRule = { title: { type: 'string', required: false } };
const updateByIdRule = { title: { type: 'string', required: false } };

// 1 获取文章列表，分页，每页几个
exports.index = async function () {
  const result = await this.service.pages.index(this.query);
  // 设置响应体和状态码
  this.body = result;
  this.status = 200;
};

// 2 根据ID获取文章信息
exports.show = async function () {
  const result = await this.service.pages.show(this.params);
  // 设置响应体和状态码
  this.body = result;
  if (result.ret == 0) {
    this.body = result;
    this.status = 200
  } else if (result.ret == -101) {
    this.status = 404;
    this.body = {
      message: '页面找不到了'
    };
  } else {
    this.status = 500;
    this.body = {
      message: result.errmsg || '未知错误',
      stack: result.stack || ''
    };
  }
};

exports.create = async function () {
  // console.log("-------" + JSON.stringify(this.request.body));
  console.log()
  this.validate(createRule);
  const result = await this.service.pages.create(this.request.body);

  // 设置响应体和状态码
  this.body = result;
  this.status = 201;
};

exports.update = async function () {
  this.validate(updateByIdRule);
  const result = await this.service.pages.update(this.params.id, this.request.body);

  // 设置响应体和状态码
  this.body = result;
  this.status = 200;
};

exports.destroy = async function () {
  const result = await this.service.pages.destroy(this.params);
  // 设置响应体和状态码
  this.body = result;
  this.status = 204;
};
