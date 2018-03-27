<template>
    <div class="hello-world">
        <div v-for="(val, key) in list"
             :key="key"
             @click="listItem(key)">
            <p>{{ val }}</p>
        </div>
        <el-button @click="removeCell">删除列表项</el-button>
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

    import store from 'store';

    export default {
        store,
        computed: {
            ...mapState({
                list: state => state.helloWorld.list
            })
        },
        methods: {
            listItem(index) {
                this.$message({
                    message: `This is ${this.list[index]}`,
                    type: 'success'
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
.hello-world {

}
</style>
