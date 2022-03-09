const { Client, Message, MessageEmbed, Formatters } = require("discord.js");
const child = require('child_process');

module.exports = {
	name: "exec",
	description: "Executes remote commands from discord to railway",
	aliases: "cmd",
	run: async (client, message, args) => {
  if (message.author.id !== "585251212321095690")
	  return message.reply(
     `This command can only be used by VenomousSteam81#7772!`
  	);
		const command = args.join(" ");
		if(!command) return message.reply('There were no commands given!');
		child.exec(command, (err, res) => {
			if(err) return console.log(err);
			message.channel.send(res.slice(0, 2000), { code: 'js'});
		});
	},
};