// const fs = require('fs')
// const path = require('path')
// function formatDate(date) {
//   const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
//   const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
//   return `${date.getFullYear()}-${month}-${day}`
// }

// const defaultOptions = {
//   bannerTemplate: 'bannerTemplate.txt',
//   author: 'ivan',
//   time: formatDate(new Date())
// }

// function render(source, templatePath, bannerObj, callback) {
//   let template, reg = /{(.*?)}/gi 
//   fs.readFile(templatePath, 'utf-8', (err, data)=> {
//     if(err) {
//       callback(err)
//     } else {
//       template = data.replace(reg, (match, key)=> {
//         return bannerObj[key] || key
//       })
//       source = `
//         ${template}
//         ${source}
//       `
//        callback(null, source)
//     }
//   })
  
// }

// module.exports = function(source) {
//   const options = Object.assign(defaultOptions, this.query)
//   const {bannerTemplate, author, time} = options
//   const callback = this.async()
//   const templatePath = path.resolve(__dirname, bannerTemplate)
//   render(source, templatePath, {author, time}, callback)
// }

// banner-loader
const path = require('path');
const fs = require('fs');
const configTextPath = "bannerTemplate.txt";
// 拼接完整的配置文件路径
const fullConfigPath = path.resolve(__dirname, configTextPath);
// 根据模板中的占位符，来获取数据
const configItemMap = {
    author: "laibao101",
    time: new Date().toLocaleString()
};
// 匹配占位符
const reg = /{(\w+)}/gi;

function loader (source) {
    console.log(source);
    const callback = this.async();
    fs.readFile(fullConfigPath, (err, data) => {
        if (err) {
            // 如果读取文件失败，返回错误
            callback(err);
        }
        // 获取文件内容
        const template = data.toString();
        // 根据模板，修改占位符数据，完成banner
        const banner = template.replace(reg, (match, key) => {
            return configItemMap[key] || key;
        });
        // 拼接返回值
        const ret = `
            ${banner}
            ${source}
        `
        callback(null, ret);
    });
}

module.exports = loader;