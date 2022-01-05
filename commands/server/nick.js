const { Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'nick',
    description: 'Change my or someone else\'s nickname',
    userPerms: ["MANAGE_SERVER"],
    botPerms: ["MANAGE_NICKNAMES"],
    run: async (client, message, args) => {/*
        const user = args.slice(1);
        let nick = args.slice(2);
        if (!user) return message.reply('You need to specify a user for me to change the nickname on');
        if (!nick) nick = "Another No-Name"

        const nickEmbed = new MessageEmbed()
          .setTitle('Nickname changed!')
          .addField('Original', )
          .addField('New |', `${nick}`)
    message.reply({
        content: 'Nick',

    })*/
        message.reply('This command is in staging; This command is also a placehoder for the `server` category!')
    }
}