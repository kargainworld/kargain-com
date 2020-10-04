const announcesFiltersMapper = require('./announcesFiltersMapper')

const buildFilters = (query) => {
    return Object.keys(announcesFiltersMapper).reduce((carry, key) => {
        const match = Object.keys(query).find(prop => prop === key)
        if (match) {
            return {
                ...carry,
                [key]: {
                    ...announcesFiltersMapper[key],
                    value: query[key]
                }
            }
        } else {return carry}
    }, {})
}

const prepareFilters = (query, defaultQuery) => {
    const filters = buildFilters(query)
    let result = Object.keys(filters).reduce((carry, key) => {
        const filter = filters[key]
        if (typeof filter === 'object') {
   
            if (!carry[filter.ref]) {carry[filter.ref] = {}}
   
            if (filter.type === 'range') {
                const values = filter.value.split(',')
                const min = Number(values[0])
                const max = Number(values[1])
    
                if (!filter.disable) {
                    if (min) {carry[filter.ref]['$gte'] = min}
                    if (max) {
                        if (filter.maxDisable && max < filter.maxDisable) {
                            carry[filter.ref]['$lte'] = max
                        } else {carry[filter.ref]['$lte'] = max}
                    }
                }
            }
   
            else if (filter.type === 'number') {
                if(filter.rule === 'max') {carry[filter.ref]['$gte'] = Number(filter.value)}
                else if(filter.rule === 'strict') {Number(filter.value)}
                //default behaviour = under maximum default value allowed
                else {carry[filter.ref]['$lte'] = Number(filter.value)}
            }
   
            else if (filter.type === 'array') {
                carry[filter.ref] = {
                    $in: filter.value.split(',').map(v => filter.number ? Number(v) : v)
                }
            }
   
            else {
                if (filter.rule === 'strict') {
                    carry[filter.ref] = filter.value.toLowerCase()
                } else {
                    carry[filter.ref] = {
                        $regex: filter.value,
                        $options: 'i'
                    }
                }
            }
   
        }
        return carry
    }, defaultQuery)
 
    if (query.enableGeocoding && Array.isArray(query.coordinates) && query.radius) {
        result = {
            ...result,
            'location': {
                $near: {
                    $geometry:
                        {
                            type: 'Point',
                            coordinates: [query.coordinates[0], query.coordinates[1]] },
                    $maxDistance: query.radius * 1000
                }
            }
        }
    }
 
    return result
}

module.exports = prepareFilters
