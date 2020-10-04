import React, { useEffect } from 'react'
import NiceSelect from 'react-select'
import offers from '../../business/offers.json'

const OffersSelect = ({ defaultOffer, setSelectedOffer, setIsSelectedOffer }) => {

    useEffect(() => {
        if (defaultOffer) {
            const offer = offers.find(offer => offer.title === defaultOffer)
            if (offer) {
                setIsSelectedOffer(true)
                setSelectedOffer({
                    value: offer.title,
                    label: `${offer.maxAnnounces} annonces | ${offer.nicePrice}`
                })
            }
        }
    }, [])

    return (
        <div className="offers">
            <div className="subrcribe">
                <NiceSelect
                    placeholder="Select an offer"
                    options={offers.map(offer => ({
                        value: offer.title,
                        label: `${offer.maxAnnounces} announces | ${offer.nicePrice}`
                    }))}
                    onChange={({ value }) => {
                        setSelectedOffer(offers.find(offer => offer.title === value))
                        setIsSelectedOffer(true)
                    }}
                />
            </div>
        </div>
    )
}

export default OffersSelect
