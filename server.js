//ESTE CODIGO NO AFECTARA SU BOT, SCRIPT DE ARRANQUE

const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`httpppprocess.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 100000);


//DESDE AQUI EMPIEZA A ESCRIBIR EL CODIGO PARA SU BOT

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./util.js').getConfig()[1];
const { CommandHandler } = require("djs-commands");
const util = require('./util.js');
const request = require('request');
const search = require('youtube-search');
const db = require('megadb');

const ms = require("ms");

let RainbowRoles_db = new db.crearDB("rainbowRoles");
let prefix_db = new db.crearDB("prefix");

const guildInvites = new Map();

const queue = new Map();

/*function rainbowRole(){
  let server = client.guild.id();
  let obtener = RainbowRoles_db.obtener(`${server.id}.role`)
  let obtenerTrue = RainbowRoles_db.obtener(`${server.id}.true`)
  let role = client.guild.roles.find(r => r.id == obtener)
  if(role){
    if(obtenerTrue == true){
    var colors = ['#FF0202', '#FFA502', '#FBFF02', '#2EFF02', '#02F2FF', '#0220FF', '#4c2882'];
    var colores = Math.floor(Math.random()*(colors.length));
    role.setColor(colores);
    }
  }
}
*/
function presence(){
  var status = ["Prefix a!", `en ${client.guilds.size} servidores!`, `a ${client.users.size} usuarios!`, 'v1.0.2'];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "online",
       game: {
           name: status[randomStatus],
           type: "WATCHING"
       }
   });
}

function presenceDirecto(){
  client.user.setPresence({
       status: "online",
       activity: {
           name: "En Directo",
           url: "https://www.twitch.tv/adrigamer2950",
           type: "STREAMING"
       }
   });
}

client.on('ready', () => {
  console.log(`Soy ${client.user.tag}`)
  client.invites = {};
  for (const [id, guild] of client.guilds) {
    guild.fetchInvites()
      .then(invites => client.invites[id] = invites)
      .catch(console.error);
  }
  presence();
  setInterval(presence, 10000)
  //setInterval(rainbowRole, 7000)
  
})

client.on("message", async (message) => {
    const CH = new CommandHandler({
    folder: __dirname + "/Commands/",
    prefix: prefix_db.tiene(`${message.guild.id}`) ? await prefix_db.obtener(`${message.guild.id}`) : "a!"
    });
  
    if(message.author.type === 'bot') return;
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    if(!cmd) return;

    try{
        cmd.run(client,message,args)
    }catch(e){
        console.log(e)
    }

});

/*client.on('message', async message => {
  
  let prefix = prefix_db.tiene(`${message.guild.id}`) ? await prefix_db.obtener(`${message.guild.id}`) : "a!";
  
  if(!message.content.startsWith(prefix)) return; 
  if(message.author.bot) return;
  var server = message.guild;
  const args = message.content.slice(prefix.length).trim().split(/ +/g );
  const command = args.shift().toLowerCase();
  const serverQueue = queue.get(message.guild.id);
  let cmd = CH.getCommand(command);
    if(!cmd) return;

    try{
        cmd.run(client,message,args)
    }catch(e){
        console.log(e)
    }
  
    
  let text = args.join(' ');
  if(command === 'roles'){
    message.delete()
    const nada = "a";
    const canal = client.channels.find("id", "712269881969737768");
    const embed = new Discord.RichEmbed()
    .setTitle('Auto-Roles')
    .setAuthor(server.name, server.iconURL)
    .addField("Reacciona con 🔵 para poner tu nombre de azul.", nada)
    .addField("Reacciona con 🔴 para poner tu nombre de rojo.", nada)
    .addField("Reacciona con 🟢 para poner tu nombre de verde.", nada)
    
    canal.send(embed).then(m => {
  m.react("🔵").then(() => {
  m.react("🔴")
  m.react("🟢")
  const filtro = (reaction, user) => { 
  
return ["🔵", "🔴", "🟢"].includes(reaction.emoji.name) && user.id == message.author.id
}; Con esto nos aseguramos de que la persona que reaccione sea el autor del mensaje que usó el comando
const member = message.guild.reactions.first()
//Aquí empezará nuestro awaitReactions, con max nos referimos al número máximo de reacciones, con time el tiempo que esperara por las reacciones

m.awaitReactions(filtro, {max: 1, time:0, errors: ["time"]}).catch(() => {

}).then(coleccionado => {

const reaccion = coleccionado.first();
if(reaccion.emoji.name === "🔵"){
member.roles.add("712250814248517674");
} else if(reaccion.emoji.name === "🔴"){
  member.roles.add("712250703984197734");
} else if(reaccion.emoji.name === "🟢"){
  member.roles.add("712250896863723540");
}

})
});
});
  }else if (command === "kick") {
    let permsBot = message.guild.me.hasPermission("KICK_MEMBERS") 
    if (!permsBot) return message.channel.send("No tengo permisos!")
        

        var perms = message.member.hasPermission("KICK_MEMBERS");
        if(!perms) return message.channel.send("No tienes Permisos!");

        let user = message.mentions.users.first();
	      if (!user) return message.channel.send('Debes mencionar a un usuario!')
    
        let razon = args.slice(1).join(' ');
        if(!razon) {
          razon = `Sin Razon` 
        }
    
        if (!message.guild.member(user).kickable) return message.reply('Ese usuario no puede ser kickeado!');
     
        message.guild.member(user).kick(razon); //Kickeamos al usuario
        message.channel.send(`:white_check_mark: | Usuario Kickeado: ${user.username} | Razón: ${razon}.`);
  }else if (command === "ban") {
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
	}else if(command === 'unban') {
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
    
}else if(command === 'play') {
    const voiceChannel = message.member.voiceChannel;

  //verificamos que el usuario solicitante este conectado en un canal de voz.
    if (!voiceChannel) return message.channel.send('Tienes que estar en un chat de voz!');

    const permissions = voiceChannel.permissionsFor(message.client.user);

  //verificamos que el bot tenga permisos de conectar y de hablar en el canal de voz.
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('No tengo permisos ni para unirme ni para hablar en ese chat de voz!');
    }
  
  // <-- Capturamos la información de la música a reproducir -->
    
    var opts = {
      maxResults: 1, //Maximo de resultados a encontrar 
      key: 'API-KEY', //Necesitas una CLAVE de la API de youtube.
      type: "video" // Que tipo de resultado a obtener.
    };
      
    
    const songArg = await search(args.join(' '), opts);
    const songURL = songArg.results[0].link;
    const songInfo = await ytdl.getInfo(songURL);
    
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
      author: message.author.tag
    };
    
    if (!serverQueue) {
      // Si NO hay una lista de música.
      // <-- Creamos nuestra cola de música a reproducir  -->
      
      // Creamos el conjunto de datos para nuestra cola de música
      const queueObject = {
       textChannel: message.channel, //guardamos el canal de texto
       voiceChannel: voiceChannel, // guardamos el canal de voz
       connection: null, // un objeto para la conexión 
       songs: [], // creamos la lista de canciones
       volume: 5, // volumen al iniciar la cola
       playing: true, // un objeto para validar la cola de música en reproducción.
      };
      
      // Creando el conjunto de datos para nuestra cola de música
      queue.set(message.guild.id, queueObject);

      // Agregamos las canciones al conjunto de datos
      queueObject.songs.push(song);
      

      try {
       // Aquí unimos el bot al canal de voz y guardar nuestra conexión en nuestro objeto.
       var connection = await voiceChannel.join();
       queueObject.connection = connection;
       
       message.channel.send(`Reproduciendo ahora: **${song.title}**`);
        
       // Llamar a la función de reproducción para comenzar una canción.
       play(message.guild, queueObject.songs[0]);

      } catch (err) {

       // Imprimir el mensaje de error si el bot no puede unirse al chat de voz
       console.log(err);
       queue.delete(message.guild.id);
       return message.channel.send(err);

      }
      
    }else {
      // Si HAY una lista de música reproduciendo.

      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      return message.channel.send(`**${song.title}** ha sido añadido a la cola!, por: __${message.author.tag}__`);

    }

  }else if(command === 'skip') {
   // Aquí verificamos si el usuario que escribió el comando está en un canal de voz y si hay una canción que omitir.
   if (!message.member.voiceChannel) return message.channel.send('debes unirte a un canal de voz.');
   // Aquí verificamos si el objeto de la lista de canciones esta vacía.
   if (!serverQueue) return message.channel.send('¡No hay canción que saltar!, la cola esta vacía');

   // Finalizamos el dispatcher
   await serverQueue.connection.dispatcher.destroy();
   message.channel.send(`Reproduciendo ahora: **${serverQueue.songs[1].title}**`);
  }else if(command === 'stop') {
   if (!message.member.voiceChannel) return message.channel.send('Debes unirte a un canal de voz para detener la canción.');
   if (!serverQueue) return message.channel.send('¡No hay canción!, la cola esta vacía.');
   // Aquí borramos la cola de las canciones agregadas
   serverQueue.songs = [];

   // Finalizamos el dispatcher
   await serverQueue.connection.dispatcher.end();
   message.channel.send('Lista de canciones fue detenida.')

  }else if(command === 'pause') {
   // Validamos si la cola esta vacía 
   if (!serverQueue) return message.channel.send('¡No hay canción!, la cola esta vacía.');
   if (!message.member.voiceChannel) return message.channel.send('debes unirte a un canal de voz.');

   // Pausamos la canción en reproducción
   await serverQueue.connection.dispatcher.pause();
  
   message.channel.send(`Canción actual en pausa.`)
  
  }else if(command === 'resume') {
   // Validamos si la cola esta vacía 
   if (!serverQueue) return message.channel.send('¡No hay canción!, la cola esta vacía.');

   if (!message.member.voiceChannel) return message.channel.send('debes unirte a un canal de voz.');

   // Reanudamos la canción pausada
   await serverQueue.connection.dispatcher.resume();
  
   message.channel.send(`Canción actual reanudada.`)
  
  }else if(command === 'queue') {

    if (!serverQueue) return message.channel.send('¡No hay canción que mostrar!, la cola esta vacía');
    let i = 1

    // Listamos las canciones de la cola
    let list = serverQueue.songs.slice(1).map((m) => {
        if(i > 16) return // Lista solo 15 canciones
        i++;
        return `[${i}] - 🎵 ${m.title}  / 👤 por: ${m.author}` // Construimos la info por cada canción
            
       }).join('\n')
        
     let hr = "---------------------------------------------"
     // El tiempo de reproduccion de la canción
     let time = Math.trunc(serverQueue.connection.dispatcher.streamTime / 1000)
     
     // Agregarmos la canción actual reproduciendo
     let playName = `${hr}\n🔊 Ahora: ${serverQueue.songs[0].title}\n🕐 Tiempo: ${time} segundos.\n👤 Por: ${serverQueue.songs[0].author}\n${hr}`
     // La cantidad de canciones encontradas
     let countSong = `\n${hr}\n📒 Lista ${serverQueue.songs.length}/15 canciones.`
     
     message.channel.send('```xl\n[LISTA DE CANCIONES PARA: '+message.guild.name.toUpperCase()+']\n'+playName+'\n\n'+ list +'\n'+countSong+'\n```')

 }else if(command === 'abrirdirecto'){
   presenceDirecto();
 }else if(command === 'cerrardirecto'){
   presence();
   setInterval(presence, 10000)
 }
});
*/

function play(guild, song) {
 const serverQueue = queue.get(guild.id);
 // verificamos que hay musica en nuestro objeto de lista
 if (!song) {
  serverQueue.voiceChannel.leave(); // si no hay mas música en la cola, desconectamos nuestro bot
  queue.delete(guild.id);
  return;
 }

 // <-- Reproducción usando play()  -->

  const dispatcher = serverQueue.connection.play(ytdl(song.url))
 .on('finish', () => {
   // Elimina la canción terminada de la cola.
   serverQueue.songs.shift();

   // Llama a la función de reproducción nuevamente con la siguiente canción
   play(guild, serverQueue.songs[0]);
 })
 .on('error', error => {
  console.error(error);
 });

 // Configuramos el volumen de la reproducción de la canción
 dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
}

client.on('guildMemberAdd', member => {
  let server = client.guild.id();
  if(server.id === '534047450399244322'){
  member.guild.fetchInvites()
    .then(invites => {
      const existing = client.invites[member.guild.id];

      client.invites[member.guild.id] = invites;

      const inviteUsed = invites.find(invite => !existing.get(invite.code) || existing.get(invite.code).uses < invite.uses); 

      const channels = member.guild.channels.filter(channel => channel.type === 'text');
      const channel = channels.get('714421076758888508');

      if (!channel) return console.error('Unable to find specified welcome channel!');

      let message = member+" se a unido a la comunidad, fue invitado por "+inviteUsed.inviter+" que ahora tiene"+inviteUsed.uses+" invites!";
      channel.send(message);
  })
  .catch(console.error);
  }
    if(server.id === '534047450399244322'){
      var Canal = client.channels.find(channel => channel.id === "714420714119233556");
        let rol = member.guild.roles.find(r => r.id == "552133256695250954");
          member.addRole(rol)
          var message = "Bienvenido "+member+" a esta comunidad, recuerda ver y cumplir las reglas del servidor que se presentan en <#534767957541126145>.\nDiviertete! :3";
            Canal.send(message);
    }
});

client.on('guildCreate', guild => {
  for (const [id, guild] of client.guilds) {
    guild.fetchInvites()
      .then(invites => client.invites[id] = invites)
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);