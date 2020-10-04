const mongoose = require('mongoose')
const Errors = require('../../utils/errors')
const Messages = require('../../utils/messages')
const notificationModel = require('../../models').Notification

const postNotification = ({
    uid,
    message,
    action
}) => {
    return new Promise((resolve, reject) => {
        if(!uid) { reject(Errors.NotFoundError(Messages.errors.missing_or_invalid_email))}
        if (!message) { reject(Errors.NotFoundError('missing firstname'))}
    
        const result = notificationModel.updateMany(
            { to : mongoose.Types.ObjectId(uid) },
            { $addToSet: { pings: { message, action } } },
            { runValidators: true }
        )
        
        return resolve(result)
    })
}

module.exports = {
    postNotification
}
