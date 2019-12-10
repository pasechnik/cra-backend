/**
 * Created by vlad on 22.09.16.
 */
var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.join(__dirname, './src/bin/server.js'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'build/bin'),
    filename: 'server.bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json' },
    ],
  },
}
