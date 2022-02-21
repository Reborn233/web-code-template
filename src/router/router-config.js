
import Index from './modules';
import _import from './import';

/**
 * 路由解耦，./modules文件夹下创建 xxx-management.js 路由文件，自动加入路由
 */
const routers = [];
function importAll (r) {
  r.keys().forEach(key => routers.push(r(key).default));
};

importAll(require.context('./modules/', true, /-management\.js/));

export default [
  {
    path: '/layout',
    name: 'layout',
    component: _import('layout/layout'),
    children: [
      ...Index,
      ...routers
    ]
  },
  {
    path: '/redirect/:fullPath',
    name: 'redirect',
    component: _import('layout/redirect'),
    meta: {
      isWhiteList: true
    }
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      isWhiteList: true
    },
    component:
      process.env.NODE_ENV === 'development'
        ? _import('login/login')
        : _import('loading/loading')
  },
  {
    path: '*',
    redirect: { name: 'index', replace: true }
  }
];
