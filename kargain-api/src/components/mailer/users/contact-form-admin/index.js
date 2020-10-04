const CONFIG = require('../../../../config')
const mailer = require('../../../../services/mailer')

const sendContactMessageToAdmin = async params => {
    if (!params.email) {throw new Error('missing email')}
    if (!params.subject) {throw new Error('missing object')}
    if (!params.message) {throw new Error('missing message')}
    if (!params.date) {throw new Error('missing date')}

    const message = {
        Messages: [
            {
                From: {
                    Email: CONFIG.mailer.from.email
                },
                To: [
                    {
                        Email:  CONFIG.mailer.from.email,
                        Name: CONFIG.mailer.from.name
                    }
                ],
                ReplyTo : {
                    Email : params.email
                },
                TemplateID: 1497816,
                TemplateLanguage: true,
                Subject: `Kargain Contact Form - ${params.subject}`,
                Variables: {
                    email : params.email,
                    subject : params.subject,
                    message: params.message,
                    date : params.date
                }
            }
        ]
    }

    return await mailer.sendMailJet(message)
}

module.exports = sendContactMessageToAdmin
