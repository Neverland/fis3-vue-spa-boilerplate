/**
 * @file startup
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/16
 */

import './ui';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import routerMap from './router';
import {http} from './api';

import App from 'page/App';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(http);

let router = new VueRouter({
    routes: routerMap
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
