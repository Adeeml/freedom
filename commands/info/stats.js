const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const config = require('../../configs/config.json');

module.exports = {
	name: "stats",
	aliases: [ "botinfo", "status", "debug", "deb" ],
	description: 'Show my \`status\`',
	run: async (client, message, args, prefix) => {
		let ramUsage = process.memoryUsage().heapUsed / 1024;
		const d = moment.duration(message.client.uptime);
		const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
		const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
		const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
		const mainStats = stripIndent`
	  	  Owner      :: VenomousSteam81
	  	  Host       :: Railway + Github
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
		  Tokens     :: 6 token resets
		  Type       :: Stable
	`;

		const embed = new MessageEmbed()
			.setTitle('Bot\'s Statistics')
			.addField('Commands', `\`${message.client.commands.size}\` commands`, true)
			.addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
			.addField('Main', `\`\`\`asciidoc\n${mainStats}\`\`\``)
			.addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
			.addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
			.addField('Extra stuff', `\`\`\`asciidoc\n${extraStats}\`\`\``)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		message.channel.send({ embeds: [embed] });
	},
};
