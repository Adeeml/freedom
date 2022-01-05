const { MessageEmbed, Collection } = require('..');
const Keyv = require('keyv');
const prefixes = new Keyv(`${process.env.MONGO_URL}`);
const client = require("..");
//var ee = require("../configs/embed.json");
const config = require('../configs/config.json');
const globalPrefix = config.globalPrefix;

client.on('messageCreate', async (message) => {
	//const { escapeRegex, onCoolDown } = require("../utils/function.js");
// Ignore WebManagebot, DMs, partial messages in channels and themselves
	if (message.author.bot) return;
	if (!message.guild) return message.reply('Please send commands in a server');
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();

	let args;
// Handle messages in a guild
	if (message.guild) {
		let prefix;

		if (message.content.startsWith(globalPrefix)) {
			prefix = globalPrefix;
		} else {
			// check the guild-level prefix
			const guildPrefix = await prefixes.get(message.guild.id);
			if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
		}

// If we found a prefix, setup args; otherwise, this isn't a command
		if (!prefix) return;
		args = message.content.slice(prefix.length).trim().split(/\s+/);
	} else {
// Handle DMs
		const slice = message.content.startsWith(globalPrefix) ? globalPrefix.length : 0;
		args = message.content.slice(slice).split(/\s+/);
	}

// Get the first space-delimited argument after the prefix as the command
	const command = args.shift().toLowerCase();
// Send the command
  await command.run(client, message, args, prefix);
});