const globalPrefix = require('../../configs/config.json');
const prefixes = require('../../configs/prefixes.json');
const Keyv = require('@keyv/mongo');

module.exports = {
    name: 'prefix',
    description: 'Set my prefix',
    permissions: 'ADMINISTRATOR',
run: async (client, message, args) => {
    const nPrefix = args[0];
    if (!nPrefix) return message.reply('Insert a prefix, or I cant set the prefix...')

    try {
        await prefixes.set(message.guild.id, args[0]);
        return message.channel.send(`Successfully set prefix to \`${args[0]}\``);
    } catch (error) {
        console.log(error)
    }

    return message.channel.send(`Prefix is \`${await prefixes.get(message.guild.id) || globalPrefix}\``);
}}