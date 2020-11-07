const config = require('../config')
const Errors = require('../utils/errors')
const logger = require('../services/logger')

function corsOptions (allowCredentials = false) {
    return (req, res, next) => {
        const origin = req.headers.origin
        if (config.whileListDomains.indexOf(origin) !== -1) {
            res.header('Access-Control-Allow-Origin', origin)
        } else {
            res.header('Access-Control-Allow-Origin', true)
        }
        res.header('Access-Control-Allow-Credentials', allowCredentials)
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        next()
    }
}

const manualCors = corsOptions(true)

const clientCors = corsOptions(false)
const authedCors = corsOptions(true)

module.exports = {
    clientCors,
    authedCors,
    manualCors
}
