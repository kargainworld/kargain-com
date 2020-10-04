import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const useStyles = makeStyles(() => ({
    root: {
        height: '100%'
    },
    shiftContent: {
        // paddingLeft: 240
    },
    content: {
        width: '95%',
        height: '100%'
    }
}))

const AdminLayout = ({ children }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <TopBar handleDrawerToggle={handleDrawerToggle}/>
            <main className="d-flex">
                <Sidebar
                    onClose={handleDrawerClose}
                    open={open}
                    variant={'temporary'}
                    // variant={'isDesktop ? 'persistent' : 'temporary''}
                />
                <section className={classes.content}>
                    {children}
                </section>
            </main>
        </div>
    )
}

export default AdminLayout
