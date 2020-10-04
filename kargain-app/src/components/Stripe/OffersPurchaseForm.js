import React, { useState } from 'react'
import { Container } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import { useAuth } from '../../context/AuthProvider'
import StripePurchase from './StripePurchase'
import OffersSelect from './OffersSelect'
import CTAButton from '../CTAButton'

const OffersPurchaseForm = ({ offer: defaultOffer }) => {
    const { t } = useTranslation()
    const { authenticatedUser } = useAuth()
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [isSelectedOffer, setIsSelectedOffer] = useState(false)
    const [enableSubscribe, setEnableSubscribe] = useState(true)

    return (
        <Container>
            <div className="row">
                <div className="col-12">
                    {(authenticatedUser.getHasProPlan) && (
                        <div className="my-2">
                            <h3 className="step-title">Ma formule</h3>
                            <div className="my-concept user-content-box col-12 col-md-8">
                                <p className="concept-name">
                                    <strong>{authenticatedUser.getSubscriptionOfferTitle}</strong>
                                </p>
                            </div>

                            <CTAButton
                                title={t('layout:subscribe')}
                                onClick={() => {
                                    setEnableSubscribe(true)
                                }}
                            />

                        </div>
                    )}

                    {enableSubscribe && (
                        <div>
                            <h3 className="step-title">Souscrire à une offre</h3>
                            <p className="concept-name">Vous ne disposez d'aucune offre.</p>
                            <p>Vous n'avez le droit d'avoir que 2 annonces publiées en simultanée.</p>
                            <p>Vous pouvez souscrire à une des offres ci dessous : </p>

                            <OffersSelect {...{
                                defaultOffer,
                                setSelectedOffer,
                                setIsSelectedOffer
                            }} />

                            {isSelectedOffer && (
                                <StripePurchase
                                    disabled={!isSelectedOffer}
                                    offer={selectedOffer}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    )
}

export default OffersPurchaseForm
