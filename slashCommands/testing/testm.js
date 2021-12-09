const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'testm',
    description: 'test w/menu',
    run: async (client, interaction, args) => {
        const e = new MessageEmbed()
            .setTitle('test w/buttons')
            .setDescription('test w/buttons')
        
        const r = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Select me',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                ]),
            );
        await interaction.reply({ content: 'm', embeds: [e], components: [r] })
    }
}