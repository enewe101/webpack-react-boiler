var path = require('path');
var webpack = require('webpack');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  context: path.join(__dirname, 'client-src'),
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'client-build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'client-src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
