let method = $request.method;
if(method.toLowerCase() == 'post'){
    //替换请求头
    body = $request.body.replace(/(?<=ids\=)\d+/, 6588259)
    console.log(`替换后的请求体{body}`)
}
$done({body:body})