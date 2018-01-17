/**
 * @file fis-conf
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/5/25
 */

fis.set('namespace', 'chain');

fis.hook('commonjs', {
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
    .match('{*.{md, sh, idea, DS_Store}, BCLOUD, fis-conf.js, .git/**, node_modules/**.json}', {
        release: false
    });

fis
    .match('*.vue', {
        isMod: true,
        rExt: 'js',
        useSameNameRequire: true,
        parser: fis.plugin('vue-component', {
            cssScopeFlag: 'vue-chain'
        })
    });

let es6List = [
    '**.vue:js',
    'index.html:js',
    'component/**.js',
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

            /** only for mobile app
             * px -> rem
             */
            // fis.plugin('rem', {
            //     rem: 37.5,
            //     dpr: 1,
            //     fontSize2Rem: true
            // })
        ],
        rExt: '.css'
    })
    .match('*.{css}', {
        preprocessor: fis.plugin('cssprefixer', {
            browsers: ['Chrome > 1'],
            cascade: true
        })
    });

fis
    .match('{node_modules/**.js, /app/**.js, component/**.js, page/**.js}', {
        isMod: true,
        rExt: 'js'
    });

fis
    .match('{node_modules/**, /app/**, component/**, page/**, static/**}.{js,jsx,vue}', {
            preprocessor: [
            fis.plugin('js-require-file'),
            fis.plugin('js-require-css')
        ]
    });


fis.match('{' + es6List + '}.{less, css, vue, js}', {
    useHash: true
});


fis
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', {})
    });

fis.match('*.css', {
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

var pkgMap = {
    'useTrack': false,
    'static/pkg/app.js': [
        /^\/app\/.*\.(js|vue)$/i,
        /^\/static\/.*\.js$/i,
        '!/static/js/**.js'
    ],
    'static/pkg/app.css': [
        /^\/app\/component\/.*\.(less|css)$/i,
        /^\/app\/static\/.*\.(less|css)$/i
    ],
    'static/pkg/js/aio.js': [
        /^\/component\/.*\.(js|vue)$/i,
        /^\/page\/.*\.(js|vue)$/i
    ],
    'static/pkg/css/aio.css': [
        /^\/components\/.*\.(less|css)$/i,
        /^\/page\/.*\.(less|css)$/i
    ],

    'static/pkg/node_modules.js': [
        /^\/node_modules\/.*\.(js|vue)$/i
    ]
};

fis
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            resourceMap: true,
            useInLineMap: true,
            resourceType: 'mod'
        }),
        spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '15'
        })
    });

fis.match('*.{js,vue}, index.html', {
    optimizer: fis.plugin('uglify-js', {
        output: {
            // smarty 超过200字符会截断
            /* eslint-disable */
            max_line_len: 200
            /* eslint-enable */
        }
    })
});

fis
    .media('debug')
    .match('**.{js, less, css, png}', {
        useSprite: false,
        optimizer: null
    });

fis
    .media('prod')
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
    });
    // .match('::packager', {
    //     moduleId: function (m, path) {
    //         return fis.util.md5(path);
    //     },
    //     // packager: fis.plugin('deps-pack', pkgMap),
    //     packager: fis.plugin('map', pkgMap)
    // });
