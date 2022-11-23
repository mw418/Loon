/*
脚本作者：DecoAri
引用地址：https://github.com/DecoAri/JavaScript/blob/main/Surge/TF_keys.js
*/
$persistentStore.write(null, 'request_id')
let url = $request.url
let key = url.replace(/(.*accounts\/)(.*)(\/apps)/, '$2')
let session_id = $request.headers['X-Session-Id']
let session_digest = $request.headers['X-Session-Digest']
let request_id = $request.headers['X-Request-Id']
let ua = $request.headers['User-Agent']
$persistentStore.write(key, 'key')
$persistentStore.write(session_id, 'session_id')
$persistentStore.write(session_digest, 'session_digest')
$persistentStore.write(request_id, 'request_id')
$persistentStore.write(ua, 'tf_ua')
console.log($persistentStore.read('request_id'))
if ($persistentStore.read('request_id') !== null) {
  $notification.post('请关闭本脚本', '信息获取成功','')

} else {
  $notification.post('信息获取失败','请打开MitM开关','')
}
$done({})