import 'es6-promise';
import axios from 'axios';
import { API_DOMAIN, API_PATH } from './conf';
import wxLogin from './wxLogin';
import appLogin from './appLogin';
import urlTool from './url';

const error = (msg) => {
  // 错误提示
  alert(msg);
};

const request = async (method, url, params, showError = true) => {
  try {
    const result = await axios.request({
      url,
      method,
      data: params,
      withCredentials: true,
      baseURL: API_DOMAIN + API_PATH,
      timeout: 5000,
    });
    if (result.data.returnCode == 1006 || result.data.returnCode == 2019) {
      if (urlTool.get('visitFrom') == 'app') {
        appLogin();
      } else {
        wxLogin();
      }
    } else {
      if (showError && result.data.returnCode != 0) {
        error(result.data.returnMsg);
      }
      return result.data;
    }
  } catch (e) {
    error('糟糕,服务器出错了~~');
    return e;
  }
};

export const get = async (url, params, showError) => {
  const result = await request('get', url, params, showError);
  return result;
};

export const post = async (url, params, showError) => {
  const result = await request('post', url, params, showError);
  return result;
};
