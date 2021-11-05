
// 全局css
import './styles/index.scss';
// 引入字体文件

import Vue from 'vue';
import App from './App';
// 路由
import router from './router';
// 状态管理
import store from './store';
// 指令
import './directives';
// 引入国际化
import i18n from './i18n';
// 引入全局filter
import './filters';
// 路由拦截
import './router/router-event';

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 项目组件
import './components/index';

if (process.env.NODE_ENV === 'development') {
  // mock 模拟数据
  require('./mock');
}

// 设置element全局组件大小为small
Vue.use(ElementUI, { size: 'small' });

Vue.prototype.$sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

// 测试master
