const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const glob = require('glob')
const fs = require('fs')
const setMPA = ()=> {
  let entry = {}, htmlWebpackPlugins = []
  let reg = "./src/pages/*/main.js"
  const files = glob.sync(reg)
  console.log(files)
  files.forEach(file=> {
      // 指定入口
       const regPage = /pages\/(.*)\//
       const pageName = file.match(regPage)[1]
       entry[pageName] = file
       // 模板html
       const filesBox = fs.readdirSync(`./src/pages/${pageName}`)
       console.log(filesBox)
       const htmlName = filesBox.find(item=> /\.html/.test(item))
       const templatePath = htmlName === undefined
       ?  path.join(__dirname, `./src/pages/default.html`)
       :  path.join(__dirname, `./src/pages/${pageName}/${htmlName}`)
       htmlWebpackPlugins.push(
         new htmlPlugin({
           template: templatePath,
           filename: `${pageName}/${pageName}.html`,
           // 配置后webpack就知道哪个html对应哪个入口文件
           // common 指定公共使用的部分
           chunks: [pageName, 'commons'],
           inject: true,
           minify: { //压缩代码
            html5: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
         })
       )
    })
  return {
    entry,
    htmlWebpackPlugins
  }
}

module.exports = setMPA()