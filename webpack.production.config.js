var webpack=require("webpack");
var path = require('path');
var glob = require('glob');
var srcDir = path.resolve(process.cwd(), 'app');

//提取样式
var extractTextPlugin=require("extract-text-webpack-plugin");
//生成html
var HtmlWebpackPlugin = require('html-webpack-plugin');
var plugins=[];

//提取公共资源
plugins.push(new webpack.optimize.CommonsChunkPlugin('js/common',"[name]-[id].js"));
//公共样式独立单独的css
plugins.push(new extractTextPlugin("css/common-[id].css",{allChunks: true}));
plugins.push(new webpack.NoErrorsPlugin());

/*
 //遍历入口js,该配置适合多入口
 var entryJS=glob.sync(srcDir + '/js/*.js');
 var map={};
 entryJS.forEach(function(filePath){
 var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
 map[filename] = filePath;

 });
 */
//遍历入口html
var entryHtml = glob.sync(srcDir + '/*.html');
entryHtml.forEach(function(filePath){
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    var conf = {
        template: filePath,
        filename: filename + '.html',
        hash:true,
        inject:true
    }
    //if(filename in entries) {
    //    conf.inject = 'body'
    //    conf.chunks = ['js/common', 'js/router', filename]
    //}
    plugins.push(new HtmlWebpackPlugin(conf));

});
var webPackConfig = {
    entry:{
        'js/router':srcDir+'/router.js',
        'js/common':['mui']
    }
    ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[id].js',
        chunkFilename: 'js/[name]-[id].js'
        //publicPath:"http://baidu.com/"//图片前缀url
    },
    resolve: {
        root:path.resolve(__dirname,'app'),
        extensions: ['', '.js'],
        alias: {
            mui:    'js/lib/mui.min.js',
            muicss: 'js/lib/mui.min.css',
            base:'style/base.less',
            tpl:'js/template'
        }
    },
    module:{
        noParse:['mui','muicss'],
        loaders:[
            {
                test: /\.(less)$/,
                loader: 'style!css!less'
            },
            {
                test:/\.css$/,
                loader:extractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'url?limit=25000&name=images/[name].[ext]',
                ]
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs'
            },
            {
                // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
                test: /\.woff$/,
                loader: "url?limit=10000&name=fonts/[name].[ext]&minetype=application/font-woff"
            }, {
                test: /\.ttf$/,
                loader: 'url?limit=10000&name=fonts/[name].[ext]'
            }, {
                test: /\.eot$/,
                loader: "file"
            }, {
                test: /\.svg$/,
                loader: "file"
            }

        ]
    }
};
webPackConfig.plugins=plugins;
module.exports=webPackConfig;