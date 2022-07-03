const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const https = require('https');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.cache.get('970989571737288714').send('BOTが起動しました。')
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  message.reply('明日の時間割は、');
});

client.login(process.env.TOKEN);