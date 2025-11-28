import Vue from 'vue';
import appTable from './app-table/index';
import appFilter from './app-filter/index';
import appForm from './app-form/index';
import appPanel from './app-panel/index';
import fileButton from './file-button/index';
import appSection from './app-section';
import appNavigator from './app-navigator';

Vue.component('app-table', appTable);
Vue.component('app-form', appForm);
Vue.component('file-button', fileButton);
Vue.component('app-section', appSection);
Vue.component('app-panel', appPanel);
Vue.component('app-filter', appFilter);
Vue.component('app-navigator', appNavigator);
