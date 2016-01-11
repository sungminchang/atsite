var webpack = require('webpack');


module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.css$/, 
        loader: 'style!css' 
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=8192'
      },
      { 
        test: /\.(otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};