import React from 'react'
import PropTypes from 'prop-types'

const AnnounceResume = ({ announce }) => {
    const exclude = ['_id', 'id', '__v']
    return (
        <table>
            <tbody>
                {Object.keys(announce).filter(key => !exclude.includes(key)).map((key, index) => (
                    <tr key={index}>
                        <td>{key}</td>
                        <td>{displayEl(announce[key])}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const displayEl = (value) => {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return (
                <ul>
                    {value.map((sub, index) => {
                        return (
                            <li key={index}>
                                <p>{sub}</p>
                            </li>
                        )
                    }
                    )}
                </ul>
            )
        } else {
            return (
                <ul>
                    {Object.entries(value).map(([key, val], index) => {
                        return (
                            <li key={index}>
                                <p>{key} : {val}</p>
                            </li>
                        )
                    }
                    )}
                </ul>
            )
        }
    } else {
        return <p> {value} </p>
    }
}

AnnounceResume.propTypes = {
    announce: PropTypes.object.isRequired
}

export default AnnounceResume
