const {triviaBot} = require('../config.json')
const triviaChannelId = "459447775361368084"
module.exports = {
    client : null,
    init: function (client) {
        let triviaChannel = null;
        console.log("Initializing Trivia Bot..")
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}..`)
            client.user.setActivity('BHSWDTKDTKTLFO', { type: 'PLAYING' })
            triviaChannel = client.channels.get(triviaChannelId)
            if(triviaChannel.send) triviaChannel.send('Doggy-Doggy What Now? <:mrpb:452320695670538243>')
        })

        client.login(triviaBot.token)
    }
}