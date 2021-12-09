function ball() {
  	var rand = ['Yes', 'No', 'Why are you even trying?', 'What do you think? NO', 'Maybe', 'Never', 'Yep', 'What\'s the point?'
		];
  return rand[Math.floor(Math.random()*rand.length)];
};

module.exports = {
	name: "8ball",
	description: "Ask the 8ball a question, and you will get an answer",
	run: async (message, args) => {
		message.channel.send(ball());
	},
};