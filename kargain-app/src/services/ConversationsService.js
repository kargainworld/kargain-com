import handleResponse from '../libs/handleResponse'
import config from '../config/config'

const getCurrentUserConversations = () => {
    const url = `${config.api}/conversations`
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const getConversationWithProfile = (profileId) => {
    const url = `${config.api}/conversations/profile/${profileId}`
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const postConversationMessage = (message, recipientId) => {
    const url = `${config.api}/conversations`
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message,
            recipientId
        })
    }

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

export default {
    getConversationWithProfile,
    getCurrentUserConversations,
    postConversationMessage
}
