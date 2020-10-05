import React from 'react'
import PropTypes from 'prop-types'
import { Marker, Path, StaticGoogleMap } from 'react-static-google-map'
import { makeStyles } from '@material-ui/styles'
import config from '../config/config'

const useStyles = makeStyles(theme => ({
    test: {
        border: '1px solid',
        borderColor: theme.palette.grey
    },
    root: props => ({
        border: '1px solid',
        textAlign: 'center',
        margin: '0 auto',
        borderColor: theme.palette.grey,
        height: props.height,
        width: props.width,
        overflow: 'hidden',

        '& img': {
            transition: 'all .3s',

            '&:hover': {
                transform: 'scale(1.1)'
            }
        }
    }
    )
}))

const GoogleMapStatic = ({ zoom, width, height, markers, drawPath }) => {
    const classes = useStyles({
        width,
        height
    })

    return (
        <div className={classes.root}>
            <StaticGoogleMap apiKey={config.google.static.STATIC_API_KEY}
                zoom={zoom}
                size={`${width}x${height}`}>
                <Marker.Group label="T" color="blue">
                    {markers && markers.map((marker, index) => <Marker key={index} location={marker}/>)}
                </Marker.Group>
                {drawPath && <Path points={markers}/>}
            </StaticGoogleMap>
        </div>
    )
}

GoogleMapStatic.propTypes = {
    markers: PropTypes.arrayOf(PropTypes.string),
    drawPath: PropTypes.bool,
    zoom: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
}

GoogleMapStatic.defaultProps = {
    markers: [],
    width: 600,
    height: 600,
    zoom: 9
}
export default GoogleMapStatic
