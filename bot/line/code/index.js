const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN
const hookurl = "https://discord.com/api/webhooks/995612303338770483/2yY8MHhKYuJxyUOx392NHcBKqk-26UbJvOS8jckzG5JAh3LQAa4QZS05sbQUyxy-l3Zo";

const senddis = require("linetodiscord");
senddis.setup(hookurl);

const zikan_request = require('request');
const URL = 'http://zikanwari/api/tomorrow.php';

var send1 = '取得';
var send2 = '';
var sdgs10;

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
  if (req.body.events[0].type === "message") {

    console.log(req.body.events[0].source.userId);
    console.log(req.body.events[0].message);
    console.log();

    //senddiscord(req.body.events[0]);
    senddis.senddiscord(req.body.events[0]);

    var msgtxt = req.body.events[0].message.text;

    switch (true) {
      case /クイズ/.test(msgtxt):
          sendcustom('パンはパンでも食べられないパンを食ーべたっ', req.body.events[0].replyToken);
          break;
      case /sdgs/gi.test(msgtxt):
          if (/10|１０|十/.test(msgtxt)) {
            sdgs10 = null;
            for (let i = 0; i < 11; i++) {
              sdgs10 += sdgs() + '\n';
            }
            sendcustom(sdgs10, req.body.events[0].replyToken)
          } else {
            sendcustom(sdgs(), req.body.events[0].replyToken);
          }
          break;
  
      default:
          if (/[月火水木金土日]曜日/.test(msgtxt)) {
            console.log('曜日 was sent(?)');
          }
          getdata(send1, send2, req.body.events[0].replyToken)
          break;
  }}
})

app.listen(PORT, () => {
  console.log(`LineBot app listening at http://localhost:${PORT}`)
})

function getdata(msg1, msg2, replyToken) {
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

        msg2 += time + '時間目：' + sub + '\n';
    }
    
    // 文字列化したメッセージデータ
    msg2 += 'です。'
    const dataString = JSON.stringify({
      replyToken: replyToken,
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

    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + TOKEN
    }

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


function sendcustom(text, replyToken) {
  const dataString = JSON.stringify({
    replyToken: replyToken,
    messages: [
      {
        "type": "text",
        "text": text
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
}

function sdgs() {
  kamiku = ['質の高い教育を','健康と福祉を','住み続ける街づくりを','働きがいも経済成長も','海の豊かさを','平和と公正を','飢餓を','ジェンダー平等を','安全な水とトイレを']
  shimoku = ["ゼロに","なくそう","実現しよう","みんなに","世界中に","すべての人に"]
  r1 = Math.floor(Math.random() * kamiku.length)
  r2 = Math.floor(Math.random() * shimoku.length)

  return kamiku[r1] + shimoku[r2];
}