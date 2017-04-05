const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './app/scripts/app.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
  ]
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build/scripts'),
    publicPath: "/scripts/"
  },
  devServer: { 
    inline: true,
    port: 3000,
    host: '0.0.0.0',
    contentBase: 'build/'
  }
};