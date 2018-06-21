const { generateWelcomeBanner } = require('../util/images')

module.exports = {
    name: 'welcome-test',
    description: 'Test the welcome banner generator',
    aliases: [],
    usage: '<name>',
    cooldown: 5,
    roles: ['botmod'],
    args: true,
    unlisted: true,
    execute: async function (message, args) {
        if (!args[0]) return message.reply("Missing name argument. View help command for more information.")
        const name = args[0]
        try {
            const attach = await generateWelcomeBanner(name)
            return message.channel.send(`Welcome, ${name}!`, attach)
        } catch (error) {
            console.error("Error generating welcome banner", error)
            return message.reply('Error generating image!')
        }
    }
}