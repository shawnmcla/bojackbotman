const Suggestion = require('../db/Suggestion')

module.exports = {
    name: 'suggest',
    description: 'Submit a suggestion for the bot, discord server or other.',
    aliases: ['suggestion'],
    usage: `< type (${Suggestion.types.join(" | ")}) > < suggestion message >`,
    cooldown: 30,
    args: true,
    execute(message, args){
        const type = args[0]
        const text = args.slice(1).join(" ")
        if(!Suggestion.types.includes(type))
            return message.reply('Invalid syntax: The first argument must be the type of suggestion, see the help command for more information.')
        else{
            //return message.reply(`Thank you! Your suggestion \`${text}\` has been recorded. (Not really, DB implementation is not yet done)`)
            Suggestion.recordSuggestion(
                message.author.tag,
                type,
                text
            )
            .then((result) =>{
                return message.reply(`Thank you! Your suggestion \`${text}\` has been recorded.`)
            })
            .catch((error)=>{
                console.error("SUGGESTION FAIL: " + error)
                return message.reply(`God damnit Todd! There's a problem with the database shit. (Suggestion failed, programmer probably to blame)`)
            })
        }
    }
}