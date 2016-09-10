const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'scripts.js'
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass'
            },
            {
                test: /\.(png|jpg|jpeg)/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.OccurenceOrderPlugin()
    ],

    devServer: {
        port: process.env.PORT,
        contentBase: './app',
        outputPath: './dist'
    }
};