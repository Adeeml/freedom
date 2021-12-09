const fs = require("fs");
const { Client, Message, MessageEmbed, Collection, Intents } = require("discord.js");

module.exports = {
	name: 'reload',
	description: 'Reload commands without hassle',
	run: async (client, message, args) => {
	if (message.author.id !== "585251212321095690")
	  return message.reply(
     `This command can only be used by VenomousSteam81#7772!`
  	);
		const commandName = args[0];
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
		} catch (error) {
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};