import handleResponse from '../libs/handleResponse'
import config from '../config/config'

function login (form) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    }

    return fetch(`${config.api}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function SSOAuthLogin (provider, data) {
    const url = `${config.api}/auth/sso-register`
    return request(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    function request (url, requestOptions) {
        return fetch(url, requestOptions)
            .then(handleResponse)
            .then(json => json.data)
            .catch(err => {
                throw err
            })
    }
}

function logout () {
    const requestOptions = {
        method: 'POST',
        credentials: 'include'
    }

    return fetch(`${config.api}/auth/logout`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function register (form) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    }

    return fetch(`${config.api}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function registerPro (form) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    }

    return fetch(`${config.api}/auth/register-pro`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function authorize () {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    }

    const url = `${config.api}/auth/authorize`

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function authorizeSSR (headers) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers
    }

    const url = `${config.api}/auth/authorize`

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function askForEmailActivation (email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    }

    return fetch(`${config.api}/auth/ask-email-activation`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function confirmAccount (token) {
    const requestOptions = {
        method: 'PUT'
    }

    return fetch(`${config.api}/auth/confirm-account/${token}`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function forgotPassword (email) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    }

    return fetch(`${config.api}/auth/forgot-password`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function resetPassword (token, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token,
            password
        })
    }

    return fetch(`${config.api}/auth/reset-password`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

export default {
    login,
    SSOAuthLogin,
    logout,
    register,
    registerPro,
    authorize,
    authorizeSSR,
    askForEmailActivation,
    confirmAccount,
    forgotPassword,
    resetPassword
}
