module.exports = {
    name: 'ping',
    description: 'Ping!',
    cooldown: 5,
    aliases: ['pang'],
    unlisted: true,
    execute(message, args){
        message.channel.send('Pong.')
    }
}