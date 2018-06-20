const axios = require('axios')

const api = require('../config.json').api.dictionary
const LANG = "en"

const endpoint = axios.create({
    baseURL: api.url,
    timeout: 1000,
    headers: {
        Accept: "application/json",
        app_id: api.id,
        app_key: api.key
    }
})

function getEntries(word) {
    return new Promise(function (resolve, reject) {
        endpoint.get(`entries/${LANG}/${word}`)
            .then((res) => {
                if (res && res.data && res.data.results) {
                    resolve(res.data.results)
                }
                reject("No results")
            })
            .catch((error) => reject(error))

    })
}

module.exports = {
    getEntries
}
