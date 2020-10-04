import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import ValidationError from '../Validations/ValidationError'
import ValidationsRules from '../Validations/ValidationRules'

const EmailInput = ({ name, rules, control, errors, ...props }) => {
    const classnames = clsx('input-field', props.fullwidth && 'w-100')
    const { validate } = rules

    const validations = {
        validate: {
            isEmail: val => ValidationsRules.checkIsEmail(val) || 'Invalid email',
            ...validate
        }
    }

    return (
        <>
            <div className={classnames}>
                <input
                    type="email"
                    name={name}
                    defaultValue={props.defaultValue}
                    ref={control.register(validations)}
                    placeholder={props.placeholder}
                    required={props.required}
                    disabled={props.disabled}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

EmailInput.propTypes = {
    control : PropTypes.any.isRequired,
    name: PropTypes.string.isRequired
}

EmailInput.defaultProps = {
    rules: {}
}

export default EmailInput
