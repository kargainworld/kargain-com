import React, { memo } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import ValidationError from '../Validations/ValidationError'

const NumberInput = ({ name, rules, control, errors, ...props }) => {
    const numericRegex = /[0-9]|\./

    const onValidate = e => {
        const event = e
        let key = null

        if (event.type === 'paste') {
            key = event.clipboardData.getData('text/plain')
        } else {
            key = event.keyCode || event.which
            key = String.fromCharCode(key)
        }

        if (!numericRegex.test(key)) {
            event.returnValue = false
            if (event.preventDefault) event.preventDefault()
        } else {
            if (rules.positive) e.target.value = Math.abs(Number(e.target.value))
            if (rules.integer) e.target.value = Math.round(Number(e.target.value))
        }
    }

    return (
        <>
            <div className={clsx('input', 'input-field', props.fullwidth && 'w-100', props.className)}>
                <input
                    type="text"
                    name={name}
                    ref={control.register(rules)}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    onKeyPress={onValidate}
                    onChange={onValidate}
                    onPaste={onValidate}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    control : PropTypes.any.isRequired
}

NumberInput.defaultProps = {
    integer: true,
    positive: false,
    rules: {}
}

export default memo(NumberInput)
