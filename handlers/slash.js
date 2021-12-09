const { Client } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
    try {
        let command = 0;
        const arrayOfSlashCommands = [];
        fs.readdirSync("./slashCommands").forEach(cmd => {
            let commands = fs.readdirSync(`./slashCommands/${cmd}/`).filter((file) => file.endsWith(".js"));
            for (cmds of commands) {
                let pull = require(`../slashCommands/${cmd}/${cmds}`);
                if (pull.name) {
                    client.slashCommands.set(pull.name, pull);
                    arrayOfSlashCommands.push(pull)
                    command++
                } else {
                    console.log(`${cmds} Command is not ready; slash command`);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));

            }
            client.on("ready", async () => {
                client.guilds.cache.forEach(async (g) => {
                    await client.guilds.cache.get(g.id).commands.set(arrayOfSlashCommands);
                });


            });

        })
        console.log(`${command} Command is ready; slash`);
    } catch (e) {
        console.log(e.message);
    }
				}