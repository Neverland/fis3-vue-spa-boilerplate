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
        success(response, option) {

            if (response.success) {
                return data;
            }

            return Promise.reject(response);
        },
        error({data}) {
            return data;
        }
    }
};
