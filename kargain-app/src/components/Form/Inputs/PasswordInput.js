import React, { memo, useState } from 'react';
import ValidationError from '../Validations/ValidationError';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const PasswordInput = memo(({ name, control, rules, errors, ...props }) => {
    const [hidden, setHidden] = useState(true);

    if (!control) return null;

    return (
        <>
            <div className={clsx('input-field', props.fullwidth && 'w-100')}>
                <input
                    name={name}
                    ref={control.register(rules)}
                    type={hidden ? 'password' : 'text'}
                    placeholder={props.placeholder}
                    required={props.required}
                    disabled={props.disabled}
                />
                <span className="password__show" onClick={() => setHidden(!hidden)}>
                    {hidden ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </span>
            </div>
            {errors && <ValidationError errors={errors} name={name}/>}
        </>
    );
});

PasswordInput.propTypes = {
    control: PropTypes.any.isRequired,
};

PasswordInput.defaultProps = {
    required: false,
    disabled: false,
    hidden: true,
    display: 'col',
};

export default PasswordInput;
