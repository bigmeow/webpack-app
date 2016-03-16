/**
 * Created by running on 16/3/11.
 */
var tpl_html=require('../tmpl/login.tpl')();
require('../style/login.less');
module.exports={
    init:function(){
        alert("我是login init方法"+tpl_html);
    }


};