const { Client, Message, MessageEmbed, Collection, Intents } = require("discord.js");

module.exports = {
	name: "stop",
	description: "Stops me if I won't go offline, due to 2 or more bot instances",
	run: async (client, message) => {
  	if (message.author.id !== "585251212321095690")
	  return message.reply(
     `This command can only be used by VenomousSteam81#7772!`
  	);
	  message.reply('STOPPING...')
	  	.setTimeout(function(){
	  console.log('STOPPED ALL PROCESSES'),
	  process.exit();
		  }, 2000);
	},
};