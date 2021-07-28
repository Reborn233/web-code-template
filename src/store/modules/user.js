/**
 *  当前登录用户的账号信息，包括权限
 */
import { api_getUserInfo, api_login_byPwd } from '../../apis/basic';
import { MyStorage } from '@/utils/storage';

const TOKEN_KEY = 'TOKEN';

function setToken2Session (token) {
  MyStorage.sessionStorage.setItem(TOKEN_KEY, token);
}

export function getTokenFromSession () {
  return MyStorage.sessionStorage.getItem(TOKEN_KEY);
}

function removeToken () {
  MyStorage.sessionStorage.removeItem(TOKEN_KEY);
}

export default {
  state: {
    loginedUser: null, // 当前登录用户
    token: getTokenFromSession()
  },
  mutations: {
    SET_LOGINEDUSER (state, loginedUser) {
      state.loginedUser = loginedUser;
    },
    SET_TOKEN (state, token) {
      state.token = token;
    }
  },
  getters: {
    vx_gt_GetLoginedUser (state) {
      return state.loginedUser;
    },
    vx_gt_GetToken (state) {
      return state.token;
    }
  },
  actions: {
    // 设置token
    vx_ac_SetToken ({ commit, dispatch }, token) {
      commit('SET_TOKEN', token);
    },
    vx_ac_GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        api_getUserInfo()
          .then(data => {
            commit('SET_LOGINEDUSER', data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登录
    vx_ac_PwdLogin ({ dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        api_login_byPwd(userInfo)
          .then(data => {
            setToken2Session(data);
            dispatch('vx_ac_SetToken', data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 超时
    vx_ac_Timeout ({ dispatch }) {
      removeToken();
      dispatch('vx_ac_ResetSidebarState');
    }
  }
};
