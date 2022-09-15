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
  if (message.channel.id !== ('968100689177870376' || '970989571737288714')) return;

  var time = 0;
  
  request.get({
    uri: URL,
    headers: {'Content-type': 'application/json'},
  }, function(err, req, data){
    a = data.split(',');
    a.pop();
    message.reply('明日(' + a[6] + ')の時間割は、');
    for(x in a){

        sub = a[x];

        time++;

        if (time > 6) {
          break;
        }

        message.channel.send(time + '時間目：' + sub);

    }
    message.channel.send('です。');
  }); 

});

client.login(process.env.TOKEN);