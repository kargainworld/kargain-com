import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Row } from 'reactstrap';
import ValidationError from '../Validations/ValidationError';

const RadioGroupInput = ({ name, rules, control, errors, ...props }) => {
    const FieldRow = clsx('d-flex', props.center && 'justify-content-center', props.vertical && 'flex-column');
    const InputClasses = clsx(props.noInputClass ? 'no-input' : 'form-check', 'mx-2', 'my-1');

    return (
        <>
            <Row className={FieldRow}>
                {options && options.map((option, index) => {
                    const labelProps = { children: option.label ? option.label : null };
                    return (
                        <div key={index} className={InputClasses}>
                            <input
                                id={`${name}_${index}`}
                                type="radio"
                                ref={control.register(rules)}
                                name={name}
                                value={option.value}
                                disabled={option.disabled}
                                className="mx-1"
                            />
                            <label htmlFor={`${name}_${index}`} className="form-check-label" {...labelProps} />
                        </div>
                    );
                })}
            </Row>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

RadioGroupInput.propTypes = {
    name: PropTypes.string.isRequired,
    center: PropTypes.bool
};

RadioGroupInput.defaultProps = {
    center: true,
    rules: {}
};

export default memo(RadioGroupInput);
