
export const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

// api/api3.8pig.com
const protocol = typeof window === 'object' ? window.location.protocol : 'http:';
export const API_DOMAIN = protocol + (isProd ? '//api.8pig.com/' : '//api3.8pig.com/');
export const API_PATH = '8pig-api';

export const DOMAIN = protocol + (isProd ? '//page.8pig.com/' : '//testpage.8pig.com/');
// export const DOMAIN_H5 = isProd ? 'https://h5.8pig.com' : 'http://test.h5.8pig.com'

// nodejs 后台地址
export const  NODE_DOMAIN = protocol + (isProd ? '//nodejs.8pig.com/' : '//testnodejs.8pig.com/')

// mongo 上报地址
export const MONGO_DOMAIN = isProd ? 'https://nodejs.8pig.com/v1/rpt' : 'https://testnodejs.8pig.com/v1/rpt'
// mongo 查询地址
export const MONGO_FIND = isProd ? 'https://nodejs.8pig.com/v1/find' : 'https://testnodejs.8pig.com/v1/find'
export const MONGO_QUERY = isProd ? 'https://nodejs.8pig.com/v1/query' : 'https://testnodejs.8pig.com/v1/query'


export const WX_APP_ID = isProd ? 'wxb5eb3a0d039597f5' : 'wx8b960eb7fdb921ad';
export const WX_LOGIN_API = API_DOMAIN + API_PATH + '/wechatservice/login?state=';

// 客服渠道 Udesk Bdsq
export const CS_CHNL = isProd ? 'Udesk' : '';

// cdn
const picEnv = 1; // 图片环境，1 为阿里云，2为七牛
const picDomain = '//pic.8pig.com/';
const pic2Domain = '//pic2.8pig.com/';
const picDomains = [picDomain, pic2Domain];
export const PIC_ENV = picEnv;
export const PIC_DOMAIN = picDomain;
export const PIC2_DOMAIN = pic2Domain;
export const PIC_PATH = picDomains[picEnv - 1];

// 神策
export const SA_PROJ = isProd ? 'production' : 'default'
export const SA_TOKEN = '85e375b893e13a62'

export const COUNSULT_URL = 'https://html.ecqun.com/kf/sdk/openwin.html?corpid=4214176&cstype=rand&mode=0&cskey=3hDntogfzDGF4GvRmC&scheme=0'

// sem接口地址
const SEM_API_DOMAIN = isProd ? 'https://oms.8pig.com' : 'https://api3.8pig.com'
const SEM_API_PATH = '/8pig-sem'
export const SEM_API_PREFIX = SEM_API_DOMAIN + SEM_API_PATH
