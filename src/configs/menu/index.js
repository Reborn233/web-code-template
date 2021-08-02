/**
 * 导航配置：
 *    1、name属性非常关键，请保证name属性与导航路由的name和国际化key完全一致
 *    2、iconClass: 根导航的图标
 *    3、permission：权限码字段（等后台定义完成后，请修改菜单对应的权限码）
 */
export default [
  {
    name: 'home',
    desc: '首页',
    permission: 'ANY',
    iconClass: 'el-icon-s-platform'
  },
  {
    name: 'tablePage',
    desc: '表格组件',
    permission: 'ANY',
    iconClass: 'el-icon-s-grid'
  },
  {
    name: 'formPage',
    desc: '表单组件',
    permission: 'ANY',
    iconClass: 'el-icon-s-grid'
  },
  {
    name: 'panelPage',
    desc: '弹窗组件',
    permission: 'ANY',
    iconClass: 'el-icon-s-grid'
  },
  {
    name: 'todo',
    desc: 'todo',
    permission: 'ANY',
    iconClass: 'el-icon-s-grid'
  }
];
