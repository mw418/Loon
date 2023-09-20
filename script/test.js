const cookieName = '任务领取'
const signurlKey = 'zsn_signurl_kqxt'
const signheaderKey = 'zsn_signheader_kqxt'
const chavy = init()
const signurlVal = chavy.getdata(signurlKey)
const signheaderVal = chavy.getdata(signheaderKey)
chavy.log(`cookieName:${cookieName}\n\nsignurlVal:${signurlVal}\n\nsignheaderVal: ${signheaderVal}\n\n`)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function randomSleep() {
    const minTime = 1000; // 最短休眠时间
    const maxTime = 5000; // 最长休眠时间
    const sleepTime = Math.floor(Math.random() * (maxTime - minTime) + minTime);
    console.log(`休眠 ${sleepTime} 毫秒`);
    await sleep(sleepTime);
    console.log(`休眠结束`);
    await sign();
  }

randomSleep();
function sign() {
  console.log(`开始签到`);
  const url = { url: signurlVal, headers: JSON.parse(signheaderVal) }
  url.body = 'inorout=1&ips=&cip=&deviceid=67053f61bfc847346ccc4ec214c57b04'
  chavy.post(url, (error, response, data) => {
    chavy.log(`${cookieName}, data: ${data}`)
    let subTitle = ''
    let detail = ''
    if (data.indexOf('localtiontext_signout') >= 0) {
      subTitle = `签到结果: 成功`
      detail = `修仙遭罪😑`
    } else {
      subTitle = `签到结果: 失败`
      detail = `没签上❓❓❓`
    }
    chavy.msg(cookieName, subTitle, detail)
    chavy.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}