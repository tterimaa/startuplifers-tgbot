require('dotenv').config()
const db = require('./db')
const cron = require('node-cron')
const jobService = require('./services/jobs')
const Bot = require('node-telegram-bot-api')

const token = process.env.TOKEN
const url = 'http://localhost:3001/jobs'
const bot = new Bot(token)

jobService.getAll(url).then(data => {
    db.defaults({ jobs: [data]}).write()
    console.log('db defaults set')
})

console.log(`Bot server started in the ${process.env.NODE_ENV} mode`)

cron.schedule('* * * * *', async () => {
    const inDb = db.getState()
    console.log(inDb.jobs)
    const inApi = await jobService.getAll(url)
    console.log(inApi)

    // bot.sendMessage('@testchannel_randomfacts', res.data.fact)
})