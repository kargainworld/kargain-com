const cron = require('node-cron')
const moment = require('moment')
const config = require('../../../config')
const AnnounceMailer = require('../../../components/mailer').announces
const AnnounceModel = require('../../../models').Announce

cron.schedule('* * * * *', async () => {
    const twoMonthsAgo = moment().subtract(2, 'months')

    try {
        const docs = await AnnounceModel.find({
            visible: true,
            'createdAt': {
                $lt: twoMonthsAgo.toDate()
            }
        }).populate('user')

        await Promise.all(docs.map(async (doc) => {
            doc.visible = false
            await doc.save()
            return doc
        }))

        const emailsResults = await Promise.all(docs.map(async (doc) => {
            return await AnnounceMailer.informDisabledAnnounce({
                email: doc?.user?.email,
                announce_title: doc.title,
                announce_link: `${config.frontend}/announces/${doc.slug}`,
                announce_creation_date: moment(doc.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')
            })
        }))
    }
    catch (err) {
        console.log(err)
        throw err
    }}
)
