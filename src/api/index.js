/**
 * @file index
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/16
 */

import apify from './apify';

export let api = apify;

export let http = {
  install(Vue) {
    Vue.prototype.$http = api;
  }
};
