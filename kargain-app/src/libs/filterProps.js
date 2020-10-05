import announcesFiltersMapper from './announcesFiltersMapper'
import resolveObjectKey from './resolveObjectKey'

const filterProps = formData => {
    return Object.keys(announcesFiltersMapper).reduce((carry, key) => {
        const property = announcesFiltersMapper[key]
        const field = resolveObjectKey(formData, key)

        if (field && property) {
            if (typeof property === 'object') {
                if (Array.isArray(field) && property.type === 'array') {
                    const values = field.map(item => item[property.selector])
                    return {
                        ...carry,
                        [property.name]: values
                    }
                }
                else{
                    return {
                        ...carry,
                        [property.name]: field[property.selector]
                    }
                }
            }

            return {
                ...carry,
                [property]: !isNaN(Number(field)) ? Number(field) : field
            }
        }
        return carry
    }, {})
}

export default filterProps
