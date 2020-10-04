import config from '../config/config'
import {buildUrl} from '../libs/utils'
import handleResponse from '../libs/handleResponse'

const baseRoute = `${config.api}/vehicles`

function getCarsDistinctModels (vehicleType, make) {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(buildUrl(`${baseRoute}/cars/distinct/make/models`, { make }), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .then(data => {
            if(!Array.isArray(data)){
                return fetch(buildUrl(`${baseRoute}/cars/distinct/make/models`, { make, forceRewriteCache : true }), requestOptions)
                    .then(handleResponse)
                    .then(json => json.data)
                    .catch(err => {
                        throw err
                    })
            }
        })
        .catch(err => {
            throw err
        })
}

function getCarsDistinctMakeModelTrims (make, model) {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(buildUrl(`$${baseRoute}/cars/distinct/make/model/trims`, { make, model }), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getCarsMakeModelTrimYears (make, model, trim) {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(buildUrl(`${baseRoute}/cars/make/model/trim/years`, { make, model, trim }), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getMakes (vehicleType) {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(`${baseRoute}/dyn/${vehicleType}/makes`, requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}


function getMakeModels (vehicleType, make) {
    const requestOptions = {
        method: 'GET'
    }

    return fetch(buildUrl(`${baseRoute}/dyn/${vehicleType}/models`, { make }), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getVehiclesGenerations (make_id, model_id) {
    if (!make_id || isNaN(make_id)) throw 'make param is not a number'
    if (!model_id || isNaN(model_id)) throw 'make param is not a number'

    const params = {
        select: 'generation',
        make_id,
        model_id
    }

    const requestOptions = {
        method: 'GET'
    }

    return fetch(buildUrl(params, requestOptions))
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

function getVehiclesYearsVersion (make_id, model_id, generation_id) {
    if (!make_id || isNaN(make_id)) throw 'make param is not a number'
    if (!model_id || isNaN(model_id)) throw 'make param is not a number'
    if (!generation_id || isNaN(generation_id)) throw 'make param is not a number'

    const params = {
        select: 'year',
        make_id,
        model_id,
        generation_id
    }

    const requestOptions = {
        method: 'GET'
    }

    return fetch(buildUrl(params), requestOptions)
        .then(handleResponse)
        .then(json => json.data)
        .catch(err => {
            throw err
        })
}

export default {
    getMakes,
    getMakeModels,
    getVehiclesGenerations,
    getCarsDistinctModels,
    getCarsDistinctMakeModelTrims,
    getCarsMakeModelTrimYears,
    getVehiclesYearsVersion
}
