/* 
author=lucky
http-request ^.*?kuwo\.cn/music\.pay\?newver=3$ script-path=https://raw.githubusercontent.com/mw418/Loon/main/script/kuwo_header.js, tag=替换请求头, requires-body = true
 */

let method = $request.method;
if(method.toLowerCase() == 'post'){
    //替换请求头
    body = $request.body.replace(/(?<=ids\=)\d+/, 6588259)
    console.log(`替换后的请求体${body}`)
}
$done({body:body})