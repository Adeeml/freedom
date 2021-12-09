const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'testb',
    description: 'test w/buttons',
    run: async (client, interaction, args) => {
        const e = new MessageEmbed()
            .setTitle('test w/buttons')
            .setDescription('test w/buttons')
        
        const r = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('1')
                .setLabel('1')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('2')
                .setLabel('2')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('3')
                .setLabel('BAD')
                .setStyle('DANGER')
                .setDisabled('true')
        );
    await interaction.reply({ content: 'b', embeds: [e], components: [r] })
    }
}