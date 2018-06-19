module.exports = {
    name: 'guild-only-test',
    description: 'Testing Guild Only functionality.',
    args: false,
    usage: '',
    guildOnly: true,
    execute(message, args){
        return message.channel.send(`This is fine.`)
    }
}