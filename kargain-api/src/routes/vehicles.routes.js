const express = require('express')
const router = express.Router()
const cors = require('cors')
const rolesMiddleware = require('../middlewares/roles.middleware')
const corsMiddleware = require('../middlewares/cors.middleware')
const passportMiddleware = require('../middlewares/passport')
const vehicleController = require('../controllers/vehicles.controller')

//admin only
router.options('/:vehicleType/makes', cors(corsMiddleware.authedCors)) // enable pre-flights
router.post('/:vehicleType/makes',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    rolesMiddleware.grantAccess('updateAny', 'make'),
    vehicleController.createMakes
)

//admin only
router.options('/:type/makes', cors(corsMiddleware.authedCors)) // enable pre-flights
router.put('/:type/makes',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    rolesMiddleware.grantAccess('updateAny', 'make'),
    vehicleController.updateMakes
)

//admin only
router.options('/dyn/:vehicleType/models', cors(corsMiddleware.authedCors)) // enable pre-flights
router.post('/dyn/:vehicleType/models',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    rolesMiddleware.grantAccess('updateAny', 'make'),
    vehicleController.createModels
)

// type : ["cars", "buses", "scooters", "campers", "motorcycles", "trucks"];
router.get('/dyn/:vehicleType/makes',
    cors(corsMiddleware.clientCors),
    vehicleController.getVehicleTypeMakes
)

//query : { make : String }
router.get('/dyn/:vehicleType/models',
    cors(corsMiddleware.clientCors),
    vehicleController.getVehicleTypeMakeModels
)

//query : { make : String }
router.get('/cars/distinct/make/models',
    cors(corsMiddleware.clientCors),
    vehicleController.getCarsMakeModels
)

//query : { make : String, model : String }
router.get('/cars/distinct/make/model/trims',
    cors(corsMiddleware.clientCors),
    vehicleController.getCarsMakeModelTrims
)

//query : { make : String, model : String, (trim : String) }
router.get('/cars/make/model/trim/years',
    cors(corsMiddleware.clientCors),
    vehicleController.getCarsMakeModelTrimYears
)

module.exports = router
