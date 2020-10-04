import handleResponse from '../libs/handleResponse'
import config from '../config/config'

const BASE_ROUTE = `${config.api}/payments`

function createPaymentIntent (data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    return fetch(`${BASE_ROUTE}/create-payment-intent`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function createUserSubscription (payload) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return fetch(`${BASE_ROUTE}/create-user-subscription`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        }
        )
}

export default {
    createPaymentIntent,
    createUserSubscription
}
