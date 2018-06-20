const { Sequelize, db } = require('.')

const SUGG_TYPES = [
    "bot",
    "discord",
    "misc"
]

const SUGG_STATUS = [
    "pending",
    "considering",
    "implemented",
    "declined"
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
    },
    status: {
        type:Sequelize.STRING,
        defaultValue: "pending",
        isIn: [SUGG_STATUS]
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

function getSuggestions(type, status, max = 5) {
    return new Promise(function (resolve, reject) {
        let whereOptions = {}
        if (type) whereOptions.type = type
        if (status) whereOptions.status = status
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
            .then(() => {
                resolve()
            })
            .catch((error) => reject(error))
    })
}

function setSuggestionStatus(id, status) {
    return new Promise(function (resolve, reject) {
        Suggestion.findById(id)
            .then((sug => {
                sug.status = status
                sug.save()
            }))
            .then(() => {
                resolve()
            })
            .catch((error) => reject(error))
    })
}

module.exports = {
    types: SUGG_TYPES,
    status: SUGG_STATUS,
    model: Suggestion,
    recordSuggestion,
    getSuggestions,
    removeSuggestion,
    setSuggestionStatus
}