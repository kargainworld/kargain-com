import CTALink from '../components/CTALink'
import React from 'react'
import { Container } from 'reactstrap'

export default function Custom404() {
    return(
        <Container className="text-center">
            <h2 className="display-5">Page Not Found</h2>
            <CTALink
                title="Retour kargain"
                href="/"
            />
            <div className="imgContainer mt-1">
                <img src="/images/404_template1.jpg" alt="404" height={350}/>
            </div>
        </Container>
    )
}
