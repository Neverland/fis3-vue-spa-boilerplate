<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    /**
     * @file App
     * @author ienix(enix@foxmail.com)
     *
     * @since 6/1/2017, 12:07:54 PM
     */

    /**
     * 通用性逻辑可以在这个entry组件内处理
     *
     */

    'use strict';

    export default {
        data() {
            return {
                is: 'app'
            };
        }
    };
</script>

<style lang="less" scoped rel="stylesheet/less">
    /**
     * @require /static/font/iconfont.css
     */

</style>
