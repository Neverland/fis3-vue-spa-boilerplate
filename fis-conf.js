/**
 * @file fis-conf
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/5/25
 */

/* global fis */
fis
    .match('{*.{md, sh, idea, DS_Store}, BCLOUD, fis-conf.js, .git/**, node_modules/**.json, mock/**}', {
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
            api: 'app/api'
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
    'app/**.js',
    '!/mock/**.js'
].join(',');
fis
    .match('{' + es6List + '}', {
        isMod: true,
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
    });
fis
    .match('{*.less, *.vue:less}', {
        parser: [
            fis.plugin('less-2.x'),
            fis.plugin('rem', {
                rem: 37.5,
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
    .match('{node_modules/**, app/**, page/**}.js', {
        isMod: true,
        userHash: true,
        preprocessor: [
            fis.plugin('js-require-file'),
            fis.plugin('js-require-css')
        ],
        rExt: 'js'
    });
fis
    .match('*.{js,css,png}', {
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
    'static/pkg/node_modules.js': '/node_modules/**.js:deps',
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
    .match('::packager', {
        packager: fis.plugin('deps-pack', pkgMap)
    })
    .match('**.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.css', {
        optimizer: fis.plugin('clean-css')
    });
