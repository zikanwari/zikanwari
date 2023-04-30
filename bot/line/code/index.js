const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN
const hookurl = "https://discord.com/api/webhooks/1102075687831085077/DU-4r_yg1ukqjwuKUBeB6rmGp3fO19Ht74GItrTwoybjB5xMPLxk8L9rOOUjoQnihZB0";

const senddis = require("linetodiscord");
senddis.setup(hookurl);

const zikan_request = require('request');

var send1 = '取得';
var send2 = '';
var sdgs10;
var week = {月:0, 火:1, 水:2, 木:3, 金:4};

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
      case /使い方|つかいかた/.test(msgtxt):
            sendcustom('使い方→これが出ます\nSDGsガチャ→ランダムな単語が出ます\nSDGs10連ガチャ→10連です\n○曜日の日課表→その曜日の時間割が出ます\nそれ以外→明日の時間割が出ます', req.body.events[0].replyToken);
            break;
      case /sdgs/gi.test(msgtxt):
          if (/10|１０|十/.test(msgtxt)) {
            sdgs10 = '';
            for (let i = 0; i < 10; i++) {
              sdgs10 += sdgs() + '\n';
            }
            sendcustom(sdgs10, req.body.events[0].replyToken)
          } else {
            sendcustom(sdgs(), req.body.events[0].replyToken);
          }
          break;
  
      default:
          if (/[月火水木金]曜/.test(msgtxt)) {
            console.log('曜日 was sent(?)');
            var youbi = msgtxt.match(/([月火水木金])曜/);
            var weeknum = youbi[1];
            getdata(send1, send2, req.body.events[0].replyToken, 'http://zikanwari/api/tomorrow.php?w=' + week[weeknum])
          } else {
            getdata(send1, send2, req.body.events[0].replyToken, 'http://zikanwari/api/tomorrow.php')
          }
          
          break;
  }}
})

app.listen(PORT, () => {
  console.log(`LineBot app listening at http://localhost:${PORT}`)
})

function getdata(msg1, msg2, replyToken, url) {
    var time = 0;
  
  zikan_request.get({
    uri: url,
    headers: {'Content-type': 'application/json'},
  }, function(err, req, data){
    a = data.split(',');
    a.pop();
    msg1 = a[7] + '曜日の時間割は、';
    for(x in a){

        sub = a[x];

        time++;

        if (time > 7) {
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