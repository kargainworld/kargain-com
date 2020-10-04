import React from 'react';
import Link from 'next-translate/Link';

const ConfirmAccountError = (props) => {
    const { action } = props.query;
    switch (action) {
    case 'activation-invalid':
        return (
            <div className="text-center mb-5">
                <h1 className="display-4 mt-5 mb-2">Activation Error</h1>
                <p className="lead">Activation token expired or invalid</p>
                <p className="lead">
                    <Link href="/auth/login"><a>Get a new sign in link</a></Link>
                </p>
            </div>
        );
    case 'already-activated':
        return (
            <div className="text-center mb-5">
                <h1 className="display-4 mt-5 mb-2">Activation Error</h1>
                <p className="lead">User already activated.</p>
                <p className="lead">
                    <Link href="/auth/login"><a>Get a new sign in link</a></Link>
                </p>
            </div>
        );
    default:
        return (
            <div className="text-center mb-5">
                <h1 className="display-4 mt-5 mb-2">Error</h1>
                <p className="lead">
                    <Link href="/auth/login"><a>Get a new sign in link</a></Link>
                </p>
            </div>
        );
    }
};

ConfirmAccountError.getInitialProps = async ({ query }) => {
    return { query };
};

export default ConfirmAccountError;
