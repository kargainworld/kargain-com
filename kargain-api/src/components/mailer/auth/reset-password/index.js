const CONFIG = require('../../../../config')
const mailer = require('../../../../services/mailer')

const sendConfirmEmail = async params => {
    if (!params.email) {throw new Error('missing email')}
    if (!params.lastname) {throw new Error('missing lastname')}
    if (!params.firstname) {throw new Error('missing firstname')}
    if (!params.reset_link) {throw new Error('missing reset link')}
    if (!params.report_link) {throw new Error('missing report link')}

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
                TemplateID: 1337110,
                TemplateLanguage: true,
                Subject: 'Reset Password Kargain',
                Variables: {
                    report_link: params.report_link,
                    reset_link: params.reset_link
                }
            }
        ]
    }

    return await mailer.sendMailJet(message)
}

module.exports = sendConfirmEmail
