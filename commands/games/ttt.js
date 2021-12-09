const Discord = module.require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
  name: "ttt",
	aliases: "tictactoe",
  description: "Tic Tac Toe",
  run: async (client, message, args) => {
    simplydjs.tictactoe(message)
  },
};