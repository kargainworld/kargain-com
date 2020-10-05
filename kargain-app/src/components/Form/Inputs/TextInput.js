import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import ValidationError from '../Validations/ValidationError'

const TextInput = ({ name, rules, control, errors, defaultValue, ...props }) => {

    return (
        <>
            <div className={clsx('input-field', props.fullwidth && 'w-100')}>
                <input
                    type="text"
                    ref={control && control.register(rules)}
                    name={name}
                    defaultValue={defaultValue}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    onBlur={props.onBlur}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

TextInput.propTypes = {
    name: PropTypes.string,
    disabled : PropTypes.bool
}

TextInput.defaultProps = {
    rules: {}
}

export default TextInput
