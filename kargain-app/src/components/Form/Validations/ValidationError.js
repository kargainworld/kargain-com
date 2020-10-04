import React from 'react'
import { ErrorMessage } from 'react-hook-form'

const ValidationError = ({ errors, name }) => {
    return (
        <ErrorMessage errors={errors} name={name}>
            {(props) => {
                const { messages } = props
                return(
                    messages && Object.entries(messages).map(([type, message]) => (
                        <p className="error" key={type}>{message}</p>
                    ))
                )
            }}
        </ErrorMessage>
    )
}

export default ValidationError
