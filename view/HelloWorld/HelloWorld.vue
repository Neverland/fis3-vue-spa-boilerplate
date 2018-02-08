<template>
    <div>
        <div v-for="(val, key) in list"
             :key="key"
             @click="listItem(key)">
            <mt-cell>{{ val }}</mt-cell>
        </div>
        <mt-button @click="removeCell">删除列表项</mt-button>
    </div>
</template>

<script type="text/ecmascript-6">
    /**
     * @file HelloWorld
     * @author ienix(enix@foxmail.com)
     *
     * @since 6/1/2017, 12:07:54 PM
     */

    /**
     * HelloWorld
     * @module Index
     */

    'use strict';

    import {mapState} from 'vuex';

    import { Toast } from 'mint-ui';

    import {title} from 'mixin';
    import store from 'src/page/HelloWorld/store';

    export default {
        mixins: [title],
        store,
        computed: {
            ...mapState({
                list: state => state.helloWorld.list
            })
        },
        methods: {
            listItem(index) {
                Toast({
                    message: `This is ${this.list[index]}`,
                        position: 'center',
                        duration: 1000
                });
            },
            removeCell() {
                let index = Math.random() * (this.list.length +1 );

                this.list.splice(index, 1);
            }
        },
        mounted() {
            this.$store.dispatch('list');
        }
    };
</script>

<style lang="less" scoped rel="stylesheet/less">


</style>
