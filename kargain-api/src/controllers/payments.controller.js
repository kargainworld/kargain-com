const PaymentModel = require('../models').Payment
const Errors = require('../utils/errors')
const Messages = require('../utils/messages')
const config = require('../config')
const stripe = require('stripe')(config.isProd ? config.stripe.secret_key : config.stripe.secret_key)

exports.getIntent = async (req, res, next) => {
    try {
        const { intent_id } = req.params
        const intent = PaymentModel.findOne({ intent_id })
        return res.json({ client_secret: intent.client_secret })
    } catch (err) {
        return next(err)
    }
}

const offers = [
    {
        maxAnnounces: 10,
        price: 49.9, //EUR
        text: 'Vitrine publique ou vitrine location de 10 annonces, vitrine pro de 10 annonces',
        title: 'announces-10',
        niceTitle: 'Announces 10'
    },
    {
        maxAnnounces: 20,
        price: 99.9, //EUR
        title: 'announces-20',
        niceTitle: 'Announces 20'
    },
    {
        maxAnnounces: 50,
        price: 199.9, //EUR
        text: 'Vitrine publique ou vitrine location de 10 annonces, vitrine pro de 10 annonces',
        title: 'announces-100',
        niceTitle: 'Announces 100'
    }
]

exports.createPaymentIntent = async (req, res, next) => {
    const { product } = req.body
    const offer = offers.find(offer => offer.title === product)
    if (!offer) {return next(Errors.Error(Messages.errors.missing_offer))}
    
    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(offer.price || 0) * 10,
            currency: 'eur',
            metadata: {
                integration_check: 'accept_a_payment'
            }
        })
        
        return res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret
            }
        })
        
    } catch (err) {
        return next(err)
    }
}

exports.createUserSubscription = async (req, res, next) => {
    if (!req.user) {return next(Errors.UnAuthorizedError(Messages.errors.user_not_found))}
    
    const { payload, offerTitle } = req.body
    const offer = offers.find(offer => offer.title === offerTitle)
    try {
        const payment = new PaymentModel({
            ...payload,
            user: req.user,
            offer: {
                name: offer.title,
                title: offer.niceTitle
            }
        })
        
        const docPayment = await payment.save()
        
        req.user.subscription = docPayment.id
        req.user.hasProPlan = true
        
        const docUser = await req.user.save()
        
        return res.json({
            success: true, data: {
                docPayment,
                docUser
            }
        })
    } catch (err) {
        return next(err)
    }
}
