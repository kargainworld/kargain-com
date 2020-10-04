import config from '../config/config'
import handleResponse from '../libs/handleResponse'

function decodeVIN (vin) {
    const url = `${config.api}/vindecoder/decode/${vin}`
    return fetchAPI(url)
}

function decodeVINFree (vin) {
    const url = `${config.api}/vindecoder/decodefree/${vin}`
    return fetchAPI(url)
}

function getCarImageFromVIN (vin) {
    const url = `${config.api}/vindecoder/image/${vin}`
    return fetchAPI(url)
}

const fetchAPI = (url) => {
    return fetch(url)
        .then(handleResponse)
        .then(json => {
            return json.data
        })
        .catch(err => {
            throw err
        }
        )
}

export default {
    decodeVIN,
    decodeVINFree,
    getCarImageFromVIN
}
