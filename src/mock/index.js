import Mock from 'mockjs';
import {
  TODOS,
  USER
} from './db';
Mock.setup({
  timeout: '500-1200'
});

/*
 * 登录 /autocloud/sms/merchantuser/pwdlogin
 * */

Mock.mock(/autocloud\/sms\/merchantuser\/pwdlogin/, 'post', {
  code: '000000',
  message: 'success',
  content: 'c0dee2ea-b5b6-4f4c-8cbd-bd90d36a84b8',
  succeeded: true
});

/*
 * 用户信息/autocloud/sms/merchantuser/logininfo/get
 * */

Mock.mock(/autocloud\/sms\/merchantuser\/logininfo\/get/, 'get', {
  code: '000000',
  message: 'success',
  content: USER,
  succeeded: true
});

Mock.mock(/api\/todos/, 'get', {
  code: '000000',
  message: 'success',
  content: TODOS,
  succeeded: true
});
