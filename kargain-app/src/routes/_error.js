import React from 'react'
import { Container } from 'reactstrap'
import page404 from './404'

const Error = ({ statusCode }) => {
    let response

    switch (statusCode) {
    case 200:
    case 404:
        response = <page404/>
        break
    case 500:
        response = (
            <Container className="text-center">
                <h1 className="display-4">Internal Server Error</h1>
            </Container>
        )
        break
    default:
        response = (
            <Container className="text-center">
                <h1 className="display-4">An {statusCode} Error occurred</h1>
            </Container>
        )
        
        return response
    }

    return response
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
}

export default Error
