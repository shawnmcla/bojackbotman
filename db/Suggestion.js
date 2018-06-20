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

function getSuggestions(type, max = 5) {
    return new Promise(function (resolve, reject) {
        let whereOptions = {}
        if (type) whereOptions = { type: type }
        Suggestion.findAll({
            where: whereOptions,
            'order': [['createdAt', 'DESC']],
            limit: max
        })
            .then((results) => {
                resolve(results)
            })
            .catch((error) => reject(error))
    })
}

function removeSuggestion(id) {
    return new Promise(function (resolve, reject) {
        Suggestion.findById(id)
            .then((sug => {
                sug.destroy()
            }))
            .then(() =>{
                resolve()
            })
            .catch((error) => reject(error))
    })
}

module.exports = {
    types: SUGG_TYPES,
    model: Suggestion,
    recordSuggestion,
    getSuggestions,
    removeSuggestion
}