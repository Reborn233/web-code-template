/**
 * 左侧导航问题
 */
import Menus from '@/configs/menu';
import { Util } from '../../utils/common';

// 初始化激活的导航
const INIT_ACTIVE_MENU = '';

/**
 * 递归过滤符合条件的路由
 */
function filterMenus (menus, permissions) {
  const accessedRouters = menus.filter(menu => {
    if (Util.hasPermission(menu.permission, permissions)) {
      if (menu.children && menu.children.length) {
        menu.children = filterMenus(menu.children, permissions);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

export default {
  state: {
    menus: null, // 有权限的导航
    permissions: [], // 权限列表
    activeMenu: '', // 当前激活的导航
    menuIsCollapse: false
  },
  mutations: {
    SET_PERMISSON_MENUS (state) {
      state.menus = filterMenus(Util.deepClone(Menus), state.permissions);
    },
    SET_PERMISSONS (state, { permissions }) {
      state.permissions = permissions;
    },
    ACTIVE_MENU (state, { menu }) {
      state.activeMenu = menu;
    },
    SET_MENUISCOLLAPSE (state) {
      state.menuIsCollapse = !state.menuIsCollapse;
    }
  },
  getters: {
    vx_gt_GetPermissionMenus (state) {
      return state.menus;
    },
    vx_gt_GetPermissions (state) {
      return state.permissions;
    },
    vx_gt_GetActiveMenu (state) {
      return state.activeMenu;
    },
    vx_gt_GetMenuIsCollapse (state) {
      return state.menuIsCollapse;
    }
  },
  actions: {
    vx_ac_SetPermissionMenus ({ commit }) {
      commit('SET_PERMISSON_MENUS');
    },
    vx_ac_SetPermissions ({ commit, dispatch }, permissions) {
      if (!Util.isArray(permissions)) return;
      commit('SET_PERMISSONS', { permissions: permissions });
      dispatch('vx_ac_SetPermissionMenus');
    },
    vx_ac_SetActiveMenu ({ commit }, { menu = INIT_ACTIVE_MENU }) {
      commit('ACTIVE_MENU', { menu });
    },
    vx_ac_ResetActiveMenu ({ commit }) {
      commit('ACTIVE_MENU', { menu: INIT_ACTIVE_MENU });
    },
    // 重置所有state
    vx_ac_ResetSidebarState ({ commit }) {
      commit('SET_PERMISSONS', { permissions: [] });
      commit('ACTIVE_MENU', { menu: INIT_ACTIVE_MENU });
      commit('SET_PERMISSON_MENUS');
    },
    vx_Set_MenuIsCollapse ({ commit }) {
      commit('SET_MENUISCOLLAPSE');
    }
  }
};
