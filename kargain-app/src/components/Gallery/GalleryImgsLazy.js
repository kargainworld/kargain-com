import React from 'react'
import clsx from 'clsx'
import { Col } from 'reactstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
    gallery: {
        width: '100%',
        height: '600px',
        position: 'relative',
        borderRadius: '5px',
        overflow: 'hidden'
    },

    galleryImg: {
        // height: '100%',
        // width: '100%',
        // position: 'absolute',
    },

    galleryImgSrc: {
        animation: 'fadeIn 1s',
        width: '100%',
        objectFit: 'contain'
    }
}))

const GalleryImgsLazy = ({ images, handleCLickImg }) => {
    const classes = useStyles()
    return (
        <div className="m-2 m-auto p-2">
            <div className="row">
                {images.map((imageModel, index) => {
                    return (
                        <Col key={index} md={4}>
                            <div className="m-2">
                                <div key={index} className={classes.galleryImg}>
                                    <LazyLoadImage
                                        onClick={() => handleCLickImg(index)}
                                        effect="black-and-white"
                                        src={imageModel.getLocation}
                                        alt={imageModel.getTile}
                                        className={clsx('img-hover', classes.galleryImgSrc)}
                                    />
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </div>
        </div>
    )
}

export default GalleryImgsLazy
