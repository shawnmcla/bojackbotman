const Canvas = require('canvas')
const { Attachment } = require('discord.js')

const BG_DIR = "resources/img"
const welcomeConfig = {
    width: 500,
    height: 250
}

async function generateWelcomeBanner(name){
    const canvas = Canvas.createCanvas(welcomeConfig.width, welcomeConfig.height)
    const ctx = canvas.getContext('2d')
    const bgImage = await Canvas.loadImage(`${BG_DIR}/bg_1.png`)
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    return new Attachment(canvas.toBuffer(), 'welcome-banner.png')
}

module.exports = {
    generateWelcomeBanner
}
