import React, { memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import ValidationError from '../Validations/ValidationError'

const CheckBoxInput = ({ name, rules, control, errors, ...props }) => {
    
    return (
        <>
            <div className={clsx('input', 'input-field', props.fullwidth && 'w-100', props.className)}>
                <label className="pl-1" htmlFor={name}>
                    <input
                        id={name}
                        name={name}
                        ref={control.register(rules)}
                        className="radio_field"
                        type="checkbox"
                    />

                    {props.label}
                    {props.required && <span className="required_label">*</span>}
                </label>
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

CheckBoxInput.propTypes = {
    name: PropTypes.string.isRequired,
    control : PropTypes.any.isRequired
}

export default memo(CheckBoxInput)
