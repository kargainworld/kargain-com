import React from "react"
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {Avatar, Card, CardContent, Grid, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"

import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        height: 56,
        width: 56,
        backgroundColor: theme.palette.white,
        color: theme.palette.primary.main
    },
    icon: {
        height: 32,
        width: 32
    }
}))

const TotalProfit = props => {

    const {className, ...rest} = props

    const classes = useStyles()

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}>
            <CardContent>
                <Grid
                    container
                    justify="space-between">
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="inherit"
                            gutterBottom
                            variant="body2">
                            TOTAL PROFITS
                        </Typography>
                        <Typography variant="h3" color="inherit">TODO</Typography>
                        {/*<Typography*/}
                        {/*    variant="h3"*/}
                        {/*    color="inherit">*/}
                        {/*    $23,200*/}
                        {/*</Typography>*/}
                    </Grid>
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <AttachMoneyIcon className={classes.icon}/>
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

TotalProfit.propTypes = {
    className: PropTypes.string
}

export default TotalProfit
