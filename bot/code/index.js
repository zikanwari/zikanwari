const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const request = require('request');
const URL = 'http://zikanwari/api/tomorrow.php';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.cache.get('970989571737288714').send('BOTが起動しました。')
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== '968100689177870376') return;

  var time = 0;
  
  request.get({
    uri: URL,
    headers: {'Content-type': 'application/json'},
  }, function(err, req, data){
    a = data.split(',');
    a.pop();
    message.reply('明日(' + a[6] + ')の時間割は、');
    /*for(x in a){

        sub = a[x];

        time++;

        if (time > 6) {
          break;
        }

        message.channel.send(time + '時間目：' + sub);

    }
    message.channel.send('です。');
    message.channel.send(
      {embed: {
        color: 7506394,
        author: {
          name: a[6] + "曜日の日課表",
          icon_url: "https://zikanwari.f5.si/favicon.ico"
        },
        title: "Web版はこちら",
        url: "https://zikanwari.f5.si",
        footer: {
          icon_url: client.user.avatarURL,
          text: "時間割通知システム"
        },
        fields: [
          {
            name: ":one:" + a[0],
            value: "a"
          },
          {
            name: ":two:" + a[1],
            value: "a"
          },
          {
            name: ":three:" + a[2],
            value: "a"
          },
          {
            name: ":four:" + a[3],
            value: "a"
          },
          {
            name: ":five:" + a[4],
            value: "a"
          },
          {
            name: ":six:" + a[5],
            value: "a"
          }
        ]
      }}
    );*/
    message.channel.send(
      {embed: {
        color: 7506394,
        fields: [
          {
            name: "field :one:",
            value: "1つめのfieldだよ"
          },
          {
            name: "field :two:",
            value: "2つめのfieldだよ"
          },
          {
            name: "field :three:",
            value: "3つめのfieldだよ"
          },
          {
            name: "field :four:",
            value: "4つめのfieldだよ"
          },
          {
            name: "field :five:",
            value: "5つめのfieldだよ"
          }
        ]
      }}
    );
  }); 

});

client.login(process.env.TOKEN);