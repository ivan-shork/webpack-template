const path = require('path');
module.exports = { 
    mode: 'development',
    entry: path.resolve(__dirname, './main.js'),
    module: {
        rules: [
            // {
            //     test: /\.(html)$/,
            //     use: [
            //         'file-loader?name=[name].[ext]',
            //         // 'extract-loader',
            //         {
            //             loader: path.resolve(__dirname, '../index.js'),
            //             options: {
            //                 placeholder: '{{__content__}}'
            //             },
            //         }
            //     ],
            // },
            {
                test: /\.js$/,
                loader: path.resolve(__dirname, '../bannerLoader.js'),
                options: {}
            }
        ]
    },
};
