/**
 * 父子页面通信API
 */
import store from '../index';
import router from '../../router/index';
import { MyStorage } from '../../utils/storage';
import { Util } from '../../utils/common';
import COMM_ROUTER_MAPPER from '@/configs/router-mapper';
/**
 * 父子通信必要的统一参数格式
 * {
 *    keyword: String,
 *    serviceId: Number,
 *    token: String,
 *    // 当前服务地址源
 *    parentOrigin: String,
 *    childOrigin: String,
 *    router: {
 *      name: String,
 *      query: String
 *    },
 *     extraParam:{}
 * }
 */
// 保存父系统的sessionKey
const ROUTER_SESSION_KEY = 'RCV_PRANENT_ROUTER_KEY';
const ACTION_PREFIX = 'vx_ac_Comm_';
const ACTION_RCV_PREFIX = `${ACTION_PREFIX}RCV_`;
const ACTION_SEND_PREFIX = `${ACTION_PREFIX}SEND_`;
// 发送/接受 动作类型
export const ACTION_TYPE_KEYWORD = {
  RCV_JMP: 'JMP',
  SEND_LOGOUT: 'LOGOUT',
  SEND_ROUTER: 'ROUTER'
};
// store动作命名
export const ACTION_KEYWORD = {
  // 接受跳转
  RCV_JMP: `${ACTION_RCV_PREFIX}${ACTION_TYPE_KEYWORD.RCV_JMP}`,
  // 发送退出动作
  SEND_LOGOUT: `${ACTION_SEND_PREFIX}${ACTION_TYPE_KEYWORD.SEND_LOGOUT}`,
  // 发送保存路由
  SEND_ROUTER: `${ACTION_SEND_PREFIX}${ACTION_TYPE_KEYWORD.SEND_ROUTER}`
};

// 通信接收回调
const CommRCVFunc = function (e) {
  try {
    if (e.source !== window.parent) return;
    const _data = JSON.parse(e.data);
    if (!_data.token) return;
    // 根据keyword进行分发
    store.dispatch(`Comm/${ACTION_RCV_PREFIX}${_data.keyword}`, _data);
  }
  catch (error) { }
};

// 从Session中获取父窗口参数
const GetParentParamsFromSession = function () {
  try {
    return JSON.parse(MyStorage.sessionStorage.getItem(ROUTER_SESSION_KEY));
  }
  catch (error) {
    return {};
  }
};

export default {
  // 添加命名空间
  namespaced: true,
  actions: {
    // 通信:接收分发初始化
    vx_ac_CommRCVDispatherInit () {
      window.addEventListener('message', CommRCVFunc, false);
    },
    // 通信：接收分发销毁
    vx_ac_CommRCVDispatherDestroy () {
      window.removeEventListener('message', CommRCVFunc);
    },
    // 从父窗口获得跳转消息
    [ACTION_KEYWORD.RCV_JMP] ({ dispatch }, parentParams) {
      if (!parentParams) return;
      // 保存父窗口传递过来的parentParams
      MyStorage.sessionStorage.setItem(
        ROUTER_SESSION_KEY,
        JSON.stringify(parentParams)
      );
      // 设置token
      dispatch('vx_ac_SetToken', parentParams.token, { root: true });

      // 路由跳转目标不存在，不执行任何操作
      if (!parentParams.router || !parentParams.router.name) return;
      // replace掉先前的空白页面记录
      router.replace({
        // 先从mapper中取，有值则获取值跳转；否则直接当name为路由name进行跳转;
        name:
          COMM_ROUTER_MAPPER[parentParams.router.name] ||
          parentParams.router.name,
        query: parentParams.router.query || {}
      });
    },
    // 发送退出
    [ACTION_KEYWORD.SEND_LOGOUT] () {
      let _msg = GetParentParamsFromSession();
      if (!_msg || !Util.isObject(_msg)) return;
      _msg.keyword = ACTION_TYPE_KEYWORD.SEND_LOGOUT;
      window.parent.postMessage(JSON.stringify(_msg), _msg.parentOrigin);
    },
    // 发送保存路由:解决刷新时丢失当前路由信息的问题
    [ACTION_KEYWORD.SEND_ROUTER] ({ getters }, router) {
      let _msg = GetParentParamsFromSession();
      if (!_msg || !Util.isObject(_msg)) return;
      _msg.keyword = ACTION_TYPE_KEYWORD.SEND_ROUTER;
      _msg.router = router;
      window.parent.postMessage(JSON.stringify(_msg), _msg.parentOrigin);
    },
    // 销毁事件
    vx_ac_CommDestoryIframe ({ dispatch }) {
      dispatch('vx_ac_CommRCVDispatherDestroy');
    }
  }
};
