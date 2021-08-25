
const path = require('path');
// css单独抽取出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清空dist插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// vue-loader需额外配置的插件
const {VueLoaderPlugin} = require('vue-loader')

const  AuthorPlugin  = require('./myplugin.js');


// bundle分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 项目名称
const projectName = path.resolve(__dirname).split(path.sep).pop()
// 环境
const isDev = process.env.NODE_ENV === 'development' ? true: false


const webpackConfig = {
    // 常用：cheap-module-eval-source-map
    // 线上：cheap-module-source-map
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
        publicPath: `/static/${projectName}`,
        filename: 'js/app.js',
        path: path.resolve(__dirname, 'dist', projectName)
    },
    resolve: {
      // 没有文件后缀是默认找这些文件
      extensions: ['.js', '.jsx', '.scss', '.css'],
      // 没有指定文件时默认找文件夹下的这些文件
      mainFiles:["index", "default"],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(sc|c)ss$/,
          use: 
          [
            // "style-loader", 
            // 样式单独抽取
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
            "postcss-loader",
            {
              loader: 'sass-loader',
              options: {
                sourceMap:true
              }
            },
            // 全局引入
            { 
              loader: 'sass-resources-loader',
              options: {
                sourceMap: true,
                resources: [
                  './src/style/mixin.scss',
                ]
              }
            }
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
        {
          test: /\.js$/,
          exclude: /(node_modules)/, // 排除文件
          loader: 'babel-loader'
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },
    plugins: [	
      // 样式单独抽取
      new MiniCssExtractPlugin({	
        filename: 'css/[name].css', // 最终输出的文件名	
        chunkFilename: 'css/[id].css'	
      }),	
      new HtmlWebpackPlugin({	
        title: "leo study!",   // 生成的文件标题	
        filename: "webpack.html", // 最终生成的文件名
        template: 'src/index.html',	
        minify: { // 压缩选项	
          collapseWhitespace: false, // 移除空格	
          removeComments: true, // 移除注释	
          removeAttributeQuotes: true, // 移除双引号	
        }	
      }),
      // 清空dist插件
      new CleanWebpackPlugin(),
      // vue-loader需要额外配置的plugin
      new VueLoaderPlugin(),
      // bundle分析
      // new BundleAnalyzerPlugin()

      new AuthorPlugin({
        author: 'aven',
        email: "4022312312@qq.com",
        homePage: 'index.com'
      })
    ]
}

if(isDev) {
  webpackConfig.devServer = {
    // 启动的服务端口
    port: 8000,
    // 通过localhost或IP进行访问
    host: 'localhost',
    // 若编译过程中有错误，显示到网页上,便于定位错误
    overlay: {
      errors: true,
    },
    open:true,
    //热加载
    hot: true
  }
}

module.exports = webpackConfig