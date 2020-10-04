const vehicleSchema = require('../schemas/vehicles/vehicleModel.schema')
const mongoose = require('mongoose')

const bulkInsert = (req, res, next) => {
    const data = req.body
    const vehicleType = req.params.vehicle
    const vehicleTypeCapitalized = vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)
    const model = mongoose.model(vehicleTypeCapitalized, vehicleSchema)

    model.insertMany(data)
        .then(function (docs) {
            return res.json({ success: true, msg: `${docs.length} inserted` })
        })
        .catch(next)
}

module.exports = { bulkInsert }
