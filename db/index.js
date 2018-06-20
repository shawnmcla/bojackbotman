const Sequelize = require('sequelize')
const { dbname } = require('../config.json')
// Declare models
let Suggestion;

let connected = false;
const sequelize = new Sequelize('botjack', 'user', 'pass', {
    dialect: 'sqlite',
    storage: './db.sqlite',
})

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to database.")
        connected = true
        // Load models after connection/before sync
        Suggestion = require('./Suggestion')
        sequelize.sync()
    })
    .then(() =>{
        console.log("DB Models synchronized.")
    })
    .catch(err => console.error("Could not connect to database: ", err))

module.exports = {
    Sequelize,
    db: sequelize,
    connected
}