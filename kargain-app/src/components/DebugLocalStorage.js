import React from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'

const DebugLocalStorage = ({ value }) => {
    const [getFormData] = useLocalStorage(value, {}, true)

    return (
        <div>
            <h2> localStorage </h2>
            <pre>{JSON.stringify(getFormData, null, 2)}</pre>
        </div>
    )
}

DebugLocalStorage.propTypes = {
    value: PropTypes.string.isRequired
}

export default DebugLocalStorage
