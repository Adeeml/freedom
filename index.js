const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const colors = require('colors');
const fs = require('fs');
const ee = require('./configs/embed.json');
const winston = require('winston');
const config = require('./configs/config.json');
const defaultPrefix = config.defaultPrefix;

const client = new Client({
	messageCacheLifetime: 60,
	fetchAllMembers: false,
	messageCacheMaxSize: 10,
	restTimeOffset: 0,
	restWsBridgetimeout: 100,
	shards: 'auto',
	// shardCount: "1",
	allowedMentions: {
		parse: ['roles', 'users', 'everyone'],
		repliedUser: true,
	},
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_MESSAGE_REACTIONS',
		'GUILD_MESSAGES',
	],
});
module.exports = client;

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'logs.txt' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

const Errorhandler = require('discord-error-handler');
const handle = new Errorhandler(client, {
	webhook: { id: process.env.webhook_id, token: process.env.webhook_token },
});

client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));
process.on('uncaughtException', error => {
	logger.log('error', error);
});

logger.exitOnError = false;

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync('./commands/');

['command', 'event', 'slash'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.token);

process.on("unhandledRejection", (reason, p) => {
	console.log(reason, p)
	handle.createrr(client, undefined, undefined, reason, p)
})
process.on("uncaughtException", (err, origin) => {
	console.log(err, origin)
	handle.createrr(client, undefined, undefined, err, origin)
})
process.on("multipleResolves", (type, promise, reason) => {
	console.log(type, promise, reason)
	handle.createrr(client, undefined, undefined, type, promise, reason)
})