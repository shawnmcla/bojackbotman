const fs = require('fs')
const Canvas = require('canvas')
const { Attachment } = require('discord.js')

const BG_DIR = "resources/img/welcome-bg"
const bgfiles = fs.readdirSync(BG_DIR)
console.log(bgfiles)
const welcomeConfig = {
    width: 500,
    height: 250
}

function getRandomImage() {
    const min = 0, max = bgfiles.length - 1
    const index = Math.floor(Math.random() * (max - min + 1)) + min
    return bgfiles[index]
}

function computeFontSize(canvas, name) {
    const ctx = canvas.getContext('2d')
    let fontSize = 70;
    do {
        ctx.font = `${fontSize -= 5}px Arial`
    } while (ctx.measureText(name).width > 240)
    return fontSize
}

async function generateWelcomeBanner(name) {
    const canvas = Canvas.createCanvas(welcomeConfig.width, welcomeConfig.height)
    const ctx = canvas.getContext('2d')
    const bgImage = await Canvas.loadImage(`${BG_DIR}/${getRandomImage()}`)
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    
    ctx.font = '38px Arial'

    ctx.fillStyle = "#000000"
    
    ctx.shadowColor="#fff"
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 1
    ctx.shadowBlur = 2

    ctx.fillText(`Welcome,`, 251, 85)
    
    ctx.font = computeFontSize(canvas, name)
    ctx.fillStyle = "#000000"

    ctx.fillText(`${name}`, 251, 125)
    
    return new Attachment(canvas.toBuffer(), 'welcome-banner.png')
}

module.exports = {
    generateWelcomeBanner
}
