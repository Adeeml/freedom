const Discord = module.require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
  name: "bcalc",
  description: "Calculator with buttons",
  run: async (client, message, args) => {
    simplydjs.calculator(message, {
    	embedColor: '#075FFF',
    })
  },
};