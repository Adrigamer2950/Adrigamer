const Discord = require("discord.js"); 

module.exports = class reload {
    constructor() {
        this.name = "reload",
        this.alias = [],
        this.usage = "a!reload"
    }

    async run(client, message, args) {
        try{
         if(message.member.hasPermission("ADMINISTRATOR")){
      const embed = new Discord.RichEmbed()
        .setTitle(":arrows_counterclockwise: `Reiniciando..`")
        .setColor("GREEN")
        .setImage('https://discordemoji.com/assets/emoji/6181_check.gif')
        .setFooter('Gracias por crearme Adrigamer2950 :3')
      message.channel.send({ embed }).then(() => {
        client.destroy().then(() => {
          process.exit();
        })
      })
    
    }else{
      return message.channel.send("No puedes usar ese comando!")
    }
        }catch(e) {
            throw e;
        }
    }
}