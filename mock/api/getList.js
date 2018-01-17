/**
 * @file list
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/1/16
 */

/* global moudule */

let data = {
    "error": 0,
    "message": "ok",
    "data": [
        'bob',
        'tom',
        'poul',
        'tony'
    ]
};

module.exports = function(req, res, next) {

    res.end(JSON.stringify(data));
};
