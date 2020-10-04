const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    to : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    pings : [
        {
            message : String,
            action : String,
            opened : {
                type : Boolean,
                default : false
            }
        }
    ]
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: false
})

// Export mongoose model
module.exports = mongoose.model('Notification', NotificationSchema)
