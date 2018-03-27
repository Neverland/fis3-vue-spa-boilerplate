/**
 * @file router.js
 * @author ienix(enix@foxmail.com)
 *
 * @since 1/15 2018
 */

/*<dev>*/
import HelloWorld from '/view/HelloWorld';
/*</dev>*/

import NotFound from '/view/NotFound';

export default [
    /*<dev>*/
    {
        path: '/helloWorld',
        component: HelloWorld
    },
    /*</dev>*/
    {
        path: '*',
        component: NotFound

    }
];
