const fs = require('fs')
const Discord = require('discord.js')

const { prefix, token } = require('./config.json')

const client = new Discord.Client()

// Dynamically load commands

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()

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

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

    // Check that context is correct (guild channel vs DM)
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('This command cannot be used in DMs.')
    }
    // Check that if the command requires arguments that arguments are present
    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!` +
            (command.usage ? `\nProper usage: \`${prefix}${command.name} ${command.usage}\`` : ""))
    }
    // Verify cooldowns
    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection())
    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000
    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    }
    else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`)
        }

        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    }
    // Execute the command
    try {
        command.execute(message, args)
    }
    catch (error) {
        console.error(error)
        message.reply("God damnit Todd, the bot is fucked. Pick up your shit! (Error processing command)")
    }
})

client.login(token)