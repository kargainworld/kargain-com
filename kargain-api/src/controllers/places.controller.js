const utils = require('../utils/helpers')
const CONFIG = require('../config')

const fetchGouvAdressesAPI = (req, res, next) => {
    const ADRESSE_API_URL = CONFIG.externalsAPI.geoGouv.adresse_API_URL
    const url = utils.buildUrl(ADRESSE_API_URL, req.query)

    utils.fetchExternalApi(url)
        .then(results => {
            return res.json({ success: true, msg: `from ${ADRESSE_API_URL}`, data: results })
        }).catch(next)
}

const fetchVicopoAPI = (req, res, next) => {
    const API_URL = CONFIG.externalsAPI.vicopo.API_URL
    const url = `${API_URL}/${req.params.query}`

    utils.fetchExternalApi(url)
        .then(cities => {
            return res.json({ success: true, msg: `from ${API_URL}`, data: cities })
        }).catch(next)
}

module.exports = { fetchGouvAdressesAPI, fetchVicopoAPI }
