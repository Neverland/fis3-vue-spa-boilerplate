/**
 * @file router.js
 * @author ienix(enix@foxmail.com)
 *
 * @since 1/15 2018
 */

/*<dev>*/
import HelloWorld from 'page/HelloWorld';
/*</dev>*/

import NotFoundComponent from 'page/NotFoundComponent';

export default [
    /*<dev>*/
    {
        path: '/helloWorld',
        component: HelloWorld
    },
    /*</dev>*/
    {
        path: '*',
        component: NotFoundComponent

    }
];
