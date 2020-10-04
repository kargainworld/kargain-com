const redisConfig = require('../services/redis')
const redisClient = redisConfig.redisClient
const utils = require('../utils/helpers')
const CONFIG = require('../config')

const decodeFree = (req, res, next) => {
    const BASE_API_URL = CONFIG.externalsAPI.vindecoderFree.API_URL
    const vin = req.params.vin

    const params = {
        format: 'json'
    }

    const url = utils.buildUrl(`${BASE_API_URL}/${vin}`, params)

    redisConfig.getCacheKey(url).then(data => {
        if (data) {return res.json({ success: true, msg: 'from redis', from: url, hostname: redisClient.address, data })}
        else {
            utils.fetchExternalApi(url).then(result => {
                const data = result.Results[0]
                if (data) {
                    redisClient.set(url, JSON.stringify(data))
                    return res.json({ success: true, msg: 'from API', from: url, data })
                } else {next('error while decoding VIN')}
            }).catch(next)
        }
    })
}

const decode = (req, res, next) => {
    const BASE_API_URL = CONFIG.externalsAPI.vindecoder.API_URL
    const AUTORIZATION_HEADER = CONFIG.externalsAPI.vindecoder.authorization
    const PARTNER_TOKEN = CONFIG.externalsAPI.vindecoder['partner-token']

    const headers = {
    // 'partner-token': PARTNER_TOKEN,
    // 'authorization': AUTORIZATION_HEADER
    }

    const params = {
        vin: req.params.vin
    }

    const url = utils.buildUrl(`${BASE_API_URL}/decode`, params)

    redisConfig.getCacheKey(url).then(data => {
        if (data) {return res.json({ success: true, msg: 'from redis', hostname: redisClient.address, data })}
        else {
            utils.fetchExternalApi(url, headers).then(data => {
                redisClient.set(url, JSON.stringify(data))
                return res.json({ success: true, msg: 'from API', data })
            }).catch(next)
        }
    })
}

const image = (req, res, next) => {
    const BASE_API_URL = CONFIG.externalsAPI.vindecoder.API_URL
    const AUTORIZATION_HEADER = CONFIG.externalsAPI.vindecoder.authorization
    const PARTNER_TOKEN = CONFIG.externalsAPI.vindecoder['partner-token']

    const headers = {
    // 'partner-token': PARTNER_TOKEN,
    // 'authorization': AUTORIZATION_HEADER
    }

    const params = {
        vin: req.params.vin
    }

    const url = utils.buildUrl(`${BASE_API_URL}/image`, params)

    redisConfig.getCacheKey(url).then(data => {
        if (data) {return res.json({ success: true, msg: 'from redis', hostname: redisClient.address, data })}
        else {
            utils.fetchExternalApi(url, headers).then(data => {
                redisClient.set(url, JSON.stringify(data))
                return res.json({ success: true, msg: 'from API', data })
            }).catch(next)
        }
    })
}

module.exports = { decode, decodeFree, image }
