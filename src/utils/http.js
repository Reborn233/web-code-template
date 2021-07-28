import axios from 'axios';
import { Message } from 'element-ui';
import { Util } from './common';
import store from '../store';
import router from '../router';
import RESPONSE_CODE from '../configs/response-code';
import { ACTION_KEYWORD } from '@/store/modules/communication-child';

// 设置http get请求不缓存
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get['Pragma'] = 'no-cache';

const http = axios.create({
  // timeout: 5000,
});

/**
 * 拼接token
 * @param {String} url 请求路径
 */
function appendToken (url) {
  if (!url || !Util.isString(url)) return url;
  if (url.indexOf('?') > -1) {
    url = `${url}&token=${store.getters.vx_gt_GetToken}`;
  }
  else {
    url = `${url}?token=${store.getters.vx_gt_GetToken}`;
  }
  return url;
}

// 请求前进行拦截
http.interceptors.request.use(
  req => {
    req.url = appendToken(req.url);
    // 在这里对config进行统一处理
    return req;
  },
  error => {
    Promise.reject(error);
  }
);

/**
 * 响应后进行统一拦截
 * 假如后台返回的数据对象为：
 *    {
        code: string;
        content: any;
        message: string,
      }
 */
http.interceptors.response.use(
  res => {
    let _data = res.data;
    if (_data.code !== RESPONSE_CODE.success) {
      if (_data.message === RESPONSE_CODE.mapSuccess) {
        return Promise.resolve(_data.result);
      }
      // 这里对具体不为成功的响应码进行处理,可以做提示信息操作
      if (_data.code !== RESPONSE_CODE.qualificationError) {
        Message({
          message: _data.message,
          type: 'error',
          duration: 4 * 1000
        });
      }
      // 超时：通知父窗口退出
      if (_data.code === RESPONSE_CODE.timeout) {
        store.dispatch('vx_ac_Timeout');
        store.dispatch(`Comm/${ACTION_KEYWORD.SEND_LOGOUT}`);
        router.replace('/index');
      }
      return Promise.reject(_data);
    }
    else {
      return Promise.resolve(_data.content);
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export { http };
