/*
脚本作者：DecoAri
引用地址：https://raw.githubusercontent.com/DecoAri/JavaScript/main/Surge/Auto_join_TF.js

需要手动写入APP_ID
配置--> 数据持久化--> 导入指定数据
key是APP_ID
value为tf链接 https://testflight.apple.com/join/LPQmtkUs 的join后的字符串(也就是此例子的“LPQmtkUs”)
监控多个tf链接，用逗号隔开。 eg:LPQmtkUs,LPQmtkUs2
*/
!(async () => {
    ids = $persistentStore.read('APP_ID')
    if (ids == '') {
      $notification.post('所有TF已加入完毕', '请手动禁用该模块', '')
    } else {
      ids = ids.split(',')
      for await (const ID of ids) {
        await autoPost(ID)
      }
    }
    $done()
  })();
  
  function autoPost(ID) {
    let Key = $persistentStore.read('key')
    let testurl = 'https://testflight.apple.com/v3/accounts/' + Key + '/ru/'
    let header = {
      'X-Session-Id': `${$persistentStore.read('session_id')}`,
      'X-Session-Digest': `${$persistentStore.read('session_digest')}`,
      'X-Request-Id': `${$persistentStore.read('request_id')}`,
      'User-Agent': `${$persistentStore.read('tf_ua')}`,
    }
    return new Promise(function (resolve, reject) {
      $httpClient.get({ url: testurl + ID, headers: header }, function (error, resp, data) {
        if (error === null) {
          resolve({ resp, data })
        } else {
          reject(error)
        }
      }
      )
    }).then(
      obj => {
        if (obj.resp.status == 404) {
          ids = $persistentStore.read('APP_ID').split(',')
          ids = ids.filter(ids => ids !== ID)
          $persistentStore.write(ids.toString(), 'APP_ID')
          console.log(ID + ' ' + '不存在该TF，已自动删除该APP_ID')
          $notification.post(ID, '不存在该TF', '已自动删除该APP_ID')
        } else {
          let jsonData = JSON.parse(obj.data)
          if (jsonData.data == null) {
            console.log(ID + ' ' + jsonData.messages[0].message)
          } else if (jsonData.data.status == 'FULL') {
            console.log(jsonData.data.app.name + ' ' + ID + ' ' + jsonData.data.message)
          } else {
            $httpClient.post({ url: testurl + ID + '/accept', headers: header }, function (error, resp, body) {
              let jsonBody = JSON.parse(body)
              $notification.post(jsonBody.data.name, 'TestFlight加入成功', '')
              console.log(jsonBody.data.name + ' TestFlight加入成功')
              ids = $persistentStore.read('APP_ID').split(',')
              ids = ids.filter(ids => ids !== ID)
              $persistentStore.write(ids.toString(), 'APP_ID')
            });
          }
        }
      },
      error => {
        $notification.post('自动加入TF', error, '')
        console.log(ID + ' ' + error)
      }
    )
  }