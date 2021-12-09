module.exports = {
	name: "say",
	description: "Make me repeat what you want me to say",
		run: async (client, message, args) => {
			const command = args.join(" ");
			if(!command) return message.reply('There were no commands given!');
    try {
			message.channel.send(command);
		} catch (error) {
			console.error(error);
			message.channel.send(error);
		};
  },
};