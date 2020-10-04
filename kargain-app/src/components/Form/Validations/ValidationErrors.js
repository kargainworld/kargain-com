import React from 'react';
import { ErrorMessage } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';

const ValidationErrors = ({ errors }) => {
    return Object.keys(errors).map((name, index) => {
        return (
            <ErrorMessage key={index} errors={errors} name={name}>
                {({ messages }) => {
                    return (
                        <div className="m-2">
                            {messages && Object.entries(messages).map(([type, message]) => (
                                <Alert key={type} severity="warning" className="mb-2">
                                    {name} : {message}
                                </Alert>
                            ))}
                        </div>
                    );
                }}
            </ErrorMessage>
        );
    });
};

export default ValidationErrors;
