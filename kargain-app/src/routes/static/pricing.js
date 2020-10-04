import React, { useEffect } from 'react'
import { Container } from 'reactstrap'
import { useAuth } from '../../context/AuthProvider'
import Offers from '../../components/Stripe/Offers'
import useIsMounted from '../../hooks/useIsMounted'


const Index = () => {
    const { isAuthenticated, setForceLoginModal } = useAuth()
    const isMounted = useIsMounted()

    useEffect(()=> {
        if(isMounted){
            if (!isAuthenticated) return setForceLoginModal(true)
            setForceLoginModal(false)
        }
    },[isMounted, isAuthenticated])

    return (
        <Container>
            <div className="c-page-section-pricing__inner">
                <h2>Pricing</h2>
                <Offers/>
            </div>
        </Container>
    )
}

export default Index
