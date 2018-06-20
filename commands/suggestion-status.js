const Suggestion  = require('../db/Suggestion')

module.exports = {
    name: 'setsuggestionstatus',
    description: 'Change the status of a suggestion.',
    aliases: ['sss'],
    usage: `<suggestion ID> <status (${Suggestion.status.join(" | ")})>`,
    cooldown: 5,
    args: true,
    roles: ['botmod'],
    execute(message, args){
        const id = args[0]
        const status = args[1]
        if(!status || !Suggestion.status.includes(status))
            return message.reply("Invalid status. See help command for more information.")
        Suggestion.setSuggestionStatus(id, status)
        .then(()=>{
            message.reply(`Successfully changed suggestion #${id}'s status to ${status}`)
        })
        .catch((error) =>{
            message.reply(`Could not set status for suggestion with ID ${id}`)
        })
    }
}