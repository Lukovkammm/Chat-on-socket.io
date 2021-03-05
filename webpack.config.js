const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, './public/chat.js'),
    },

    output: {
        publicPath: '',
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
            ]
          },
        ],
  },

    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './public/index.html'), 
          filename: 'index.html', 
        }),

        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),

       
    ] 
}