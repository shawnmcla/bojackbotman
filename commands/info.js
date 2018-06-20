const UP_SINCE = Date.now() // for uptime

module.exports = {
    name: 'info',
    description: 'Get the latest information on Bojack Botman.',
    execute(message, args){
        const uptime = (Date.now() - UP_SINCE) / 1000 / 60 / 60
        message.channel.send(`Bojack Botman is a Discord chat bot developed by <@!251173557827141633>! Feel free to suggest new functionality, this bot belongs to all of us. <3\n\nThe source code is freely available on GitHub @ https://github.com/shawnmcla/bojackbotman\n\nUptime: ${uptime.toFixed(2)}hrs`)
    }
}