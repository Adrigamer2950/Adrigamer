const Discord = require("discord.js"); 

module.exports = class kick {
    constructor() {
        this.name = "kick",
        this.alias = [],
        this.usage = "a!kick"
    }

    async run(client, message, args) {
        try{
         let permsBot = message.guild.me.hasPermission("KICK_MEMBERS") 
         if (!permsBot) return message.channel.send("No tengo permisos!")
        

        var perms = message.member.hasPermission("KICK_MEMBERS");
        if(!perms) return message.channel.send("No tienes Permisos!");

        let user = message.mentions.users.first();
	      if(user){
        let razon = args[2];
        if(!razon) {
          razon = `Sin Razón` 
        }
    
        if (!message.guild.member(user).kickable) return message.reply('Ese usuario no puede ser kickeado!');
     
        message.guild.member(user).kick(razon); //Kickeamos al usuario
        message.channel.send(`:white_check_mark: | Usuario Kickeado: ${user.username} | Razón: ${razon}.`);
        }else{
          message.channel.send('Debes mencionar a un usuario!')
        }
        }catch(e) {
            throw e;
        }
    }
}