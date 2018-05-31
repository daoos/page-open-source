// conf2 供后台使用
const isProd = process.env.EGG_SERVER_ENV === 'prod';
const isTest = process.env.EGG_SERVER_ENV === 'test';

const API_DOMAIN = isProd ? 'https://api.8pig.com/' : 'https://api3.8pig.com/';
const API_PATH = '8pig-api';

const DOMAIN = isProd ? 'https://page.8pig.com/' : 'https://testpage.8pig.com/';

// nodejs 后台地址
const NODE_DOMAIN = isProd ? 'https://nodejs.8pig.com' : 'https://testnodejs.8pig.com'

const ossAuth = {
  accessKeyId: 'qTMDIcv7iFkDoQc5',
  accessKeySecret: '80y0Hc8DAGNwiswJb2LpCl17sDa5QH',
  bucket: '8pig-file',
  region: 'oss-cn-shenzhen'
};
module.exports = {
  API_DOMAIN,
  API_PATH,
  DOMAIN,
  ossAuth,
  NODE_DOMAIN
};
