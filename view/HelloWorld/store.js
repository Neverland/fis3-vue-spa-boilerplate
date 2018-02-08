/**
 * @file store
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/17
 */

import {api} from 'api';

export default {
    state: {
        pageTitle: 'Hello world!',
        list: []
    },
    mutations: {
        ['LIST'](state, data) {
            state.list = data;
        }
    },
    actions: {
        async list({commit}) {
            let {data = {}} = await api.getList();

            commit('LIST', data);
        }
    }
};
