const { prefix } = require('../../config.json')

module.exports = {
    name: 'help',
    description: 'List all of Bojack\'s commands or get info about a specific command.',
    aliases: ['commands'],
    usage: '<command name>',
    cooldown: 5,
    execute(message, args) {
        const data = []
        const { commands } = message.client

        if (!args.length) {
            data.push('Here is a list of all my commands:')
            data.push(commands
                .filter(command => !command.unlisted)
                .map(command => command.name + (command.roles && command.roles.length ? "(!)" : '')).join(', '))
            data.push(`\nCommands denoted with a \`!\` require elevated privileges.\nYou can type \`${prefix}help [command name]\` to get information on a specific command.`)

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return
                    message.reply('I\'ve sent you a DM with all my commands!')
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?')
                })
        }

        const name = args[0].toLowerCase()
        const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))

        if (!command) return message.reply('That is not a valid command.')

        data.push(`**Name:** ${command.name}`)
        if (command.aliasses && command.aliases.length) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
        if (command.description) data.push(`**Description:** ${command.description}`)
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`)
        if (command.roles && command.roles.length) data.push(`**Roles:** ${command.roles.join(', ')}`)

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

        message.channel.send(data, { split: true })
    }
}
