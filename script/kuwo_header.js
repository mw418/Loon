let method = $request.method;
let body = $response.body;
console.log(method, body)
if(method == 'post'){
    //替换请求头
    
    $response.body = body.replace(/(?<=ids\=)\d+/, 6588259)
    console.log('开始替换', $response.body)
}
$done({})