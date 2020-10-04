import queryString from 'querystring'
import handleResponse from '../libs/handleResponse'
import config from '../config/config'
import {buildUrl} from '../libs/utils'

function generatePutUrl (Key, ContentType) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': ContentType
        }
    }

    const params = {
        Key,
        ContentType
    }

    let url = buildUrl(config.api, "/uploads/generate-put-url", params)

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function putSingleObjectExternal (putURL, file, Key, ContentType) {
    const requestOptions = {
        method: 'PUT',
        body : file,
        headers: {
            'Content-Type': ContentType
        }
    }

    const params = {
        Key,
        ContentType
    }

    let url = `${putURL}&${queryString.stringify(params)}`
    return fetch(url, requestOptions)
        .then(res => res)
        .catch(err => {
            throw err
        })
}

export default {
    generatePutUrl,
    putSingleObjectExternal
}
