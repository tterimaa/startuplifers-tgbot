const axios = require('axios')
const fs = require('fs')

const testapiurl = 'http://localhost:3001/jobs'

const getAll = async () => {
    const res = await axios.get(testapiurl)
    return res.data 
}

const initJobs = () => {
    let initialJobs
    if(fs.existsSync('jobs.json')) {
        const rawdata = fs.readFileSync('jobs.json') // initialization in test from file
        initialJobs = JSON.parse(rawdata)
    }
    else initialJobs = { jobs: [] } // In production init with initial api data
    fs.writeFileSync('jobs.json', JSON.stringify(initialJobs))
}

const readJobs = () => {
    const rawdata = fs.readFileSync('jobs.json')
    const json = JSON.parse(rawdata)
    return json.jobs
}

const writeJobs = (newJobs) => {
    const jobs = {
        jobs: newJobs
    }
    fs.writeFileSync('jobs.json', JSON.stringify(jobs))
}

module.exports = { getAll, initJobs, readJobs, writeJobs }