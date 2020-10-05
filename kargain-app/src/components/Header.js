import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const Header = ({ as, text, className, children, ...props }) => {
    const classnames = clsx(className, props.center && 'text-center')
    const styles = {}
    let el = as
    if (props.p) el = 'p'
    if (props.white) styles.color = 'white'
    if (props.strong) styles.fontWeight = 'bold'

    return React.createElement(el, {
        className: classnames,
        style: styles
    }, [text, children])
}

Header.propTypes = {
    as: PropTypes.string.isRequired,
    className: PropTypes.string,
    text: PropTypes.string,
    center: PropTypes.bool
}

Header.defaultProps = {
    as: 'h3',
    center: true
}

export default Header
