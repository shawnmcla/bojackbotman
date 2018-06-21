/**
 * Create Discord clients and initialize bots according to config
 */

const Config = require('./config.json')
const Discord = require('discord.js')

const mainBot = require('./main-bot')
const triviaBot = require('./trivia-bot')
const djBot = require('./dj-bot')

const mainClient = new Discord.Client()
const triviaClient = new Discord.Client()
const djClient = new Discord.Client()


if (Config.triviaBot && Config.triviaBot.active) {
    triviaBot.init(triviaClient)
}
if (Config.djBot && Config.djBot.active) {
    djBot.init(djClient)
}

mainBot.init(mainClient, { djClient, triviaClient })