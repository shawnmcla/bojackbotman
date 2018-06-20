const {removeSuggestion} = require('../db/Suggestion')

module.exports = {
    name: 'removesuggestion',
    description: 'Remove a suggestion from the database',
    aliases: ['rs'],
    usage: '<suggestion ID>',
    cooldown: 5,
    args: true,
    roles: ['botmod'],
    execute(message, args){
        const id = args[0]
        removeSuggestion(id)
        .then(()=>{
            return message.reply(`Successfully removed suggestion #${id}`)
        })
        .catch((error) =>{
            return message.reply(`Could not remove suggestion with ID ${id}`)
        })
    }
}