import handleResponse from '../libs/handleResponse'
import config from '../config/config'

function createComment (body) {
    const url = `${config.api}/comments`
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function disableComment (commentID) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include'
    }

    return fetch(`${config.api}/comments/disable/${commentID}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function enableComment (commentID) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include'
    }
    
    return fetch(`${config.api}/comments/enable/${commentID}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

export default {
    createComment,
    disableComment,
    enableComment
}
