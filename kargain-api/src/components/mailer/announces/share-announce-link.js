const CONFIG = require('../../../config')
const mailer = require('../../../services/mailer')
const Errors = require('../../../utils/errors')
const Messages = require('../../../utils/messages')

const confirmCreateAnnounce = async params => {
    if (!params.emailTo) {throw Errors.NotFoundError(Messages.missing_or_invalid_email)}
    if (!params.announce_link) {throw Errors.NotFoundError(Messages.announce_not_found)}
    if(!params.fromFullName) {throw Errors.NotFoundError(Messages.announce_not_found)}
    
    const message = {
        Messages: [
            {
                From: {
                    Email: CONFIG.mailer.from.email,
                    Name: CONFIG.mailer.from.name
                },
                To: [
                    {
                        Email: params.emailTo
                    }
                ],
                Variables : {
                    fromFullName : params.fromFullName,
                    announce_link : params.announce_link,
                    featured_img_link : params.featured_img_link
                },
                TemplateID: 1683826,
                TemplateLanguage: true,
                Subject: 'Kargain Share announce'
            }
        ]
    }
    
    return await mailer.sendMailJet(message)
}

module.exports = confirmCreateAnnounce
