import React, { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import offers from '../../business/offers.json'
import CTALink from '../CTALink'
import { useAuth } from '../../context/AuthProvider'

const useStyles = makeStyles(() => ({
    subscribeWrapper: {
        width: '500px',
        height: '400px',
        position: 'relative',
        margin: '2rem auto'
    },

    formWrapper: {
        margin: '2rem auto'
    },

    pricingBlock: {
        position: 'relative',
        padding: '4rem 3.75rem 5.94rem',
        backgroundColor: '#fff',
        border: '1px solid #eaeaea',
        borderRadius: '2px',
        margin: '0 -2.8rem',
        marginBottom: '3rem'
    },

    pricingInfo: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '50%',
        padding: '0 2.8rem'
    },

    pricingPrice: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '50%',
        padding: '0 2.8rem',
        textAlign: 'center'
    },

    priceAmount: {
        fontSize: '3.75rem',
        color: '#424b54',
        fontWeight: '400',
        lineHeight: '4.38rem',
        marginBottom: '1rem',
        textAlign: 'center'
    },

    infoText: {
        color: '#777d81',
        fontWeight: '500',
        lineHeight: '1.69rem'
    }
}))

const Offers = () => {
    const classes = useStyles()
    const { t } = useTranslation()
    const [purchaseLink, setPurchaseLink] = useState('/auth/register')
    const { isAuthenticated, authenticatedUser } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            setPurchaseLink(authenticatedUser.getProfileEditLink)
        }
    }, [isAuthenticated])

    return (
        <div className="offers">
            {offers && offers.map((offer, index) => (
                <div key={index} className={classes.pricingBlock}>
                    <div className={classes.pricingInfo}>
                        <p className={classes.infoText}>
                            {t('pricing:info-pub-{count}-text', { count: offer.maxAnnounces })}
                        </p>
                        <p className={classes.infoText}>
                            {t('pricing:info-pro-{count}-text', { count: offer.maxAnnounces })}
                        </p>
                    </div>
                    <div className={classes.pricingPrice}>
                        <h3 className={classes.priceAmount}>
                            {offer.nicePrice}
                        </h3>

                        <CTALink
                            icon={ShoppingCartIcon}
                            title="Buy"
                            href={`${purchaseLink}?offer=${offer.title}`}
                        />
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Offers
