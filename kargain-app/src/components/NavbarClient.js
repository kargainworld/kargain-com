import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import { Collapse, Container,  Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ChatIcon from '@material-ui/icons/Chat'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import CloseIcon from '@material-ui/icons/Close'
import SettingsIcon from '@material-ui/icons/Settings'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import FaceIcon from '@material-ui/icons/Face'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'
import { getLogo } from '../libs/utils'
import { useAuth } from '../context/AuthProvider'
import NotificationsNav from '../components/Notifications/NotificationsNav'
import CTALink from './CTALink'

import { SearchContext } from '../context/SearchContext'

const useStyles = makeStyles(theme => ({
    navBarClient: {
        display: 'flex',
        flex: 1,
        width: 'min-content'
    },

    inputSearch: {
        maxWidth: '300px',

        [theme.breakpoints.down('md')]: {
            width: '200px'
        }
    }
}))

const NavbarClient = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleNavbar = () => setIsOpen(!isOpen)
    const { isAuthenticated } = useAuth()
    const isMobile = useMediaQuery('(max-width:768px)')

    return (
        <>
            <header className="header">
                <Container>
                    <Navbar light expand="md" className="navbar position-relative">
                        <NavbarBrand href="/">
                            <img src={getLogo()} width="150" alt="logo"/>
                        </NavbarBrand>
                        <NavbarToggler
                            className="m-2"
                            onClick={toggleNavbar}
                        />
                        <Collapse isOpen={isOpen} navbar>
                            {(!isMobile || isOpen) && (
                                <>
                                    {isMobile ? (
                                        <div className={clsx("sidebar", isOpen && 'open')}>
                                            <div className="sidebar_controls">
                                                <Button
                                                    startIcon={<CloseIcon/>}
                                                    onClick={toggleNavbar}
                                                />
                                            </div>
                                            <NavbarAction vertical={true}/>
                                            {isAuthenticated ? <LoggedInUserNav/> : <VisitorNav/>}
                                        </div>
                                    ) : (
                                        <div className={clsx("d-flex", "navbar-menu")}>
                                            <NavbarAction/>
                                            {isAuthenticated ? <LoggedInUserNav/> : <VisitorNav/>}
                                        </div>
                                    )}
                                </>
                            )}
                        </Collapse>
                    </Navbar>
                </Container>
            </header>
        </>
    )
}

const NewAdButtonCTA = ({isDesktop}) => {
    const { t } = useTranslation()

    return (
        <CTALink
            title={isDesktop && t('layout:create-announce')}
            icon={!isDesktop && AddIcon}
            href="/deposer-une-annonce"
            className="cta_nav_link"
        />
    )
}

const NavbarAction = ({ vertical }) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const {register, handleSubmit } = useForm()
    const { dispatchSearchQuery } = useContext(SearchContext)
    
    const onSubmitSearch = (form) => {
        if (form.query) {
            dispatchSearchQuery(form.query)
        }
    }
    
    return (
        <Nav navbar className={clsx("my-2", vertical ? "flex-column" : "flex-row-nav")}>
            <NavItem className="p-2">
                <NewAdButtonCTA isDesktop={true}/>
            </NavItem>

            <NavItem className="p-2">
                <form className="search-form" onSubmit={handleSubmit(onSubmitSearch)}>
                    <input
                        ref={register}
                        name="query"
                        type="search"
                        placeholder={t('layout:search')}
                        className={clsx('form-control', classes.inputSearch, "search-input")}
                    />

                    <button
                        type="submit"
                        className="search-button">
                        <SearchIcon/>
                    </button>
                </form>
            </NavItem>
        </Nav>
    )
}

const DropdownUser = ({ isOpen, keyName, toggle }) => {
    const { authenticatedUser, logout } = useAuth()
    const { t } = useTranslation()

    return (
        <li className="nav-item navbar-dropdown">
            <IconButton color="inherit"
                data-toggle="dropdownUser"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => toggle(keyName)}>
                <PermIdentityIcon/>
            </IconButton>

            <ul className={clsx('dropdown', isOpen && 'show')} id="dropdownUser">
                {authenticatedUser.getIsAdmin && (
                    <li className="px-0 dropdown-item">
                        <Link href={`/admin/ads`} prefetch={false}>
                            <a className="nav-link text-left"><DashboardIcon/><span className="m-1">Admin</span></a>
                        </Link>
                    </li>
                )}
                <li className="px-0 dropdown-item">
                    <Link href={authenticatedUser.getProfileLink} prefetch={false}>
                        <a className="nav-link text-left"><FaceIcon/>
                            <span className="m-1">
                                {t('layout:my-profile')}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href="/profile/messages" prefetch={false}>
                        <a className="nav-link text-left"><ChatIcon/>
                            <span className="m-1">
                                {t('layout:messaging')}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href={authenticatedUser.getProfileEditLink} prefetch={false}>
                        <a className="nav-link text-left"><SettingsIcon/>
                            <span className="m-1">
                                {t('layout:settings')}
                            </span>
                        </a>
                    </Link>
                </li>
                <li className="px-0 dropdown-item">
                    <Link href="" prefetch={false}>
                        <a className="nav-link text-left" onClick={() => logout()}>
                            <ExitToAppIcon/>
                            <span className="m-1">
                                {t('layout:logout')}
                            </span>
                        </a>
                    </Link>
                </li>
            </ul>
        </li>
    )
}

const LoggedInUserNav = ({vertical}) => {
    const [state, setState] = useState({
        isOpen1: false,
        isOpen2: false
    })

    const toggle = (toggled) => {
        setState(state => ({
            ...Object.keys(state)
                .filter(key => key !== toggled)
                .reduce((carry, key) => ({
                    ...carry,
                    [key]: false
                }), state),
            [toggled]: !state[toggled]
        }))
    }

    return (
        <Nav navbar className={clsx("my-2", "justify-content-center", vertical ? "flex-column" : "flex-row-nav")}>
            <NavItem>
                <Link href="/feed" prefetch={false}>
                    <a>
                        <IconButton color="inherit">
                            <HomeIcon/>
                        </IconButton>
                    </a>
                </Link>
            </NavItem>
            <NotificationsNav isOpen={state.isOpen1} keyName="isOpen1" toggle={toggle}/>
            <DropdownUser isOpen={state.isOpen2} keyName="isOpen2" toggle={toggle}/>
        </Nav>
    )
}

const VisitorNav = ({vertical}) => {
    const { t } = useTranslation()

    return (
        <Nav navbar className={clsx("my-2", vertical ? "flex-column" : "flex-row-nav")}>
            <NavItem className="p-2">
                <Link href="/auth/login" prefetch={false}>
                    <a className="nav-link">
                        {t('layout:login')}
                    </a>
                </Link>
            </NavItem>
            <NavItem className="p-2">
                <Link href="/auth/register" prefetch={false}>
                    <a className="nav-link">
                        {t('layout:register')}
                    </a>
                </Link>
            </NavItem>
        </Nav>
    )
}

export default NavbarClient
