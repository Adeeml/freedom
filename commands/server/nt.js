const { Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'nt',
    description: 'nickname test',
    run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let nNick = args.slice(2).join(" ");
    if (!user) return message.reply('Please mention a user to change');
    if (!nNick) nNick = "No-Name"

        const nick = new MessageEmbed()
          .setTitle('Nickname changed!')
          .addField('Original', )
          .addField('New |', `${nick}`)
    
      message.reply({
        content: 'Nick',
        embed: [nNick]
    });
    }
}