<template>
    <div>
        <transition :name="type">
            <router-view></router-view>
        </transition>
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
                is: 'app',
                type: ''
            };
        },
        watch: {
            '$route' () {
                let isBack = this.$router.isBack;
                let type = 'slide-left';

                if (isBack) {
                    type= 'slide-right';
                }

                this.type = type;
                this.$router.isBack = false;
            }
        }
    };
</script>

<style lang="less" scoped rel="stylesheet/less">
    .app {
        background: #fff;
        height: 100%;
    }
    .router-view {
        width:100%;
        transition: all .25s cubic-bezier(0,0,0.25,1);
    }
    .slide-left-enter, .slide-right-leave-active {
        position: absolute;
        opacity: 0;
        transform: translate(50px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
        position: absolute;
        opacity: 0;
        transform: translate(-50px, 0);
    }
</style>

<style lang="less" scoped rel="stylesheet/less">
    /**
     * @require /static/font/iconfont.css
     */

</style>
