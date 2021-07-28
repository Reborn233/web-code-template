import Vue from 'vue';
import Vuex from 'vuex';
import sidebar from './modules/sidebar';
import user from './modules/user';
import Comm from './modules/communication-child';
import CachedView from './modules/cached-view';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sidebar,
    user,
    Comm,
    CachedView
  }
});

// 初始化接收消息分发listener
store.dispatch('Comm/vx_ac_CommRCVDispatherInit');

export default store;
