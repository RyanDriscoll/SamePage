'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
    popup: './app/popup/index.js',
    content: './app/content/index.js',
    background: './app/background/index.js'
    },
  output: {
    path: __dirname,
    filename: './public/[name].bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  }
};
