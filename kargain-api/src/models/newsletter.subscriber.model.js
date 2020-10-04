const mongoose = require('mongoose')

const newsletterSubscriber = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    active : {
        type : Boolean,
        default : true
    }
}, {
    timestamps: true
})

// Export mongoose model
module.exports = mongoose.model('Newsletter_subscriber', newsletterSubscriber)
