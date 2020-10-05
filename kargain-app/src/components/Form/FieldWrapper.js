import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
    label: {
        width : '100%',
        padding : '.5rem 0',
        marginBottom : '.5rem',
        borderBottom : '1px solid gainsboro'
    }
}))

const FieldWrapper = ({ isRow, children, ...props }) => {
    const { tooltip, label } = props
    const { name, rules } = children.props
    const { required } = rules || {}
    const classes = useStyles()

    if(!children) return null

    return (
        <div className={clsx(isRow && 'row align-items-center', 'FieldWrapper m-2')}>
            {label && (
                <label className={classes.label} htmlFor={name}>
                    <span>
                        {label} :
                        {required && <span className="required_label"> *</span>}
                    </span>
                </label>
            )}
            {tooltip}
            {children}
        </div>
    )
}

FieldWrapper.propTypes = {
    labelTop: PropTypes.bool,
    as: PropTypes.string
}

FieldWrapper.defaultProps = {
    labelTop: false,
    as: 'label'
}

export default FieldWrapper
