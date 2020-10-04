const CONFIG = require('../../../config')
const mailer = require('../../../services/mailer')

const confirmCreateAnnounce = async params => {
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
                    manufacturer_make : params?.manufacturer?.make,
                    manufacturer_model : params?.manufacturer?.model,
                    manufacturer_generation : params?.manufacturer?.generation,
                    announce_link : params.announce_link,
                    featured_img_link : params.featured_img_link
                },
                TemplateID: 1472608,
                TemplateLanguage: true,
                Subject: 'Kargain new announce confirmation email'
            }
        ]
    }
    
    return await mailer.sendMailJet(message)
}

module.exports = confirmCreateAnnounce
