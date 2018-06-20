const { Sequelize, db } = require('./index')

const SUGG_TYPES = [
    "bot",
    "discord",
    "misc"
]

const Suggestion = db.define('suggestion', {
    type: {
        type: Sequelize.STRING,
        isIn: [SUGG_TYPES],
    },
    author: {
        type: Sequelize.STRING
    },
    value: {
        type: Sequelize.STRING
    }
})


function recordSuggestion(author, type, text) {
    return new Promise(function (resolve, reject) {
        if (!SUGG_TYPES.includes(type)) throw Error("Invalid suggestion type")
        Suggestion.create({
            author,
            type,
            value: text
        })
            .then(resolve())
            .catch((error) => reject(error))
    })
}

function getSuggestions(max){
    return new Promise(function(resolve, reject){
        resolve([])
    })
}

module.exports = {
    types: SUGG_TYPES,
    model: Suggestion,
    recordSuggestion
}