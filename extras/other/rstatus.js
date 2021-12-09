const { MessageEmbed } = require('discord.js');
const client = require('discord.js');

module.exports = {
    name: 'rstats',
    description: 'Recommend a status for Venom to add to me',
    run: async (client, message, args) => {
        const status = args.join(" ");
        if (!status) {
            message.reply('Please give a status for me to recommend')
        };
    const i = {
        "User": `${client.author.tag}`,
        "MessageID": `${msg.channel.fetchMessage()}`,
        "Add Status": `${status}`,
    }
    
    const newStatus = new MessageEmbed()
        .setTitle(`A new status was recommended!`)
        .setFields(i)
        .setTimestamp()

    message.reply('Your status was added to the list!');
    client.channels.get('909829846018953238').send({ embeds: [newStatus] });
    }
}