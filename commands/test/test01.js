const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const assets = require('../../configs/assets.json');

module.exports = {
	name: 'test01',
	description: "test01",
	run: async (client, message, args) => {
		const positions = {
			left: 'left content',
			middle: 'middle content',
			right: 'right content',
		};
		let randomized = Math.floor(Math.random() * Object.keys(positions).length);
		let gameEnded = false;
		let randomPos = positions[Object.keys(positions)[randomized]];

		const componentsArray = [
			{
				type: 1,
				components: [
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'left',
						label: 'Left',
					},
					{
						type: 2,
						style: 'PRIMARY',
						custom_id: 'middle',
						label: 'Middle',
					},
					{
						type: 2,
						style: 'SECONDARY',
						custom_id: 'right',
						label: 'Right',
					},
				],
			},
		];

		const msg = await message.channel.send({
			content: randomPos,
			components: componentsArray,
		});
		function update() {
			randomized = Math.floor(Math.random() * Object.keys(positions).length);
			randomPos = positions[Object.keys(positions)[randomized]];

			msg.edit({
				content: randomPos,
				components: componentsArray,
			});
		}
		setInterval(() => {
			if(gameEnded == false) return update();
		}, 2000);

		const filter = button => {
			return button.user.id === message.author.id;
		};
		const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

		if(button.customId !== Object.keys(positions)[randomized]) {
			gameEnded = true;
			return button.reply({ content: `${assets.others.approve} | YOU WON!` });
		}
		else {
			gameEnded = true;
			return button.reply({ content: `${assets.others.disapprove} | YOU LOSE!` });
		}
	},
};