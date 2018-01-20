/**
 * @file initDocumentTitle
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/19
 */

/**
 * 在page级别的vue组件环境内添加pageTitle即可
 *
 * 1. page 对于的store上添加,见HelloWorld.vue
 * 2. page vue的data上添加, 见NotFoundComponent.vue
 */

export default {
    created() {
        let title;

        if (this.$store) {
            title = this.$store.state.pageTitle;
        }
        else if (this.pageTitle) {
            title = this.pageTitle;
        }

        if (title) {
            document.title = title;
            /*<dev>*/
            console.warn(`The page title is \`${title} \``);
            /*<dev>*/
        }
    }
};
