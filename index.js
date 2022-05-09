const { Client, Intents, Guild } = require("discord.js");
const fetch = require("node-fetch");
const fs = require('fs');
const client = new Client({ 
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"] 
});
client.once("ready", async (data) => {
    console.log(`\x1b[43m\x1b[30m[${new Date().toISOString()} | ${client.user.tag}] => \x1b[0m Starting Member Scan`);
    var startTime = + new Date();
    var Guilds = client.guilds.cache.map((guild) => guild);
    var username = (await Guilds[0].members.fetch()).map(m => m.user.username);
    var id = (await Guilds[0].members.fetch()).map(m => m.user.id);
    var discriminator = (await Guilds[0].members.fetch()).map(m => m.user.discriminator);
    var result =  id.reduce(function(result, field, index) {
        result[`${username[index]}#${discriminator[index]}`] = field;
        return result;
      }, {})
      fs.writeFileSync('./members.json',  JSON.stringify(result, null, 2), 'utf-8');
      console.log(`\x1b[42m\x1b[30m[${new Date().toISOString()} | ${client.user.tag}] => \x1b[0m Member Scan Completed in \x1b[32m${Math.abs(startTime - + new Date())}ms\x1b[0m`);
      console.log(`\x1b[44m\x1b[30m[${new Date().toISOString()} | ${client.user.tag}] => \x1b[0m Exported to \x1b[31m./members.json\x1b[0m`);
      client.destroy();
});
client.login("");
