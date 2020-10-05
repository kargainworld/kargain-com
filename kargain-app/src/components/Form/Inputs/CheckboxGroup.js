import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import ValidationError from '../Validations/ValidationError'

const CheckboxGroup = ({ name, control, rules, errors, options, defaultOptions, ...props }) => {
    const [modelOptions, setModelOptions] = useState([])

    useEffect(() => {
        control.register(name, rules)
        const modelOptions = control.getValues(name)
        const defaultMatch = defaultOptions.reduce((carry, val) => {
            const match = options.find(option => option.value.toLowerCase())
            return (match && val.toLowerCase() === match.value.toLowerCase()) ? [...carry, match] : carry
        }, [])
        setModelOptions([
            ...modelOptions,
            ...defaultMatch
        ])
    }, [])

    const toggleCheckedOption = (dataset) => {
        const { label, value } = dataset
        const index = modelOptions.findIndex(option => option.value === value)
        if (index !== -1) {
            setModelOptions(options => options.slice(0, index).concat(options.slice(index + 1, options.length)))
        } else {
            setModelOptions(options => [...options, {
                label,
                value
            }])
        }
        control.setValue(name, modelOptions)
    }

    return (
        <>
            <div className={clsx('row', props.center && 'justify-content-center', props.vertical && 'flex-column')}>
                {options && options.map((option, index) => {
                    const matchModel = modelOptions.find(modelOption => modelOption.value.toLowerCase() === option.value.toLowerCase())
                    const checked = !!matchModel

                    return (
                        <div key={index} className={clsx('form-check', 'm-2')}>
                            <input
                                type="checkbox"
                                id={`${name}_${index}`}
                                checked={checked}
                                value={option.value}
                                data-value={option.value}
                                data-label={option.label}
                                onChange={(e) => toggleCheckedOption(e.target.dataset)}
                            />
                            <label htmlFor={`${name}_${index}`}> {option.label} </label>
                        </div>
                    )
                })}
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

CheckboxGroup.propTypes = {
    defaultChecked: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    center: PropTypes.bool
}

CheckboxGroup.defaultProps = {
    center: true,
    defaultOptions: []
}

export default CheckboxGroup
