require('dotenv').config()
const Bot = require('node-telegram-bot-api')
const token = process.env.TOKEN
const bot = new Bot(token)

module.exports = bot