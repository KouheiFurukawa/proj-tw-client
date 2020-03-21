const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.tsx',
        login: './src/login.tsx',
    },
    devtool: 'inline-source-map',    // デバッグできるように
    module: {
        rules: [
            {
                enforce: 'pre',
                loader: 'tslint-loader',
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    emitErrors: true
                }
            },
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: 'tsconfig.dev.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            chunks: ['main'],
            filename: "index.html",
            template: "index.html"
        }),
        new htmlWebpackPlugin({
            chunks: ['login'],
            filename: "login.html",
            template: "login.html"
        }),
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/user_timeline/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/timeline/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/tweet/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/favorites/list/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/like/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/retweet/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/search/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/logout/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            '/auth/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            },
            // '/login/**': {
            //     target: 'http://localhost:3000',
            //     secure: false,
            //     logLevel: 'debug'
            // }
        },
    },
};