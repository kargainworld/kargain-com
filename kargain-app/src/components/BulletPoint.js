import React from 'react'
import PropTypes from 'prop-types'
import { themeColors } from '../theme/palette'
const { black, white, grey, green, blue, yellow, orange, red } = themeColors

const switchColor = color => {
    switch (color) {
    case 'white' :
        return white
    case 'grey':
        return grey
    case 'black':
        return black
    case 'green':
        return green
    case 'blue':
        return blue
    case 'yellow':
        return yellow
    case 'orange':
        return orange
    case 'red':
        return red
    default:
        return color
    }
}

const BulletPoint = ({width, bordered, color, tooltipHelper, onClick}) => {
    const Color = switchColor(color)

    return (
        <div title={tooltipHelper} onClick={onClick}>
            <svg height={width} width={width}>
                <circle cx={Math.round(width/2)} cy={Math.round(width/2)} r={Math.round(width/4)} stroke={bordered ? 'black' : ''} strokeWidth="1" fill={Color} />
            </svg>
        </div>
    )
}

BulletPoint.propTypes = {
    width : PropTypes.number,
    color: PropTypes.string,
    tooltipHelper : PropTypes.string
}

BulletPoint.defaultProps = {
    width : 30,
    color : 'green'
}

export default BulletPoint
