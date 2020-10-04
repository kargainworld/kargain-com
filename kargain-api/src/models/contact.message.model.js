const mongoose = require('mongoose')

const contactMessage = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    subject: String,
    message: String
    
}, {
    timestamps: true
})

// Export mongoose model
module.exports = mongoose.model('Contact_message', contactMessage)
