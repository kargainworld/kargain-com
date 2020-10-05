import React from 'react'
import clsx from 'clsx'
import Link from 'next-translate/Link'
import { Nav, Navbar } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'
import DropdownSwitchLangFlags from './Locales/DropdownSwitchLang'

const useStyles = makeStyles((theme) => ({
    footerLinks: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row!important',

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column!important'
        }
    },

    link: {
        borderRight: '1px solid gainsboro',
        color: '#343333',
        fontWeight: 700,
        paddingRight : '10px'
    }
}))

const FooterLight = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const links = [
        {
            label: t('layout:about-us'),
            link: '/static/about'
        },
        {
            label: t('layout:confidentiality'),
            link: '/static/confidentiality'
        },
        {
            label: t('layout:terms'),
            link: '/static/conditions'
        }
    ]

    return (
        <footer>
            <div className="container">
                <Navbar>
                    <Nav navbar className={clsx(classes.footerLinks, 'my-2', 'py-2', 'mx-auto')}>
                        {links && links.map((link, index) => {
                            return (
                                <li key={index} className="mx-2">
                                    <Link href={link.link}>
                                        <a className={classes.link}>{link.label}</a>
                                    </Link>
                                </li>
                            )
                        })}

                        <DropdownSwitchLangFlags dropdownStyle={{top : 'unset', bottom : '-40px'}}/>
                    </Nav>
                </Navbar>
            </div>
        </footer>
    )
}

export default FooterLight
