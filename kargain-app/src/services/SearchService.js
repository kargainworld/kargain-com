
import handleResponse from '../libs/handleResponse';
import config from '../config/config';
import {buildUrl} from '../libs/utils'

const baseRoute = `${config.api}/search`;

function fetchSearchResults (filters) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    return fetch(buildUrl(baseRoute, filters), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err;
        });
}

export default {
    fetchSearchResults
};
