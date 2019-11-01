require('dotenv').config()
const cron = require('node-cron')
const jobService = require('./services/jobs')
const url = 'http://localhost:3001/jobs'
const bot = require('./bot')

jobService.initJobs()

console.log(`Bot server started in the ${process.env.NODE_ENV} mode`)

const compareId = (a,b) => a.id > b.id

const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    a.sort(compareId)
    b.sort(compareId)

    for (let i = 0; i < a.length; ++i) {
      if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) {
        return false;
      }
    }
    return true;
}

const cronJob = async () => {
    const jobsLocal = jobService.readJobs()
    console.log(jobsLocal)
    const inApi = await jobService.getAll(url)
    console.log(inApi)

    if(!arraysEqual(jobsLocal, inApi)) {
      console.log('JOB LISTING HAS CHANGED IN API (or local is empty)')
      jobService.writeJobs(inApi)
    }
}

process.env.NODE_ENV === 'development' ?
  cronJob() :
  cron.schedule('* * * * *', cronJob)