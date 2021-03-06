/**
 * Main Bot;
 * Handles commands and general functionality
 * Serves as dispatcher for other bots
 */
const fs = require('fs')
const Discord = require('discord.js')
const eventJoinServer = require('./events/join-server.js')
const db = require('../db')
const { prefix, token, botmodCooldownImmune } = require('../config.json')

module.exports = {
    client: null,
    init:
        function (client, data) {
            console.log("Initializing Main Bot..")

            client.commands = new Discord.Collection()
            const commandFiles = fs.readdirSync(__dirname+'/commands').filter(file => file.endsWith('.js'))

            for (const file of commandFiles) {
                const command = require(__dirname+`/commands/${file}`)
                client.commands.set(command.name, command)
            }

            const cooldowns = new Discord.Collection()

            client.on('ready', () => {
                console.log(`Logged in as ${client.user.tag}..`)
                client.user.setActivity('Horsin Around Reruns', { type: 'WATCHING' })
            })
            this.client = client
            client.on('guildMemberAdd', eventJoinServer)

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

                // Fetch the command object, if it exists
                const command = client.commands.get(commandName) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

                if (!command) return

                // Check that context is correct (guild channel vs DM)
                if (command.guildOnly && message.channel.type !== 'text') {
                    return message.reply('This command cannot be used in DMs.')
                }

                // Check that user has appropriate role
                if (command.roles) {
                    if (!message.member) return message.reply('Insufficient permissions.')
                    let isPermitted = false;
                    command.roles.forEach(role => {
                        if (message.member.roles.exists('name', role)) {
                            isPermitted = true
                        }
                    })
                    if (!isPermitted) return message.reply('Insufficient permissions.')
                }

                // Check that if the command requires arguments that arguments are present
                if (command.args && !args.length) {
                    return message.channel.send(`You didn't provide any arguments, ${message.author}!` +
                        (command.usage ? `\nProper usage: \`${prefix}${command.name} ${command.usage}\`` : ""))
                }

                // Verify cooldowns and immunity
                if (!botmodCooldownImmune || !message.member || !message.member.roles.exists('name', 'botmod')) {
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
        }
}