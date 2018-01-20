/**
 * @file fis-conf
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/5/25
 */

/* global fis */

fis
    .match('{*.{md, sh, idea, DS_Store}, BCLOUD, fis-conf.js, .git/**, node_modules/**.json}', {
        release: false
    });

fis
    .hook('commonjs', {
        mode: 'mod',
        extList: [
            '.js',
            '.vue'
        ],
        paths: {
            vue: 'node_modules/vue/dist/vue.js',
            api: 'app/api',
            mixin: 'app/mixin',
            component: 'app/component',
            store: 'app/store'
        }
    })
    .hook('node_modules');


fis
    .match('*.vue', {
        isMod: true,
        rExt: 'js',
        useSameNameRequire: true,
        parser: fis.plugin('vue-component', {
            cssScopeFlag: 'vue-chain'
        })
    });

var es6List = [
    '**.vue:js',
    'index.html:js',
    'page/**.js',
    'page/**.vue:js',
    'app/**.js',
    '!/mock/**.js'
].join(',');

fis
    .match('{' + es6List + '}', {
        isMod: true,
        parser: [
            fis.plugin('babel-6.x', {
                plugins: [
                    'add-module-exports',
                    'transform-object-assign',
                    'async-to-promises',
                    'array-includes',
                    [
                        'transform-runtime',
                        {
                            polyfill: false,
                            regenerator: true
                        }
                    ]
                ]
            })
        ]
    });

fis
    .match('{*.less, *.vue:less}', {
        parser: [
            fis.plugin('less-2.x'),
            // h5 app可以使用该解决方案
            // @lick https://www.npmjs.com/package/fis3-parser-rem
            // fis.plugin('rem', {
            //     rem: 41.4, // 设计稿(1242px -> 41.4, 720 -> 37.5),
            //     dpr: 1,
            //     fontSize2Rem: true
            // })
        ],
        useHash: true,
        rExt: '.css'
    })
    .match('*.css', {
        preprocessor: fis.plugin('cssprefixer', {
            browsers: ['Chrome > 1'],
            cascade: true
        })
    });

fis
    .match('{node_modules/**, app/**, page/**}.{js, vue}', {
        isMod: true,
        preprocessor: [
            fis.plugin('js-require-file'),
            fis.plugin('js-require-css')
        ],
        rExt: 'js'
    });

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

fis
    .match('{app/**, node_modules/**, page/**, /static/**}.{js,css,png}', {
        useHash: true
    });

fis
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            resourceType: 'mod',
            useInlineMap: true // 资源映射表内嵌
        }),
        spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '15'
        })
    });

var pkgMap = {
    'useTrack': false,
    'static/pkg/mod.js': [
        /^\/static\/.*\.js$/i
    ],
    'static/pkg/app.js': /^\/app\/.*\.(js|vue)$/i,
    'static/pkg/js/page.js': /^\/page\/.*\.(js|vue)$/i,
    'static/pkg/node_modules.js': /^\/node_modules\/(?!((vue|vuex|vue-router)\/)).*\.js$/i,
    'static/pkg/vue.js': /^\/node_modules\/((vue|vuex|vue-router)\/).*\.js$/i,
    'static/pkg/ui.js': /^\/node_modules\/mint-ui.*\.js$/i,

    'static/pkg/css/page.css': /^\/page\/.*\.(less|css)$/i,
    'static/pkg/app.css': [
        /^\/app\/component\/.*\.(less|css)$/i,
        /^\/app\/static\/.*\.(less|css)$/i
    ],
    'static/pkg/node_modules.css': /^\/node_modules\/.*\.(css|vue)$/i
};

fis
    .media('debug')
    .match('**.{js, less, css, png}', {
        useSprite: false,
        useHash: false,
        optimizer: null
    });

fis
    .media('prod')
    .match('{' + es6List + '}', {
        parser: [
            fis.plugin('jdists', {
                remove: 'debug,test,dev'
            }),
            fis.plugin('babel-6.x', {
                plugins: [
                    'add-module-exports',
                    'transform-object-assign',
                    'async-to-promises',
                    'array-includes',
                    [
                        'transform-runtime',
                        {
                            polyfill: false,
                            regenerator: true
                        }
                    ]
                ]
            })
        ]
    })
    .match('::packager', {
        packager: fis.plugin('deps-pack', pkgMap)
    })
    .match('*/**.{js, vue}', {
        optimizer: fis.plugin('uglify-js'),
        moduleId: function (m, path) {
            return fis.util.md5(path);
        }
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });
