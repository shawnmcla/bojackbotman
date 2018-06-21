const { generateWelcomeBanner } = require('../../util/images')

module.exports = {
    name: 'welcome-test',
    description: 'Test the welcome banner generator',
    aliases: [],
    cooldown: 5,
    roles: ['botmod'],
    unlisted: true,
    execute: function (message, args) {
        return message.client.emit('guildMemberAdd', message.member)
    }
}