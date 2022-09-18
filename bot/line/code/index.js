const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

const zikan_request = require('request');
const URL = 'http://zikanwari/api/tomorrow.php';

var send1 = '取得';
var send2 = 'してるのだろうか';

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.sendStatus(200)
})

app.post("/webhook", function(req, res) {
  res.send("HTTP POST request sent to the webhook URL!")
  // ユーザーがボットにメッセージを送った場合、返信メッセージを送る
  console.log(req.body.events);
  if (req.body.events[0].type === "message") {
    getdata(send1, send2)
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

function getdata(msg1, msg2) {
    var time = 0;
  
  zikan_request.get({
    uri: URL,
    headers: {'Content-type': 'application/json'},
  }, function(err, req, data){
    a = data.split(',');
    a.pop();
    msg1 = '明日(' + a[6] + ')の時間割は、';
    for(x in a){

        sub = a[x];

        time++;

        if (time > 6) {
          break;
        }

        msg2 += time + '時間目：' + sub;
    }
    

    // 文字列化したメッセージデータ
    const dataString = JSON.stringify({
      replyToken: req.body.events,
      messages: [
        {
          "type": "text",
          "text": msg1
        },
        {
          "type": "text",
          "text": msg2
        }
      ]
    })

    // リクエストヘッダー
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    }

    // リクエストに渡すオプション
    const webhookOptions = {
      "hostname": "api.line.me",
      "path": "/v2/bot/message/reply",
      "method": "POST",
      "headers": headers,
      "body": dataString
    }

    // リクエストの定義
    const request = https.request(webhookOptions, (res) => {
      res.on("data", (d) => {
        process.stdout.write(d)
      })
    })

    // エラーをハンドル
    request.on("error", (err) => {
      console.error(err)
    })

    // データを送信
    request.write(dataString)
    request.end()

  });
}