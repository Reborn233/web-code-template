import router from '.';
import store from '../store';
import { Util } from '../utils/common';
import { ACTION_KEYWORD } from '@/store/modules/communication-child';

// 禁止浏览器后退
function ForbidBrowserBack () {
  // window.history.pushState(null, null, window.location.href);
}

/**
 * 登录后跳转判断
 * @param to 跳转路由对象
 * @param next 执行方法
 * 如果在白名单内直接跳转
 * 如果不在白名单并且有权限,那么设置激活路由的name（activemenu）属性(映射的选中菜单)
 * 否则：停止跳转
 */
function jump (to, next) {
  // 设置路由格式
  let _router = {
    name: to.name,
    query: to.query
  };
  if (to.meta.isWhiteList === true) {
    // 向父页面发送保存路由消息，解决刷新后跳转当前页面问题
    if (to.name !== 'index') {
      store.dispatch(`Comm/${ACTION_KEYWORD.SEND_ROUTER}`, _router);
    }
    next();
  }
  else if (
    Util.isArray(store.getters.vx_gt_GetPermissions) &&
    Util.hasPermission(to.meta.permission, store.getters.vx_gt_GetPermissions)
  ) {
    // 向父页面发送保存路由消息，解决刷新后跳转当前页面问题
    store.dispatch(`Comm/${ACTION_KEYWORD.SEND_ROUTER}`, _router);
    // 当路由改变时：设置激活路由name
    store.dispatch('vx_ac_SetActiveMenu', { menu: to.meta.menuMapper });
    next();
  }
  else if (to.meta.wechat) {
    next();
  }
  else {
    // next({
    //   name: 'noPermission'
    // });
    next(false);
  }
  ForbidBrowserBack();
}

/**
 * 路由跳转前进行判断：
 *    如果不存在登陆token: 停止跳转
 *    如果存在登陆token:
 *      判断获取的权限列表长度是否为0
 *          是：获取用户信息、权限列表：
 *            成功： 进行跳转步骤(jump)
 *            出错：停止跳转
 *          否: 进行跳转步骤
 */
router.beforeEach((to, from, next) => {
  if (to.meta.isWhiteList) {
    jump(to, next);
  }
  else if (store.getters.vx_gt_GetToken) {
    let _permissions = store.getters.vx_gt_GetPermissions;
    if (Util.isArray(_permissions) && _permissions.length === 0) {
      store
        .dispatch('vx_ac_GetUserInfo')
        .then(res => {
          store.dispatch('vx_ac_SetPermissions', res.privilegeCodes);
          // 正常跳转判断
          // to.name === 'noPermission' ? next() : jump(to, next);
          jump(to, next);
        })
        .catch(error => {
          next(false);
          ForbidBrowserBack();
        });
    }
    else {
      // 正常跳转判断
      // to.name === 'noPermission' ? next() : jump(to, next);
      jump(to, next);
    }
  }
  else if (to.meta.wechat) {
    next();
  }
  else {
    next({
      name: 'index'
    });
    ForbidBrowserBack();
  }
});
