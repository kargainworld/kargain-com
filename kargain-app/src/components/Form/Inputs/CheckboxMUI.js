import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ValidationError from '../Validations/ValidationError';

const CheckboxMUI = ({ name, rules, control, errors, ...props }) => {
    return (
        <>
            <div className={clsx('input-field', props.fullwidth && 'w-100')}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    as={<FormControlLabel
                        label={props.label}
                        control={<Checkbox
                            color="primary"
                            value={props.value}
                        />
                        }
                    />}
                />
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
};

CheckboxMUI.propTypes = {
    control: PropTypes.any.isRequired,
};

export default CheckboxMUI;
