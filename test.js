const Keyv = require('keyv');
const { Client, Intents } = require('discord.js');
const config = require('./configs/config.json');
const defaultPrefix = config.defaultPrefix;

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
const prefixes = new Keyv(`${process.env.MONGO_URL}`);

client.once('ready', () => {
	console.log('Ready!'),
    client.user.setActivity('test', { type: 'PLAYING'});
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;

	let args;
	if (message.guild) {
		let prefix;

		if (message.content.startsWith(defaultPrefix)) {
			prefix = defaultPrefix;
		} else {
			const guildPrefix = await prefixes.get(message.guild.id);
			if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
		}

		if (!prefix) return;
		args = message.content.slice(prefix.length).trim().split(/\s+/);
	} else {
		const slice = message.content.startsWith(defaultPrefix) ? defaultPrefix.length : 0;
		args = message.content.slice(slice).split(/\s+/);
	}

	const command = args.shift().toLowerCase();

	if (command === 'prefix') {
		if (args.length) {
			await prefixes.set(message.guild.id, args[0]);
			return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
		}

		return message.channel.send(`Prefix is \`${await prefixes.get(message.guild.id) || defaultPrefix}\``);
	}
});

client.login(config.token);