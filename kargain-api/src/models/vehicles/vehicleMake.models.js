const mongoose = require('mongoose')
const vehicleMakeSchema = require('../../schemas/vehicles/vehicleMake.schema')
const names = ['cars','buses', 'motorcycles', 'campers', 'trucks']

const models = names.reduce((carry, name) => {
    return { ...carry, [name]: mongoose.model(`${name}_makes`, vehicleMakeSchema) }
}, {})

module.exports = models
