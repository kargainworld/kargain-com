const jwt = require('jsonwebtoken')
const Errors = require('../utils/errors')
const Messages = require('../utils/messages')
const config = require('../config')
const User = require('../models').User

const byPassAuth = (populates = []) => async (req, res, next) => {
    try {
        const token = req?.signedCookies?.['token'] ?? req?.cookies?.['token'] ?? null
        if (!token) {
            return next()
        }

        const decoded = await jwt.verify(token, config.jwt.encryption)
        if (!decoded || !decoded.uid) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}

        let request = User.findById(decoded.uid)
        populates.forEach(populate => { request = request.populate(populate)})
        const user = await request.exec()

        if (user && !user?.removed === true) {req.user = user}
        next()
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    byPassAuth
}
