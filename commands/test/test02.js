const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
let color = "#36393f";
const config = require('../../configs/config.json');

module.exports = {
    name: "test02",
    description: "test02",
    run: async (client, message, args) => {
      let categories = [];

      let ignored = ["util", "database", "db"];

      const emo = {
        info: "❓",
				fun: "🎮",
				mod: "👁",
        server: "📝",
				games: "🎲",
				test: "🖼️"
      };

      const catinfo = {
        info: "Info Land",
				fun: "Fun Land",
				mod: "Punish those baddies from existence",
        server: "Manage this server",
				games: "Gaymerland",
				test: "Testing or \"beta\" commands"
      };

        const hb = [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: 'fun',
                        label: 'FUN',
                    },
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: 'games',
                        label: 'GAMES',
                    },
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: 'info',
                        label: 'INFO'
                    },
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: 'mod',
                        label: 'MOD',
                    },
                    {
                        type: 2,
                        style: 'PRIMARY',
                        custom_id: 'test',
                        label: 'TEST',
                    },
                ]
            }
        ];

      readdirSync("./commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()} - ${catinfo[dir.toLowerCase()]}`;
        let cats = new Object();

        cats = {
          name: name,
          value: `\`${config.prefix}help ${dir.toLowerCase()}\``,
          inline: false,
        };

        categories.push(cats);
      });
      
      let cots = [];
      let catts = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = `${client.commands.get(name).description}`;
          let emo = `✅`;

          let obj = {
            cname: `${emo} \`${name}\``,
            des,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          dota = {
            name: `${cmds.length === 0 ? "In progress" : co.cname}`,
            value: co.des ? co.des : "No Description",
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      })

        const help = new MessageEmbed()
          .setTitle(`\`\`Help Menu\`\``)
          .setDescription(`\`\`My Prefix is : ${config.prefix} \`\`\n \`\`\` Presented By Luminoux Studios \`\`\` \n To check out a category, use command ${config.prefix}help [category] \n\n [Invite Me Now](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) \n [My Support Server](https://discord.gg/m5xUeZj7Xb) \n [My Other Server](https://discord.gg/aFCQSyzNU8)`)
          .addFields(categories)
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({
              dynamic: true,
            })
          )
          .setTimestamp()
          .setThumbnail(
            client.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setColor(color);
        
        const msg = await message.channel.send({
            content: help,
            embeds: [help],
            components: hb,
        })

        const filter = button => {
          return button.user.id === message.author.id;
        };
        const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 15 });

        if(button.customId == hb.fun) {
          msg.edit({
              content: cmds.toLowerCase,
              embeds: [helpCat],
              components: hb,
          })
        };
        if(button.customId == hb.games) {
          msg.edit({
            content: cmds.toLowerCase,
            embeds: [helpCat],
            components: hb,
          })
        };
        if(button.customId == hb.info) {
          msg.edit({
            content: cmds.toLowerCase,
            embeds: [helpCat],
            components: hb,
          })
        };
        if(button.customId == hb.mod) {
          msg.edit({
            content: cmds.toLowerCase,
            embeds: [helpCat],
            components: hb,
          })
        };
        if(button.customId == hb.test) {
          msg.edit({
            content: cmds.toLowerCase,
            embeds: [helpCat],
            components: hb,
          })
        };
    }
}