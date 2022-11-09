{
  "id": "test.app.sub",
  "name": "test",
  "author": "@test",
  "icon": "https://avatars2.githubusercontent.com/u/21050064?s=460&u=40a74913dd0a3d00670d05148c3a08c787470021&v=4",
  "repo": "https://github.com/mw418/Loon",
  "apps": [
    {
      "id": "Flow",
      "name": "机场流量查询",
      "keys": [
        "@flow.subscriptions"
      ],
      "settings": [
        {
          "id": "@flow.subscriptions",
          "name": "机场订阅",
          "val": "[\n\t{\n\t\t\"link\": \"订阅地址1\",\n\t\t\"name\": \"取个名字1\",\n\t\t\"icon\": \"https://raw.githubusercontent.com/Orz-3/mini/master/pudding.png\"\n\t},\n\t{\n\t\t\"link\": \"订阅地址2\",\n\t\t\"name\": \"取个名字2\",\n\t\t\"icon\": \"https://raw.githubusercontent.com/Orz-3/mini/master/Nexitally.png\"\n\t}\n]",
          "type": "textarea",
          "autoGrow": true,
          "rows": 5,
          "desc": "机场订阅 (JSON 格式)"
        }
      ],
      "author": "@Peng-YM",
      "repo": "https://github.com/Peng-YM/QuanX",
      "icons": [
        "https://raw.githubusercontent.com/58xinian/icon/master/flow_mini.png",
        "https://raw.githubusercontent.com/58xinian/icon/master/flow.png"
      ],
      "script": "https://raw.githubusercontent.com/mw418/Loon/main/script/flow.js"
    }
  ]
}