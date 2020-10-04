import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next-translate/Link';
import { makeStyles } from '@material-ui/styles';
import { colors, List, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

const useStyles = makeStyles(theme => ({
    root: {},
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
        color: theme.palette.icon,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1)
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        '& $icon': {
            color: theme.palette.primary.main
        }
    }
}));

const SidebarNav = props => {
    const { pages, className, ...rest } = props;
    const classes = useStyles();

    return (
        <List{...rest} className={clsx(classes.root, className)}>
            {pages.map(page => (
                <ListItem button key={page.title}>
                    <Link href={page.href}>
                        <a className="d-flex" title={page.title}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText>
                                <strong>{page.title}</strong>
                            </ListItemText>
                        </a>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
};

SidebarNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired
};

export default SidebarNav;
