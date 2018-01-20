/**
 * @file currency
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/19
 */

import Vue from 'vue';

let currency = value => {
    return `${value}元`;
};

Vue.filter('currency', currency);

export default currency;
