import handleResponse from '../libs/handleResponse'
import config from '../config/config'
import {buildUrl} from '../libs/utils'

const baseRoute = `${config.api}/announces`

//admin
function getAnnouncesAll () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(`${baseRoute}/all`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getFeedAnnounces (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(buildUrl(`${baseRoute}/feed`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getSearchAnnounces (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(buildUrl(`${baseRoute}/search`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getSearchAnnouncesCount (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(buildUrl(`${baseRoute}/count`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getProfileAnnounces (params = {}) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(buildUrl(`${baseRoute}/profile`,params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getAnnounceBySlug (slug) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    return fetch(`${baseRoute}/slug/${slug}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function createAnnounce (data) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(`${baseRoute}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function updateAnnounce (slug, data) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(`${baseRoute}/update/${slug}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function updateAdminAnnounce (slug, updates) {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    }

    return fetch(`${baseRoute}/update-admin/${slug}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function removeAnnounce (slug) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include'
    }

    return fetch(`${baseRoute}/remove/${slug}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function uploadImages (slug, formData) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: formData
    }

    return fetch(`${baseRoute}/upload/${slug}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const addLikeLoggedInUser = (announceId) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include'
    }

    return fetch(`${baseRoute}/addLike/${announceId}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const removeLikeLoggedInUser = (announceId) => {
    const requestOptions = {
        method: 'PUT',
        credentials: 'include'
    }

    return fetch(`${baseRoute}/removeLike/${announceId}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

const mailtoAnnounceLink = (slug, email) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email
        })
    }
    
    return fetch(`${baseRoute}/mailto/${slug}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

export default {
    getFeedAnnounces,
    getProfileAnnounces,
    getSearchAnnounces,
    getSearchAnnouncesCount,
    getAnnouncesAll,
    getAnnounceBySlug,
    createAnnounce,
    updateAnnounce,
    updateAdminAnnounce,
    removeAnnounce,
    uploadImages,
    addLikeLoggedInUser,
    removeLikeLoggedInUser,
    mailtoAnnounceLink
}
