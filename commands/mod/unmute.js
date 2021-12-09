const discord = module.require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute the (maybe?) not so bad user with one shot",
  usage: "unmute <@user> ",
  userPerms: ["MANAGE_ROLES"],
  botPerms: ["EMBED_LINKS", "MANAGE_ROLES"],
  run: async (client, message, args) =>  {   
	    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention the member to who you want to unmute");
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("The given user does not have the muted role");
    }

    user.roles.remove(muterole)

    await message.channel.send(`**${message.mentions.users.first().username}** is now unmuted`);

    user.send(`You are now unmuted from **${message.guild.name}**`);
    
    message.delete()
  }
};