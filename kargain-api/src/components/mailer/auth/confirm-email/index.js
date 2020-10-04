const CONFIG = require('../../../../config')
const mailer = require('../../../../services/mailer')

const sendConfirmEmail = async params => {
    if (!params.email) {throw new Error('missing email')}
    if (!params.lastname) {throw new Error('missing lastname')}
    if (!params.firstname) {throw new Error('missing firstname')}
    if (!params.link) {throw new Error('missing activation link')}

    const message = {
        Messages: [
            {
                From: {
                    Email: CONFIG.mailer.from.email,
                    Name: CONFIG.mailer.from.name
                },
                To: [
                    {
                        Email: params.email,
                        Name: `${params.lastname} ${params.firstname}`
                    }
                ],
                TemplateID: 1336296,
                TemplateLanguage: true,
                Subject: 'Email confirmation Kargain',
                Variables: {
                    activation_link: params.link
                }
            }
        ]
    }

    return await mailer.sendMailJet(message)
}

module.exports = sendConfirmEmail
