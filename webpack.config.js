'use strict';

const webpack = require('webpack');

const path = require('path');

module.exports = {
    entry: './index.html',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/'
    },
    resolve: {
        modules: ['bower_components', 'node_modules'],
        descriptionFiles: ['package.json', 'bower.json']
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'polymer-webpack-loader' }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            }
        ]
    }
};