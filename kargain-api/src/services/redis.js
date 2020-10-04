const redis = require('redis')
const CONFIG = require('../config')

const redisClient = redis.createClient({
    port: CONFIG.redis.port,
    host: CONFIG.redis.host,
    password: CONFIG.redis.password,
    retry_strategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with a individual error
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted')
        }
        if (options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined
        }
        // reconnect after
        return Math.max(options.attempt * 100, 3000)
    }
})

setInterval(function () {
    console.log('redisClient => Sending Ping...')
    redisClient.ping()
}, 60000) // 60 seconds

redisClient.on('error', function (err) {
    throw err
})

const getCacheKey = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, entry) => {
            if (err) {throw err}
            if (entry) {
                resolve(JSON.parse(entry))
            } else {resolve(null)}
        })
    })
}

const delCacheKey = (key, cb) => {
    redisClient.del(key, (err, data) => cb(err, data))
}

/*
 * Calling unref() will allow this program to exit immediately after the get
 * command finishes. Otherwise the client would hang as long as the
 * client-server connection is alive.
 */
redisClient.unref()

module.exports = { redisClient, getCacheKey, delCacheKey }
