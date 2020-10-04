const CONFIG = require('../../../config')
const mailer = require('../../../services/mailer')

const successConfirmAnnounce = async params => {
    if (!params.email) {throw new Error('missing email')}
    if (!params.firstname) {throw new Error('missing firstname')}
    if (!params.title) {throw new Error('missing title')}
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
                    title : params.title,
                    announce_link : params.announce_link,
                    featured_img_link : params.featured_img_link
                },
                TemplateID: 1481702,
                TemplateLanguage: true,
                Subject: 'Kargain | Announce activated'
            }
        ]
    }

    return await mailer.sendMailJet(message)
}

module.exports = successConfirmAnnounce
