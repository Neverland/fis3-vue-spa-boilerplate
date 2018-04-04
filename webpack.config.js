/**
 * @file webpack.config
 * @author ienix(enix@foxmail.com)
 *
 * @since 2018/4/3
 */

/* global process, module, __dirname */

let path = require('path');

let webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        startup: resolve('./src/startup.js'),
        router: resolve('./src/router/index.js'),
        store: resolve('./src/store/index.js'),
        vue: [
            'vue',
            'vuex',
            'vue-router'
        ]
    },
    output: {
        path: resolve('./output'),
        filename: 'js/[name].[hash:5].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.less', '.css'],
        alias: {
            'vue': 'vue/dist/vue.js',
            'mutationType': resolve('src/store/mutationType'),
            'api': resolve('src/api'),
            'component': resolve('src/component'),
            '/view': resolve('view'),
            '/static': resolve('static')
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    devServer: {
        contentBase: './output',
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js|\.\.\/\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.(css|less)$/,
                exclude: /(node_modules)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('index.html'),
            inject: 'body'
        }),
        new UglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                ecma: 8,
                warnings: false,
                output: {
                    comments: false,
                    beautify: false
                },
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_classnames: undefined,
                keep_fnames: false,
                safari10: false,
            }
        }),
        new CompressionPlugin({
            deleteOriginalAssets: true,
            minRatio: 0.8,
            threshold: 0,
            algorithm: 'gzip'
        }),
        new ExtractTextPlugin('[name].[hash:5].css')
    ]
};
