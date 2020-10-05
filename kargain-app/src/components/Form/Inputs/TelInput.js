import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import ReactPhoneInput from 'react-phone-input-2'

import ValidationError from '../Validations/ValidationError'

function TelInput ({ name, rules, control, errors, innerProps, ...props }) {
    const classnames = clsx('input-field', props.fullwidth && 'w-100')
    const [phone, setPhone] = useState('')

    const handleOnChange = ([value]) => {
        setPhone(value)
        return value
    }

    return (
        <>
            <div className={classnames}>
                <Controller
                    instanceId={name}
                    name={name}
                    control={control}
                    rules={rules}
                    defaultValue={phone}
                    onChange={handleOnChange}
                    as={<ReactPhoneInput
                        className="input-field"
                        required
                        regions={'europe'}
                        value={phone}
                        country={innerProps.country}
                        placeholder={innerProps.placeholder}
                        {...innerProps}/>
                    }/>
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

TelInput.propTypes = {
    name: PropTypes.string.isRequired
}

TelInput.defaultProps = {
    rules: {},
    country: 'fr',
    placeholder: 'Enter phone number'
}

export default TelInput
