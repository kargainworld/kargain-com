import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import NiceSelect, { components } from 'react-select'
import countries from '../../../libs/countries'
import ValidationError from '../Validations/ValidationError'

const SelectCountryFlags = ({ name, rules, control, errors, ...props }) => {
    const options = Object.keys(countries).map(key => {
        return {
            value: key,
            label: countries[key],
            icon: <img src={`/images/flags/${key.toLowerCase()}.svg`} width="20" height="20" alt=""/>
        }
    })

    const defaultValue = props.defaultValue && options.find(option => option.value === props.defaultValue)

    useEffect(() => {
        control.register(name, rules)
        control.setValue(name, {
            label: defaultValue?.label,
            value: defaultValue.value
        })
    }, [])

    const SingleValue = (props) => (
        <components.SingleValue {...props}>
            <p className="d-flex m-0">
                {props.data.icon}
                <span className="mx-2"> {props.data.label} </span>
            </p>
        </components.SingleValue>
    )

    const Option = (props) => {
        return (
            <components.Option {...props}>
                <p className="d-flex m-0">
                    {props.data.icon}
                    <span className="mx-2"> {props.data.label} </span>
                </p>
            </components.Option>
        )
    }

    return (
        <>
            <div className="select-field my-2">
                <NiceSelect
                    options={options}
                    isClearable={props.isClearable}
                    placeholder={props.placeholder}
                    defaultValue={defaultValue}
                    onChange={({ value, label }) => {
                        control.setValue(name, {
                            value,
                            label
                        })
                    }}
                    components={{
                        SingleValue,
                        Option
                    }}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    )
}

SelectCountryFlags.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isClearable: PropTypes.bool
}

SelectCountryFlags.defaultProps = {
    rules: {},
    defaultValue: 'FR',
    isClearable: true
}

export default SelectCountryFlags
