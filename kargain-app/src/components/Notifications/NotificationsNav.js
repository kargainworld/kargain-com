import React from 'react'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'

const NotificationsNav = ({ isOpen, keyName, toggle }) => {
    return (
        <li className="nav-item navbar_icon navbar-icon-notifications">
            <div className="dropdown show">
                <IconButton color="inherit"
                    data-toggle="dropdown-notifications"
                    aria-haspopup="true"
                    aria-expanded="true"
                    id="dropdownMenu2"
                    onClick={() => toggle(keyName)}>
                    <Badge badgeContent={1} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <div id="dropdown-notifications"
                    className={clsx('dropdown-menu', isOpen && 'show')}>
                    <div className="notf-wrapper">
                        <div>
                            <div className="text-podpiska">
                                <span>You are welcome on Kargain</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default NotificationsNav
