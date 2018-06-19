const fs = require('fs')
const discord = require('discord.js')

const {prefix, token} = require('./config.json')

const client = new discord.Client()

// Dynamically load commands

client.commands = new discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}..`)
})


client.on('message', message => {
    //$devonly
    console.log("Read Message: " + message.content)
    
    if (message.content === 'ping') {
        message.reply('pong')
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    //$devonly
    console.log("Received command: ", commandName, args)

    if(!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

    // Check that context is correct (guild channel vs DM)
    if(command.guildOnly && message.channel.type !== 'text'){
        return message.reply('This command cannot be used in DMs.')
    }
    // Check that if the command requires arguments that arguments are present
    if(command.args&&!args.length){
        return message.channel.send(`You didn't provide any arguments, ${message.author}!` +
         (command.usage ? `\nProper usage: \`${prefix}${command.name} ${command.usage}\`` : ""))
    }
    // Execute the command
    try{
       command.execute(message, args)
    }
    catch(error){
        console.error(error)
        message.reply("God damnit Todd, the bot is fucked. Pick up your shit! (Error processing command)")
    }
})

client.login(token)