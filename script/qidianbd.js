var objc = JSON.parse($response.body);

objc.Data.Member = {
    "ExpireTips" : "2099-09-29",
    "SubTitle" : "2099-09-09到期|权益升级！新增2万+免费有声书等福利",
    "ExpireTime" : 4092599349000,
    "ActionUrl" : "https://h5.if.qidian.com/h5/vip-card/entry?_viewmode=0",
    "ButtonTitle" : "立即续费",
    "CardId" : "member",
    "IsMember" : 1,
    "MemberType" : 1,
    "Title" : "超级起点会员",
    "IconUrl" : "https://qidian.qpic.cn/qidian_common/349573/b607187c713dc16bb9b2f09d1119843c/0",
    "IsAuto" : 0,
    "NextFeeTime" : 0
}

$done({body : JSON.stringify(objc)});