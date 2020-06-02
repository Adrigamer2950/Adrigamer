const Discord = require("discord.js"); 

module.exports = class invite {
    constructor() {
        this.name = "invite",
        this.alias = [],
        this.usage = "a!invite"
    }

    async run(client, message, args) {
        try{
          const embed = new Discord.RichEmbed()
          .setTitle("¿Quieres invitarme a tu servidor?")
          .setURL("https://youtube.es/")
          message.channel.send(embed)
        }catch(e) {
            throw e;
        }
    }
}