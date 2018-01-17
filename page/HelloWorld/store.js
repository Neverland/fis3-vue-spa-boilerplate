/**
 * @file store
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/17
 */

import Vue from 'vue';
import Vuex from 'vuex';

import {api} from 'api';

Vue.use(Vuex);

export default
new Vuex.Store({
    state: {
        list: []
    },
    mutations: {
        ['LIST'](state, {data}) {
            state.list = data;
        }
    },
    actions: {
        list({commit}) {
            api.getList()
                .then(response => {
                    commit('LIST', response.data);
                });
        }
    }
});
