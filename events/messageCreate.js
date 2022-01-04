const { MessageEmbed, Collection } = require('..');
const Keyv = require('keyv');
const prefixes = new Keyv(`${process.env.MONGO_URL}`);
const client = require("..");
//var ee = require("../configs/embed.json");
const config = require('../configs/config.json');
const globalPrefix = config.globalPrefix;

client.on('messageCreate', async (message) => {
	// Ignore WebManagebot, DMs, partial messages in channels and themselves
	if (message.author.bot) return;
	if (!message.guild) return message.reply('Please send commands in a server');
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();

	const command = client.commands.get(cmd.toLowerCase());
	const cmd = args.shift().toLowerCase();
	let args;
	// handle messages in a guild
	if (message.guild) {
		let prefix;

		if (message.content.startsWith(globalPrefix)) {
			prefix = globalPrefix;
		} else {
			const guildPrefix = await prefixes.get(message.guild.id);
			if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
		}

		if (!prefix) return;
		args = message.content.slice(prefix.length).trim().split(/\s+/);
	} else {
		const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
		args = message.content.slice(slice).split(/\s+/);
	}

	if (!command) return;
	if (command) {
	  if (!message.member.permissions.has(command.permissions || []))
		return message.channel.send('You do not have the perms to complete such actions...');
  
	  //Check if user is on cooldown with the cmd, with Tomato#6966's Function from /handlers/functions.js
	  if (onCoolDown(message, command)) {
		let cool = new MessageEmbed()
		.setDescription(`❌ Please wait ${onCoolDown(message, command)} more second(s) before reusing the ${command.name} command.`)
		return message.channel.send({embeds : [cool]})
	  }
	  await command.run(client, message, args, prefix);
	};
});