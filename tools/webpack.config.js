var path = require('path');

module.exports = {
  entry: './app/scripts/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: "/scripts/"
  },
  devServer: { 
    inline: true,
    port: 3000,
    host: '0.0.0.0',
    contentBase: 'build/'
  }
};