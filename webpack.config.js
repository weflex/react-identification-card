var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    './example/src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-1', 'react']
      },
      exclude: /node_modules/
    }]
  }
};
