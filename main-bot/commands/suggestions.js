const Suggestion = require('../../db/Suggestion')

module.exports = {
    name: 'suggestions',
    description: 'View latest suggestions for the bot, discord server or other.',
    usage: `<type (${Suggestion.types.join(" | ")})?>`,
    cooldown: 30,
    execute(message, args) {
        const type = args[0]
        if (type && !Suggestion.types.includes(type))
            return message.reply('Invalid syntax: The first argument must be the type of suggestion, see the help command for more information.')
        else {
            Suggestion.getSuggestions(type)
                .then((result) => {
                    const data = []
                    data.push(`Latest suggestions for ${type ? type : "all categories"}\n`)
                    data.push(...result.map(s =>
                        `\`#${s.id} by ${s.author}: ${s.value} ${type ? '' : `(${s.type})`} [${s.status? s.status.toUpperCase() : ''}]\``
                    ))
                    return message.channel.send(data, { split: true })
                })
                .catch((error) => {
                    console.error("GET SUGGESTIONS FAIL: " + error)
                    return message.reply(`God damnit Todd! There's a problem with the database shit. (Getting suggestions failed, programmer probably to blame)`)
                })
        }
    }
}