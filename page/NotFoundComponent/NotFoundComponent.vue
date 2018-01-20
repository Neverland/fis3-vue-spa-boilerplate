<template>
    <section>
        <h1>404</h1>The page wasn't found!
    </section>
</template>

<script type="text/ecmascript-6">
    /**
     * @file NotFoundComponent
     * @author ienix(enix@foxmail.com)
     *
     * @since 2018-1-19 14:07:46
     */

    /**
     * NotFoundComponent xxxxxxx
     * @module NotFoundComponent
     *
     * @property {string} title - 标题
     *
     * @example
     *
     */

    'use strict';

    import {title} from 'mixin';

    export default {
        mixins: [title],
        data() {
            return {
                pageTitle: '404 not found!',
                is: 'NotFoundComponent'
            }
        },
        methods: {

        },
        components: {

        }
    };
</script>

<style lang="less" scoped rel="stylesheet/less">

</style>
