const Errors = require('../utils/errors')
const Messages = require('../utils/messages')
const notificationModel = require('../models').Notification

exports.getCurrentUserNotifications = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    try {
        const notifications = await notificationModel.find({ to : { $elemMatch : req.user.id }})
	    
        return res.json({
            success : true,
            data : notifications
        })
    } catch (err) {
        next(err)
    }
}
