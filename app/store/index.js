/**
 * @file vuex store
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/19
 */

import Vue from 'vue';
import Vuex from 'vuex';

/*<dev>*/
import helloWorld from 'page/helloWorld/store';
/*</dev>*/

Vue.use(Vuex);

export default
new Vuex.Store({
    modules: {
        /*<dev>*/
        helloWorld
        /*</dev>*/
    }
});

