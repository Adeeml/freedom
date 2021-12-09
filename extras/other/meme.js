const client = module.require('discord.js');

module.exports = {
  name: "meme",
  description: "Memes, memes, memes all day long",
  botPerms: ["ATTACH_FILES"],
  run: async (client, message) => {
    var num = Math.floor(Math.random() * (500 - 1) + 1);
    message.channel.send({
      files: [
        {
          attachment: `https://ctk-api.herokuapp.com/meme/${num}`,
          name: `${num}.jpg`,
        },
      ],
    });
  },
};
