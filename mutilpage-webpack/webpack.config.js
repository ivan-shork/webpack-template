const {entry, htmlWebpackPlugins} = require('./entry.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path')

module.exports = {
  devtool: "source-map",
  entry,
  output: {
    filename: '[name]/js/[name].[chunkhash:8].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '../'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.css', '.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 排除文件
        loader: 'babel-loader'
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap:true
            }
          },
        ]
        
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'img',
              name: "[name].[hash:6].[ext]",
              // 新版本file-loader中esModule属性默认为true 即默认使用ES模块语法导致了引用图片文件的方式和以前的版本不一样
              esModule: false
            }
          }
        ]
　　　},
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    // 样式单独抽取
    new MiniCssExtractPlugin({	
      filename: '[name]/css/[name].[hash:8].css', // 最终输出的文件名	
      chunkFilename: '[name]/css/[id].css'	
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
          //打包公共模块
          commons: {
              chunks: 'initial', //initial表示提取入口文件的公共部分 all则表示项目所有公共引用（不止入口文件）
              minChunks: 2, //表示提取公共部分最少的文件数
              minSize: 0, //表示提取公共部分最小的大小
              name: 'commons' //提取出来的文件命名
          }
      }
    }
  }
}