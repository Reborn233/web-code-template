import Vue from 'vue';
import appTable from './app-table/index';
import appForm from './app-form/index';
import topFilter from './top-filter/index';
import fileButton from './file-button/index';
import appSection from './app-section';

Vue.component('app-table', appTable);
Vue.component('app-form', appForm);
Vue.component('top-filter', topFilter);
Vue.component('file-button', fileButton);
Vue.component('app-section', appSection);
