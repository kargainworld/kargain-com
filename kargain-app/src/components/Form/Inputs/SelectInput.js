import  React, { memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Controller } from 'react-hook-form';
import NiceSelect from 'react-select'
import ValidationError from '../Validations/ValidationError'

const CustomClearText = () => 'clear all'

const ClearIndicator = props => {
    const {
        children = <CustomClearText/>,
        getStyles,
        innerProps: { ref, ...restInnerProps }
    } = props

    return (
        <div ref={ref} style={getStyles('clearIndicator', props)} {...restInnerProps}>
            <div style={{ padding: '0 5px' }}>{children}</div>
        </div>
    )
}

const customStyles = {
    control: (_, { selectProps: { width } }) => ({
        width: width,
        flex: 1
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20
    })
}

const SelectInput = ({ name, control, rules, errors, ...props }) => {
    const { options, selected } = props
    let defaultValues = null
    let selectedOptions = selected;
    if (selectedOptions) {
        if (!Array.isArray(selectedOptions)) selectedOptions = [selectedOptions]
        defaultValues = selectedOptions.reduce((carry, selected) =>
            ([...carry, options.find(option => {
                if (typeof selected === "object") return option?.value?.toLowerCase() === selected?.value?.toString()?.toLowerCase()
                return option?.value?.toLowerCase() === selected?.toString()?.toLowerCase()
            })]), [])
    }

    return (
        <>
            <div className={clsx('select-field', 'my-1', props.className)}>
                <Controller
                    instanceId={name}
                    name={name}
                    control={control}
                    rules={rules}
                    onChange={([selected])=>{
                        if(props.onChange) return props.onChange(selected, name)
                        return selected
                    }}
                    as={
                        <NiceSelect
                            options={options}
                            width={props.width}
                            isClearable={props.isClearable}
                            isMulti={props.isMulti}
                            isDisabled={props.disabled}
                            styles={{ customStyles }}
                            defaultValue={defaultValues}
                            placeholder={props.placeholder}
                            components={{ clearValue: ClearIndicator }}
                            forwardProps={{ featured: props.featured }}
                        />}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name} />}
        </>
    )
}

export default memo(SelectInput)

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    isClearable: PropTypes.bool
}

SelectInput.defaultProps = {
    rules: {},
    isMulti: false,
    isClearable: true,
    disabled: false,
    width: '200px'
}
