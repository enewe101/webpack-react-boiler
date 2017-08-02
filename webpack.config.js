var path = require('path');
var webpack = require('webpack');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  context: path.join(__dirname, './client-src'),
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './index.js'
  ],
  output: {
    path: path.join(__dirname, './client-build'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        babelsrc: false,
        include: path.join(__dirname, './client-src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [['transform-class-properties']]
        }
      }
    ]
  },

  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
};
