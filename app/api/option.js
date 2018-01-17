/**
 * @file api option
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/16
 */

export default {
    hook: {
        beforeRequest({option}) {

        }
    },
    handler: {
        error(data, option) {

            return data;
        }
    }
};
