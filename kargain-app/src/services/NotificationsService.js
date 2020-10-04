import handleResponse from '../libs/handleResponse'
import config from '../config/config'

const baseRoute = `${config.api}/announces`

//admin
function sendTokenToDb (token) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body : JSON.stringify({
            token
        })
    }

    return fetch(`${baseRoute}/all`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function deleteTokenFromDb () {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include'
    }
    
    return fetch(`${baseRoute}/all`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

export default {
    sendTokenToDb,
    deleteTokenFromDb
}
