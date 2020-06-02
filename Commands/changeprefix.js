const Discord = require("discord.js");
const db = require('megadb');
let prefix_db = new db.crearDB("prefix");

module.exports = class help {
    constructor() {
        this.name = "changeprefix",
        this.alias = [],
        this.usage = "a!changeprefix"
    }

    async run(client, message, args) {
        try{
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes permisos!");
          if(!args[0]) return message.channel.send("Necesitas colocar el nuevo prefix!");
          prefix_db.establecer(`${message.guild.id}`, args[1]);
          return message.channel.send("El prefix a sido cambiado a "+args[1]);
        }catch(e) {
            throw e;
        }
    }
}