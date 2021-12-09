const client = require('..');
//const config = require('../configs/config.json');

const activities = [
	"for the w+help command",
	"my code on github",
	"venom do tests on me",
	"ur mom",
	"~/configs/config.json",
	"index.js",
	"~/commands/(command folder)/(command).js",
	"69",
	"dank memes",
	"gamers game",
	"...",
	"chats",
	"ur every move",
	"never gonna give u up, never gonna let u down",
	"cornhub",
	"hackers get hacked",
	"undefined",
	"for mentions",
	"javascript",
	"the air",
	"venom change my name"
];

client.on("ready", () => {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity, { type: 'WATCHING'});
  }, 5000);
});
