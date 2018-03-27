/**
 * @file store
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/17
 */

import {api} from 'api';
import {HELLO_WORLD_GET_LIST} from 'mutationType';

export default {
    state: {
        pageTitle: 'Hello world!',
        list: []
    },
    mutations: {
        ['HELLO_WORLD_GET_LIST'](state, data) {
            state.list = data;
        }
    },
    actions: {
        async list({commit}) {
            let {data = {}} = await api.getList();

            commit('HELLO_WORLD_GET_LIST', data);
        }
    }
};
