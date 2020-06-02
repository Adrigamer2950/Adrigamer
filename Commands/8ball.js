const Discord = require("discord.js"); 

module.exports = class ball {
    constructor() {
        this.name = "8ball",
        this.alias = [],
        this.usage = "a!8ball"
    }

    async run(client, message, args) {
        try{
         var rpts = ["Si si si", "Tal vez", "No se", "Claro!", "Si <3", "No >:("]; 

    let pregunt = args.slice(1).join(' '); //Si falta la pregunta
    if(!pregunt) return message.channel.send(':x: | Falta la pregunta.');
  
	const embed = new Discord.RichEmbed() //Creamos el embed
		.setTitle('Command | 8Ball')
		.setThumbnail(message.author.avatarURL)
		.addField('Su pregunta es:', args, true)
		.addField('Mi respuesta es:', rpts[Math.floor(Math.random() * rpts.length)], true)
	message.channel.send(embed)
        }catch(e) {
            throw e;
        }
    }
}