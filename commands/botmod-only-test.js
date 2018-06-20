module.exports = {
    name: 'botmod-only-test',
    description: 'Testing Role-restricted functionality.',
    args: false,
    usage: '',
    roles: ['botmod'],
    execute(message, args){
        return message.channel.send(`Doggydoggy what now`)
    }
}