const express = require('express')
const router = express.Router()
const config = require('../config')
const logger = require('../services/logger')
const authRoutes = require('./auth.routes')
const usersRoutes = require('./users.routes')
const announcesRoutes = require('./announce.routes')
const vehiclesRoutes = require('./vehicles.routes')
const vinDecoderRoutes = require('./vindecoder.routes')
const uploadS3Routes = require('./upload.s3.routes')
const commentsRoutes = require('./comments.routes')
const paymentsRoutes = require('./payments.routes')
const conversationsRoutes = require('./conversations.routes')
const searchRoutes = require('./search.routes')
const notificationsRoutes = require('./notifications.routes')

router.use('/auth', authRoutes)
router.use('/users', usersRoutes)
router.use('/announces', announcesRoutes)
router.use('/vehicles', vehiclesRoutes)
router.use('/vindecoder', vinDecoderRoutes)
router.use('/uploads', uploadS3Routes)
router.use('/comments', commentsRoutes)
router.use('/payments', paymentsRoutes)
router.use('/conversations', conversationsRoutes)
router.use('/search', searchRoutes)
router.use('/notifications', notificationsRoutes)

router.get('/', function (req, res, next) {
    return res.end('api routes home')
})

if (!config.isProd) {

    router.get('/db', function (req, res, next) {
        return res.end(config.db.mongo_location)
    })

    router.get('/log', async function (req, res, next) {
        const date = new Date()
        const log = {
            level : 'debug',
            time : date.getTime(),
            host : req.get('host')
        }
        await logger.debug(log)
        return res.json(log)
    })

    router.get('/config', function (req, res, next) {
        return res.json({
            success: true,
            data: {
                config
            }
        })
    })
}

module.exports = router
