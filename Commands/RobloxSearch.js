const Discord = require("discord.js");
const client = new Discord.Client()
const roblox = require("noblox.js")

module.exports = class search {
    constructor() {
        this.name = "search",
        this.alias = [],
        this.usage = "a!search"
    }

    async run(client, message, args) {
        let username = args[1]
   
    // if a username is supplied successfully
    if (username) {
        roblox.getIdFromUsername(username).then(id => {
         
          // if an identity is found under the username then continue collecting the rest of the data
          // sadly this means you can't search for banned users. f in the chat. maybe try using older apis
          // yes, i just did c# styled bracketing, do not mind me trying to bless your eyes
         
          if (id)
 
          {
            // next conditio
            roblox.getPlayerInfo(parseInt(id)).then(function(info)
 
            {
              // dates.. um. go try get a pear or a grape instead.
              let date = new Date(info.joinDate)
              
              let avatar = `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`;
              // create new embed and establish some settings for it, tasty.
              let embed = new Discord.RichEmbed()
             
              // the ${id} allows the id to change depending on user input
              // so it pretty much allows you to search for any profile off the roblox.com website.
              // neat, we've even got a thumbnail of the player available, if that wasn't enough information for you.
              .setThumbnail(avatar)
             
              // more information, please senpai? you haven't given me anything :(
              .addField("Username", info.username || 'Unresolvable', true)
              .addField("User ID", id || 'Unresolvable', true)
              .addField("Blurb", info.blurb || 'Nothing', true)
              .addField("Status", info.status || 'Nothing', true)
              .addField("Account Age", `${info.age} days old` || 'Unresolvable')
              
              .addField("User Link", `https://roblox.com/users/${id}/profile`)
              .setFooter(`Search Bot`, client.user.avatarURL)
              message.channel.send({embed})
            })
          }
         
       
        // but what if the player is banned, or doesn't even exist?
        // houston, we have a problem.
        }).catch(function (err) {
         message.channel.send("Sorry, that user doesn't seem to exist, double check your spelling and try again!") // catching error
       });  
    } else { message.channel.send("Please provide a valid username, e.g. '-search ROBLOX'.") }
    }
}