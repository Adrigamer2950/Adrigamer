const Discord = require("discord.js"); 

module.exports = class unban {
    constructor() {
        this.name = "unban",
        this.alias = [],
        this.usage = "a!unban"
    }

    async run(client, message, args) {
        try{
         exports.run = async (client, message, args) => {
let permiso = message.member.hasPermission("BAN_MEMBERS");
//Y una condicional if que nos diga que si el usuario NO tiene ese permiso nos retorne nada o un msg.
if(!permiso) return message.channel.send("No tienes Permisos!")
  
  let user = message.mentions.members.first() //Sino menciono a naadie
  if(!user) return message.channel.send('Debes mencionar a un usuario!')

//Comprobamos que la ID ingresada, no sea del autor del mensaje (Opcional)
if(user === message.author.id) return message.reply("Obviamente tu no estas baneado -_-")

//Comprobamos si la ID ingresada pertenece a la de un usuario baneado.
if (message.guild.members.get(user)) return message.channel.send("Ese usuario no esta baneado!")

message.guild.unban(user, 2);
message.channel.send(`Se ha desbaneado a **<@${user}>**`)

}

exports.help = {
  name: 'unban'
}
        }catch(e) {
            throw e;
        }
    }
}