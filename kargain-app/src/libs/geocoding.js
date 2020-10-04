import Geocode from 'react-geocode'

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyAWfuFiGzngYAgiv1NKUyTbVDOXskv34r8')

// set response language. Defaults to english.
Geocode.setLanguage('fr')

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('fr')

// Enable or disable logs. Its optional.
// Geocode.enableDebug();

/**
 * Returns a promise
 * @return {Promise}
 * @param lat
 * @param lng
 */
export function geoCodeFromLatLng (lat = '48.8583701', lng = '2.2922926') {
    return Geocode.fromLatLng(lat, lng).then(
        response =>
            response.results[0],
        error => {
            throw error
        }
    )
}

/**
 * Returns a promise
 * @param {String} address
 * @return {Promise}
 */
export function geoCodeFromAddress (address = 'Eiffel Tower') {
// Get latitude & longitude from address.
    return Geocode.fromAddress(address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location
            return { lat, lng }
        },
        error => {
            throw error
        }
    )
}
