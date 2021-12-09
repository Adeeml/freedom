const Discord = require("discord.js");
const { Client, Message, MessageEmbed, Collection, Intents } = require("discord.js");
const config = require('../../configs/config.json');
const assets = require('../../configs/assets.json');
require('dotenv').config();

module.exports = {
  name: "eval",
  description: "Evaluate something",
  aliases: "evaluate",
  run: async (client, message, args) => {
    const evalcommand = args.slice(0).join(" ");
    const { inspect } = require("util");

    if (message.author.id !== "585251212321095690")
	  return message.reply(
     `This command can only be used by VenomousSteam81#7772!`
  	);

    if (!evalcommand)
      return message.channel.send("Please specify something to Evaluate");

    try {
      const evaled = eval(evalcommand);

      let embedeval = new Discord.MessageEmbed()
        .setColor("#f03824")
        .setTitle("Evaluated")
        .addField(`To Eval`, `\`\`\`${evalcommand}\`\`\``)
        .addField(`Evalved`, `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``)
        .addField(`TypeOf`, `\`\`\`${typeof evaled}\`\`\``);

      message.channel.send({embeds: [embedeval]});
    } catch (error) {
      let embederr = new Discord.MessageEmbed()
        .setColor("#f03824")
        .setTitle("Error")
        .addField(`Error`, `${error}`);
      message.channel.send({embeds: [embederr]});
    }
  },
};
