const { generateWelcomeBanner } = require('../../util/images.js')
module.exports =
    async function (member) {
        const channel = member.guild.channels.find(ch => ch.name === 'general-chat')
        if (!channel) return
        const name = member.displayName
        const banner = await generateWelcomeBanner(name)
        return channel.send(`Welcome, <@!${member.id}>!`, banner)
    }