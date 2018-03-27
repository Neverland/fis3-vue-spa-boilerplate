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
            api: 'src/api',
            mixin: 'src/mixin',
            component: 'src/component',
            store: 'src/store',
            mutationType: 'src/store/mutationType'
        }
    })
    .hook('node_modules');
fis
    .match('**.vue', {
        isMod: true,
        rExt: 'js',
        useSameNameRequire: true,
        parser: fis.plugin('vue-component', {
            runtimeOnly: true,
            styleNameJoin: '',
            extractCSS: true,
            cssScopedIdPrefix: '_v-',
            cssScopedHashType: 'sum',
            cssScopedHashLength: 8,
            cssScopedFlag: '__vuec__'
        })
    });
var es6List = [
    '**.vue:js',
    'index.html:js',
    'view/**.js',
    'view/**.vue:js',
    'src/**.js',
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
    .match('{*.less, *.vue:less, node_modules/element-ui/lib/**.css}', {
        parser: [
            fis.plugin('less-2.x'),
            fis.plugin('rem', {
                rem: 41.4,
                dpr: 1,
                fontSize2Rem: true
            })
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
    .match('{node_modules, src, view}/**.{js, vue:js}', {
        isMod: true,
        preprocessor: [
            fis.plugin('js-require-file'),
            fis.plugin('js-require-css')
        ],
        rExt: 'js'
    });
fis.match('::image', {
    optimizer: fis.plugin('png-compressor'),
    release: 'static/pkg/image/$0'
});
fis
    .match('{src, node_modules, view, static}/**.{js,css,png,gif,jpg}', {
        useHash: true
    });
fis
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            resourceType: 'mod',
            resourcemapWhitespace: 0,
            useInlineMap: true
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
    'static/pkg/src.js': /^\/src\/.*\.(js|vue)$/i,
    'static/pkg/js/view.js': /^\/view\/.*\.(js|vue)$/i,
    'static/pkg/node_modules.js': /^\/node_modules\/(?!((vue|vuex|vue-router)\/)).*\.js$/i,
    'static/pkg/vue.js': /^\/node_modules\/((vue|vuex|vue-router|vue-touch)\/).*\.js$/i,
    'static/pkg/ui.js': /^\/node_modules\/mint-ui.*\.js$/i,
    'static/pkg/css/view.css': /^\/view\/.*\.(less|css)$/i,
    'static/pkg/src.css': [
        /^\/src\/component\/.*\.(less|css)$/i,
        /^\/src\/static\/.*\.(less|css)$/i
    ],
    'static/pkg/node_modules.css': /^\/node_modules\/.*\.(less|css|vue)$/i,
    'static/pkg/style.css': /^\/static\/.*\.(less|css)$/i
};


fis
    .media('debug')
    .match('**.{js, less, css, png, gif, jpg}', {
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
    .match('*.{js, vue}', {
        optimizer: fis.plugin('uglify-js'),
        moduleId: function (m, path) {
            return fis.util.md5(path);
        }
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });
