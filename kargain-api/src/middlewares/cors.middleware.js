const config = require('../config')
const Errors = require('../utils/errors')

function corsOptions (allowCredentials = false) {
    return {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
        preflightContinue: true,
        credentials: true,
        origin: function (origin, callback) {
            if (config.whileListDomains.indexOf(origin) !== -1) {
                callback(null, allowCredentials ? origin : true)
            } else {
                callback(Errors.UnAuthorizedError('Not allowed by CORS'))
            }
        }
    }
}

const manualCors = (req, res, next) => {
    const origin = req.headers.origin
    if (config.whileListDomains.indexOf(origin) !== -1){
        res.header('Access-Control-Allow-Origin', origin)
    } else {
        res.header('Access-Control-Allow-Origin', true)
    }
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

const clientCors = corsOptions(false)
const authedCors = corsOptions(true)

module.exports = {
    clientCors,
    authedCors,
    manualCors
}
