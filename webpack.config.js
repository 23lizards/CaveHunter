const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');

require('dotenv').config();

const development = require('./webpack/dev.config');
const production = require('./webpack/prod.config');

const TARGET = process.env.npm_lifecycle_event;

const common = {
    entry: './app/index.ts',

    output: {
        path: './dist'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        preLoaders: [
            {test: /\.ts$/, loader: 'tslint', exclude: /(node_modules)/}
        ],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|svgz)$/,
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },

    postcss: () => {
        return [
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ];
    },

    plugins: [
        new CleanPlugin(['dist']),
        new HtmlPlugin({
            template: 'app/index.html',
            inject: 'body'
        }),
        new CopyPlugin([
            {from: 'app/favicon.ico'}
        ])
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(development, common);
}

if (TARGET === 'build' || !TARGET) {
    module.exports = merge(production, common);
}