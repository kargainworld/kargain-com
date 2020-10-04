const { roles: rolesMiddleware } = require('../roles')

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = rolesMiddleware.can(req.user.role)[action](resource)
            if (!permission.granted) {
                return res.status(401).json({
                    error: 'You don\'t have enough permission to perform this action'
                })
            }
            req.user.accessGranted = true
            next()
        } catch (error) {
            next(error)
        }
    }
}
