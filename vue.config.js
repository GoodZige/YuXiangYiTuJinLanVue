/*
* date: 2019-06-05
* desc:
*/
'use strict';
const path = require('path');
console.log(process.env.BROWSER);
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        devtool: process.env.NODE_ENV === 'development' ? '#eval-source-map' : ''
    },
    devServer: {
        port:8888,
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://172.20.0.198:8084',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true,
        watchOptions: {
            poll: false
        }
    },
};
