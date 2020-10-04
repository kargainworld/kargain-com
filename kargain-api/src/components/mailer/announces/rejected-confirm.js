const CONFIG = require('../../../config')
const mailer = require('../../../services/mailer')

const rejectedConfirmAnnounce = async params => {
    if (!params.email) {throw new Error('missing email')}
    if (!params.firstname) {throw new Error('missing firstname')}
    if (!params.announce_link) {throw new Error('missing announce link')}
    
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
                Variables : {
                    announce_link : params.announce_link
                },
                TemplateID: 1481839,
                TemplateLanguage: true,
                Subject: 'Kargain | Announce rejetée'
            }
        ]
    }

    return await mailer.sendMailJet(message)
}

module.exports = rejectedConfirmAnnounce
