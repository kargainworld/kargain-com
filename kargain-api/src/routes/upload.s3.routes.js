const express = require('express')
const app = express.Router()
const cors = require('cors')
const passportMiddleware = require('../middlewares/passport')
const corsMiddleware = require('../middlewares/cors.middleware')
const uploadController = require('../controllers/upload.s3.controller')

app.get('/config',
    corsMiddleware.manualCors,
    passportMiddleware.authenticate('cookie', { session: false }),
    //TODO ADMIN
    uploadController.getS3Config
)

//TODO remove
// GET URL
app.get('/generate-get-url', cors(), uploadController.generateGetUrl)

//TODO remove
// PUT URL
app.get('/generate-put-url', cors(), uploadController.generatePutUrl)

module.exports = app
