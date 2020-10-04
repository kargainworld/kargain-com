const User = require('./user.model')
const Announce = require('./announce.model')
const VehiclesMakesModels = require('./vehicles/vehicleMake.models')
const VehiclesModelModels = require('./vehicles/vehicleModel.models')
const Media = require('./media.s3.model')
const Comment = require('./comment.model')
const Payment = require('./payment.model')
const NewsletterSubscriber = require('./newsletter.subscriber.model')
const ContactMessage = require('./contact.message.model')
const Conversation = require('./conversations.model')
const Notification = require('./notification.model')

module.exports = {
    User,
    Media,
    Comment,
    Announce,
    Payment,
    Conversation,
    NewsletterSubscriber,
    ContactMessage,
    Notification,
    Vehicles: {
        Makes: { ...VehiclesMakesModels },
        Models: { ...VehiclesModelModels }
    }
}
