const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentIntent: {},
    payment_method_types: []
}, {
    strict: false
})

PaymentSchema.virtual('id').get(function () {
    const user = this
    return user._id
})

// Export mongoose model
module.exports = mongoose.model('Payment', PaymentSchema)
