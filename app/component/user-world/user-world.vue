<template>
    <section class="user-world">
        <img src="./img/demo.jpeg">
    </section>
</template>

<script type="text/ecmascript-6">
    /**
     * @file user-world
     * @author ienix(enix@foxmail.com)
     *
     * @since 2018-1-19 15:04:15
     */

    /**
     * user-world xxxxxxx
     * @module user-world
     *
     * @property {string} title - 标题
     *
     * @example
     *
     */

    'use strict';

    export default {
        props: {
            list: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                is: 'user-world'
            }
        }
    };
</script>

<style lang="less" scoped rel="stylesheet/less">
    .user-world {

    }
</style>
