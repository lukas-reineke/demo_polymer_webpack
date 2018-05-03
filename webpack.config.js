'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/'
    },
    resolve: {
        modules: ['bower_components', 'node_modules'],
        descriptionFiles: ['package.json', 'bower.json'],
        extensions: ['.js', '.json', '.html']
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
    },
    plugins: [
        // This plugin will generate an index.html file for us that can be used
        // by the Webpack dev server. We can give it a template file (written in EJS)
        // and it will handle injecting our bundle for us.
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'index.ejs'),
          inject: false
        }),
        // This plugin will copy files over for us without transforming them.
        // That's important because the custom-elements-es5-adapter.js MUST
        // remain in ES2015.
        new CopyWebpackPlugin([{
          from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
          to: 'bower_components/webcomponentsjs/[name].[ext]'
        }])
      ]
};