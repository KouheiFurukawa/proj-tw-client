const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'development',
    entry: './src/index.tsx',
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
        filename: 'static/js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "index.html"
        })
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
        },
    },
};