const CONFIG = require('../../../config')
const mailer = require('../../../services/mailer')

const confirmCreateAnnounce = async params => {
    if (!params.email) {throw new Error('missing email')}
    if(!params.announce_link) {throw new Error('missing announce link')}
    if (!params.announce_title) {throw new Error('missing announce title')}
    if (!params.announce_creation_date) {throw new Error('missing creation date')}

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
                    announce_link : params.announce_link,
                    announce_title : params.announce_title,
                    announce_creation_date : params.announce_creation_date
                },
                TemplateID: 1537849,
                TemplateLanguage: true,
                Subject: 'Kargain | Announce disabled'
            }
        ]
    }

    return await mailer.sendMailJet(message)
}

module.exports = confirmCreateAnnounce
