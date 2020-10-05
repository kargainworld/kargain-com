import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles({
    root: {
        maxWidth: 345
    },
    media: {
        height: 140
    }
})

const CardMediaMUI = ({src, title}) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    className={classes.media}
                    src={src}
                    title={title}
                />
            </CardActionArea>
        </Card>
    )
}

export default CardMediaMUI
