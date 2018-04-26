var http = require('http');
var fs = require('fs');//引入文件读取模块

var documentRoot = 'E:/front';
//需要访问的文件的存放目录

var server= http.createServer(function(req,res){

    var url = req.url;
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html

    var file = documentRoot + url;
    console.log(url);

    fs.readFile( file , function(err,data){
    /*
        err为文件路径
        data为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            data为读取成功返回的文本内容
    */
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);
            res.end();

        }

    });

}).listen(8888);

console.log('服务器开启成功');
