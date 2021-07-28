import { http } from '../utils/http';

/**
 * 用户通过账号密码登陆
 * @param {Object} loginInfo
 * loginType: 1:手机验证码登陆 2:用户名密码登陆 3:二维码登陆
 */
export function api_login_byPwd (loginInfo) {
  return http.post(
    '/autocloud/sms/merchantuser/pwdlogin',
    Object.assign({}, { loginType: 2 }, loginInfo)
  );
}

/**
 * 根据当前登录用户token获取用户信息
 * @param {String} token 当前登录用户的token
 */
export function api_getUserInfo () {
  return http.get('/autocloud/sms/merchantuser/logininfo/get');
}
