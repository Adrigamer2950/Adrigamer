const Discord = require("discord.js"); 

module.exports = class ban {
    constructor() {
        this.name = "ban",
        this.alias = [],
        this.usage = "a!ban"
    }

    async run(client, message, args) {
        try{
          var server = message.guild;
         let permsBot = message.guild.me.hasPermission("BAN_MEMBERS") 
        //Verificamos permisos del bot
        if (!permsBot) return message.channel.send("No tengo permisos!")
          
        let perms = message.member.hasPermission("BAN_MEMBERS") //Verificamos permisos del user
        if (!perms) return message.channel.send("No tienes Permisos!")

        let persona = message.mentions.members.first() //Sino menciono a naadie
        if(!persona) return message.channel.send('Debes mencionar a un usuario!')
		
        if(persona.highestRole.comparePositionTo(message.member.highestRole) > 0){ //Si tiene el mismo rango o mayor (en Jerarquia)
            return message.channel.send("No puedes banear a ese usuario porque su rango es mayor que el tuyo!")
        }
        
        var razon = args.slice(1).join(' ') //Una razon ("Sin Razon" por Default)
        if(!razon) {
          razon = `Sin Razon` 
        }
				
        razon = razon
            
        persona.ban(razon).catch(e => message.reply("A ocurrido un error desconocido!")) //Si ocurre un error
        const embed = new Discord.RichEmbed()
        .setTitle(`${persona.user.tag} Fue Baneado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Baneado Por ${message.author.tag}!`)
        .addField(`Razón: ${razon}`)
        message.channel.send(embed)
        message.channel.send(`:white_check_mark: | ${persona.user.tag} Baneado`) //Ultimo mensaje
        }catch(e) {
            throw e;
        }
    }
}