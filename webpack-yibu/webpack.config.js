const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '[name].html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {
        preserveLineBreaks: false
      }
    })
  ]
}