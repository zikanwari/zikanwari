const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const request = require('request');
const URL = 'https://zikanwari.f5.si/api/tomorrow.php';
var time = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.cache.get('970989571737288714').send('BOTが起動しました。')
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  message.reply('明日の時間割は、');
  
  request.get({
    uri: URL,
    headers: {'Content-type': 'application/json'},
}, function(err, req, data){
    a = data.split(',');
    a.pop();
    for(x in a){
        sub = a[x];
        time++;
        message.channel.send(time + '時間目：' + sub);
    } 
  }); 
});

client.login(process.env.TOKEN);