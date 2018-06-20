module.exports = {
    name: 'coinflip',
    description: 'Flip a coin, duh!',
    aliases: ['flipcoin'],
    usage: '',
    cooldown: 20,
    execute(message, args){
        message.reply(`The coin landed on ${Math.random()>=0.5 ? 'Heads' : 'Tails'}.`)
    }
}