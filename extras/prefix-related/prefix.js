const Keyv = require('keyv');
const prefixes = new Keyv(`${process.env.MONGO_URL}`);
const config = require('../../configs/config.json');
const defaultPrefix = config.defaultPrefix;

module.exports = {
    name: 'prefix',
    description: 'Set my prefix',
    permissions: 'ADMINISTRATOR',
run: async (client, message, args) => {
    if (args.length) {
        await prefixes.set(message.guild.id, args[0]);
        return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
    }

    return message.channel.send(`Prefix is \`${await prefixes.get(message.guild.id) || defaultPrefix}\``);
}}