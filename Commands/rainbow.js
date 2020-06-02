const Discord = require("discord.js"); 
const db = require('megadb');
let RainbowRoles_db = new db.crearDB("rainbowRoles");

module.exports = class rainbow {
    constructor() {
        this.name = "rainbow",
        this.alias = [],
        this.usage = "a!rainbow"
    }

    async run(client, message, args) {
        try{
          let role = message.mentions.roles.first();
          if(!role) return message.channel.send("Debes mencionar a un rol!")
          
          let permsBot = message.guild.me.hasPermission("MANAGE_ROLES")
		      if (!permsBot) return message.channel.send("No tengo permisos!")
          
	    	  let perms = message.member.hasPermission("MANAGE_ROLES")
	    	  if (!perms)	return message.channel.send("No tienes permisos!")
          
          RainbowRoles_db.establecer(`${message.guild.id}`, {role: role.id, true: true})
        }catch(e) {
            throw e;
        }
    }
}