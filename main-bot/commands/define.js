const { getEntries } = require('../../apis/dictionary')

module.exports = {
    name: 'define',
    description: 'Get the dictionary definition(s) for a word',
    aliases: ['dictionary'],
    usage: '<word>',
    cooldown: 5,
    args: true,
    execute(message, args) {
        if (!args[0]) return message.reply("You must specify a word to define. View the help command for instructions.")
        const word = args[0].toLowerCase()
        console.log("Fetching definition for " + word)
        getEntries(word)
            .then((results) => {
                console.log(results)
                let data = []
                data.push(`\n**Definitions for:** ${word}`)
                const definitions = results[0].lexicalEntries[0].entries[0].senses.map(s => s.definitions[0])
                definitions.forEach((d, i) => {
                    data.push(`\`${i + 1}: ${d} \``)
                })
                data.push("\n`IPA Phonetic Pronunciation:  " + results[0].lexicalEntries[0].pronunciations[0].phoneticSpelling + " `")
                console.log(data)
                message.reply(data)
            })
            .catch((error) => {
                console.error("Define error: " + error)
                message.reply(`There was an error trying to fetch a definition for the word ${word}`)
            })
    }
}
