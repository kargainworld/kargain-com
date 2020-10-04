const express = require('express')
const routes = express.Router()
const vinDecoderController = require('../controllers/vindecoder.controller')

routes.get('/decodefree/:vin', vinDecoderController.decodeFree)

routes.get('/decode/:vin', vinDecoderController.decode)

routes.get('/image/:vin', vinDecoderController.image)

module.exports = routes
