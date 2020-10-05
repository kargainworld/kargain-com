import React, { memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const Divider = ({ text, vertical, className }) => {
    return (
        <div className={clsx("divider_stick", className, vertical && 'vertical')}>
            { text ? (
                <>
                    <hr style={{ position: 'absolute',  top: '50%' }}/>
                    <span><strong>{text}</strong></span>
                </>
            ) : (
                <hr/>
            )}
        </div>
    )
}

Divider.propTypes = {
    text: PropTypes.string
}

export default memo(Divider)
