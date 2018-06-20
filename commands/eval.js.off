const localeval = require('localeval')

module.exports = {
    name: 'eval',
    description: 'Evaluates some JavaScript code (Sandboxed).',
    aliases: [],
    usage: '\`\`\`<code>\`\`\`',
    cooldown: 5,
    execute(message, args) {
        const code = args.join(" ").replace(/```/g, '')
        message.reply(`**Results: ** \n !eval is currently unavailable. Code to eval: \`\`\`${code}\`\`\``)
    }
}