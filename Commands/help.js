const Discord = require("discord.js"); 

module.exports = class help {
    constructor() {
        this.name = "help",
        this.alias = [],
        this.usage = "a!help"
    }

    async run(client, message, args) {
        try{
          const embed = new Discord.RichEmbed()
          .setTitle("Help")
        }catch(e) {
            throw e;
        }
    }
}