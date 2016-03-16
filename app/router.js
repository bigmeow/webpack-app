'use strict';
//引入公用自定义样式
require("base");
var path = require('path');
var pageName=path.basename(location.pathname,".html")||"login";
loadPage(pageName,function(error,page){
    if(error){
        if(console)console.error("404...没有找到"+error.pageName+".js");
        return;
    }
    //执行模块内定义的回调
    page&&page.init&&page.init();
    page=undefined;
});
function loadPage(pageName, callback) {
    try {
        //TODO 如果html没有对应的js ,可能要做个例外处理
        var pageBundle = require("bundle!./js/" + pageName);
    } catch(e) {
        e.pageName=pageName;
        return callback(e);
    }
    pageBundle(function(page) { callback(null, page); })
}