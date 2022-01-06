const { Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'nt',
    description: 'nickname test',
    run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let nNick = args.slice(1).join(" ");
    if (!user) return message.reply('Please mention a user to change');
    if (!nNick) user.member.setNickname(message.content.replace('No-Name'));
    if (nNick) nNick = user.member.setNickname(nNick);

        const nick = new MessageEmbed()
          .setTitle('Nickname changed!')
          .addField('Original', `${user}`)
          .addField('New', `${nNick}`)
          .setFooter('Someone\'s name was changed...')
    
      message.reply({ embeds: [nick] });
    }
}