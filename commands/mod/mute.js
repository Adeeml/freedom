const discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  category: "moderation",
  description: "Mute the bad user with one shot",
  usage: "mute <@user> <reason>",
  userPerms: ["MANAGE_ROLES"],
  botPerms: ["EMBED_LINKS", "MANAGE_ROLES"],
  run: async (client, message, args) =>  {   
	const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("\```please mention the members for mute\```");
    }
    if (user.id === message.author.id) {
      return message.channel.send("I can't mute you because you are message author");
    }
    let reason = args.slice(1).join("");

    if (!reason) {
      return message.channel.send(" \``` Please give a  reason for muting the mentioned member\``` ");
    }

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "JAILED");

    if (!muterole) {
      return message.channel.send("\```Please create a role called JAILED and put it under my role \``` ");
    }
    
    await user.roles.remove(vrole);
    await user.roles.add(muterole);

    await message.channel.send(
      `You muted ${message.mentions.users.first().username} for ${reason}`
    );

    user.send(`You got muted in ${message.guild} for ${reason}`
    );
  }
};
