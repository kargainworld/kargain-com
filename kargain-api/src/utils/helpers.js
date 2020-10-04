const fetch = require('node-fetch')
const querystring = require('querystring')

function stringToSlug (str) {
    const v = str.replace(/^\s+|\s+$/g, '').toLowerCase()
    
    // remove accents, swap ñ for n, etc
    const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to = 'aaaaaeeeeiiiioooouuuunc------'
    
    return from.split('').reduce((carry,c, i) =>
        carry.replace(new RegExp(c, 'g'), to.charAt(i)),v)
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes
}

const resolveObjectKey = (obj, str) => {
    if (!str) {return obj}
    if (typeof obj === 'object') {
        str = str.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
        str = str.replace(/^\./, '')           // strip a leading dot
        const a = str.split('.')
        for (let i = 0, n = a.length; i < n; ++i) {
            const k = a[i]
            if (!obj) {return}
            if (k in obj) {
                obj = obj[k]
            } else {
                return
            }
        }
    }
    return obj
}

const fetchExternalApi = (url, headers = {}) => {
    return fetch(url, { headers })
        .then(response => response.json())
        .catch(err => {
            throw err
        })
}

const capitalizeWords = (str) => {
    if (!str) {return}
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

const buildUrl = (baseUrl, params) => {
    return Object.keys(params).length ? `${baseUrl}?${querystring.stringify(params)}` : baseUrl
}

module.exports = {
    stringToSlug,
    resolveObjectKey,
    fetchExternalApi,
    buildUrl,
    capitalizeWords
}
