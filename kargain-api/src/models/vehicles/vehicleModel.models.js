const mongoose = require('mongoose')
const vehicleModelSchema = require('../../schemas/vehicles/vehicleModel.schema')
const names = ['cars','buses', 'motorcycles', 'campers', 'trucks']

const models = names.reduce((carry, name) => {
    return { ...carry, [name]: mongoose.model(`${name}_models`, vehicleModelSchema(name)) }
}, {})

module.exports = models
