import _import from '../import';

export default [
  {
    path: 'home',
    name: 'home',
    component: _import('modules/home'),
    meta: {
      permission: 'ANY',
      menuMapper: 'home',
      breadcrumb: 'home'
    }
  },
  {
    path: 'table',
    name: 'tablePage',
    component: _import('modules/table-page'),
    meta: {
      permission: 'ANY',
      menuMapper: 'tablePage',
      breadcrumb: 'tablePage'
    }
  },
  {
    path: 'form',
    name: 'formPage',
    component: _import('modules/form-page'),
    meta: {
      permission: 'ANY',
      menuMapper: 'formPage',
      breadcrumb: 'formPage'
    }
  },
  {
    path: 'panel',
    name: 'panelPage',
    component: _import('modules/panel-page'),
    meta: {
      permission: 'ANY',
      menuMapper: 'panelPage',
      breadcrumb: 'panelPage'
    }
  },
  {
    path: 'todo',
    name: 'todo',
    component: _import('modules/todo/index'),
    meta: {
      permission: 'ANY',
      menuMapper: 'todo',
      breadcrumb: 'todo'
    }
  },
  {
    path: 'nav',
    name: 'nav',
    component: _import('modules/nav/index'),
    meta: {
      permission: 'ANY',
      menuMapper: 'nav',
      breadcrumb: 'nav'
    }
  }
];
