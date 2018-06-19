module.exports = {
    name: 'guildOnlyTest',
    description: 'Testing Guild Only functionality.',
    args: false,
    usage: '',
    guildOnly: true,
    execute(message, args){
        if(args[0] === 'foo'){
            return message.channel.send('bar')
        }

        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`)
    }
}