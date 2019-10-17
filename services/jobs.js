const axios = require('axios')

const url = 'http://localhost:3001/jobs'

const getAll = async () => {
    const res = await axios.get(url)
    return res.data 
}

module.exports = { getAll }