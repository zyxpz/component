const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (params) {
  const {
    htmlPath,
    path
  } = params;

  let arr = [];

  for (const k in htmlPath) {
    arr.push(new HtmlWebpackPlugin({
      filename: `${k}.html`,
      inject: false,
    }))
  }
  return arr;
}