const path = require('path');
const webpackMerge = require('webpack-merge');

const webpackBase = require('./webpack.base');

module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server_entry.js')
  },
  output: {
    filename: 'server_entry.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('../package.json').dependencies)
});
