import React from "react"
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {makeStyles} from "@material-ui/styles"
import { Drawer} from "@material-ui/core"
import BarChartIcon from '@material-ui/icons/BarChart'
import HomeIcon from '@material-ui/icons/Home'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import CommuteIcon from '@material-ui/icons/Commute'

import SidebarNav from "./SidebarNav"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    drawer: {
        position : 'relative',
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1
        }
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(2),
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.white
    },
    nav: {
        marginBottom: theme.spacing(2)
    }
}))

const Sidebar = props => {
    const {open, variant, onClose, className} = props
    const classes = useStyles()
    const pages = [
        {
            title: 'Retour Kargain',
            href: '/',
            icon : <HomeIcon/>
        },
        {
            title: 'Dashboard',
            href: '/admin',
            icon : <BarChartIcon/>
        },
        {
            title: 'Annonces',
            href: '/admin/ads',
            icon : <CommuteIcon/>
        },
        {
            title: 'Utilisateurs',
            href: '/admin/users',
            icon : <PeopleAltIcon/>
        }
    ]

    return (
        <Drawer
            id="drawerID"
            anchor="left"
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })
            }}
            open={open}
            onClose={onClose}>
            <SidebarNav
                className={classes.nav}
                pages={pages}
            />
        </Drawer>
    )
}

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
}

export default Sidebar
