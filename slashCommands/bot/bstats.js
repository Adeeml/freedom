const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const config = require('../../configs/config.json');
const prefix = config.prefix;

module.exports = {
	name: "stats",
	description: 'Shows my \`debug\` info',
	run: async (client, interaction, args) => {
		let ramUsage = process.memoryUsage().heapUsed / 1024;
		const d = moment.duration(message.client.uptime);
		const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
		const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
		const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
		const mainStats = stripIndent`
					Owner      :: VenomousSteam81
					Host       :: Replit
					Prefix     :: ${config.prefix}
				`;
		const clientStats = stripIndent`
          Servers    :: ${message.client.guilds.cache.size}
          Users      :: ${message.client.users.cache.size}
          Channels   :: ${message.client.channels.cache.size}
          WS Ping    :: ${Math.round(message.client.ws.ping)}ms
          Uptime     :: ${days}, ${hours}, ${minutes}
       `;
		const { totalMemMb, usedMemMb } = await mem.info();
		const serverStats = stripIndent`
          OS         :: ${await os.oos()}
          Cores      :: ${cpu.count()}
          CPU Usage  :: ${await cpu.usage()} %
          RAM        :: ${totalMemMb} MB
          RAM Usage  :: ${ramUsage} MB
        `;
		const extraStats = stripIndent`
				Instances    :: 2 instances
				Tokens       :: 5 token resets
				`;

		const embed = new MessageEmbed()
			.setTitle('Bot\'s Statistics')
			.addField('Commands', `\`${message.client.commands.size}\` commands`, true)
			.addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
			.addField('Main', `\`\`\`asciidoc\n${mainStats}\`\`\``)
			.addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
			.addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
			.addField('Extra stuff', `\`\`\`asciidoc\n${extraStats}\`\`\``)
			.setFooter('this is a footer')
			.setTimestamp()
		await interaction.reply({ content: 'my status', embeds: [embed] });
	},
};