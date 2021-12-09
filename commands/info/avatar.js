const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: "av",
  usage: "Get an avatar from a user",
  description: "Gives avatar for message author or mentioned user.",
  botPerms: ["EMBED_LINKS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(
        `[Avatar Link](${user.displayAvatarURL({
          size: 2048,
          dynamic: true
        })})`
      )
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};