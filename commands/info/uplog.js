const { MessageEmbed, Message, Client } = require("discord.js");
const config = require('../../configs/config.json');

module.exports = {
	name: "updates",
	description: "Shows my latest changelog",
	aliases: ["changelog", "update", "uplog", "cl"],
	run: async (client, message, args) => {
		const allVerInfo = stripIndent`
	Current    :: 1.2.0
	Last       :: 1.0.1
	`;
		const changeLogM = stripIndent`
	* Added the \`8ball\` command
	`;
		const changeLogD = stripIndent`
	* Since my REPLIT Hacker plan for \`schools\` finally ran out, I am hosting with Railway. Do {config.prefix}stats for more info.
	`;
		
		const embed = new MessageEmbed()
			.setTitle('**Bot Changelog**')
			.setDescription('You might ask \`What does the x.x.x mean?\` Well, here it is! \n major ver.minor ver.sml features ver')
			.addField('All Version Info', `\`\`\`asciidoc\n${allVerInfo}\`\`\``)
			.addField('Main Changelogs', `\`\`\`asciidoc\n${changeLogM}\`\`\``)
			.addField('Debug Changelogs', `\`\`\`asciidoc\n${changeLogD}\`\`\``)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		message.channel.send({ embeds: [embed] });
	},
};
