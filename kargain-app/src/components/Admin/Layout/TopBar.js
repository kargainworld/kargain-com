import React from "react"
import Link from 'next/link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import useTranslation from 'next-translate/useTranslation'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { fade, makeStyles } from '@material-ui/core/styles'
import {AppBar,  MenuItem, Menu, IconButton, Toolbar} from "@material-ui/core"
import Typography from '@material-ui/core/Typography'
import theme from '../../../theme'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useAuth } from '../../../context/AuthProvider'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    grow: {
        flexGrow: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch'
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}))

const TopBar = ({handleDrawerToggle, open, ...props}) => {
    const classes = useStyles()
    const { t } = useTranslation()
    const {className, onClickTogglerNav, ...rest} = props
    const { logout } = useAuth()
    const menuId = 'primary-search-account-menu'
    const mobileMenuId = 'primary-search-account-menu-mobile'
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>

            <MenuItem>
                <Link href="" prefetch={false}>
                    <a className="nav-link text-left" onClick={() => logout()}>
                        <ExitToAppIcon/>
                        <span className="m-1">
                            Déconnexion
                        </span>
                    </a>
                </Link>
            </MenuItem>
        </Menu>
    )

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/*<MenuItem>*/}
            {/*    <IconButton aria-label="show 4 new mails" color="inherit">*/}
            {/*        <Badge badgeContent={4} color="secondary">*/}
            {/*            <EmailIcon />*/}
            {/*        </Badge>*/}
            {/*    </IconButton>*/}
            {/*    <p>Messages</p>*/}
            {/*</MenuItem>*/}
            {/*<MenuItem>*/}
            {/*    <IconButton aria-label="show 11 new notifications" color="inherit">*/}
            {/*        <Badge badgeContent={11} color="secondary">*/}
            {/*            <NotificationsIcon />*/}
            {/*        </Badge>*/}
            {/*    </IconButton>*/}
            {/*    <p>Notifications</p>*/}
            {/*</MenuItem>*/}
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>

            <MenuItem>
                <Link href="/auth/logout" prefetch={false}>
                    <a className="nav-link text-left"><ExitToAppIcon/><span className="m-1">Déconnection</span></a>
                </Link>
            </MenuItem>
        </Menu>
    )

    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
                })}
                {...rest}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        className={clsx(
                            classes.menuButton, {
                                [classes.hide]: open
                            })}>
                        <MenuIcon/>
                    </IconButton>
                    <Link href="/admin" passHref>
                        <Typography
                            component="a"
                            className="decoration-none"
                            variant="h3"
                            noWrap
                            style={{color : theme.palette.white}}>
                            Kargain Admin
                        </Typography>
                    </Link>
                    <div style={{flexGrow: 1}}/>
                    <div className={classes.sectionDesktop}>
                        {/*<IconButton aria-label="show 4 new mails" color="inherit">*/}
                        {/*    <Badge badgeContent={4} color="secondary">*/}
                        {/*        <EmailIcon/>*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                        {/*<IconButton aria-label="show notifications" color="inherit">*/}
                        {/*    <Badge badgeContent={notifications.length} color="secondary">*/}
                        {/*        <NotificationsIcon/>*/}
                        {/*    </Badge>*/}
                        {/*</IconButton>*/}
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircleIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </>
    )
}

TopBar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func
}

export default TopBar
