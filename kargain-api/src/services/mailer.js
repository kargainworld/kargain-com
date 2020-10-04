const nodemailer = require('nodemailer')
const mailjet = require('node-mailjet')
const CONFIG = require('../config')
const mailConfig = CONFIG.mailer.mailjet.smtp
const transporter = nodemailer.createTransport(mailConfig)

const verify = callback => {
    transporter.verify((err, success) => {
        if (err) {return callback(err)}
        callback(null, success)
    })
}

const test = callback => {
    const recipient = {
        firstname: 'nicolas',
        lastname: 'giraudo',
        email: 'giraudo.nicolas13@gmail.com'
    }
    
    const message = {
        from: {
            name: CONFIG.mailer.from.name,
            address: CONFIG.mailer.from.email
        },
        to: {
            name: `${recipient.lastname} ${recipient.lastname}`,
            address: recipient.email
        },
        subject: 'Message title',
        text: 'Plaintext version of the message'
    }
    
    nodemailer.createTestAccount((err) => {
        if (err) {return callback(err)}
        transporter.sendMail(message).then(info => {
            console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
            callback(null, info)
        })
    })
}

const nodeMailerLegacy = (message, callback) => {
    transporter.sendMail(message, (err, info) => {
        console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`)
        callback(err, info)
    })
}

const sendMailJet = async message => {
    const mailer = mailjet.connect(CONFIG.mailer.mailjet.API_KEY, CONFIG.mailer.mailjet.password)
    return await mailer.post('send', {
        version: 'v3.1',
        timeout: 1000,
        perform_api_call: true // false to disable
    }).request(message)
}

module.exports = { test, verify, nodeMailerLegacy, sendMailJet }
