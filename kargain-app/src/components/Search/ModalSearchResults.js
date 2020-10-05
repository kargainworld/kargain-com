import React, {useContext} from 'react'
import Link from 'next/link'
import { Col } from 'reactstrap'
import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Loading from '../../components/Loading'
import UserModel from '../../models/user.model'
import { SearchContext } from '../../context/SearchContext'
import AnnounceCardLight from '../AnnounceCardLight'

const useStyles = makeStyles((theme) => ({

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },

    wrapperLeft : {
        height : '100%',
        borderRight : '1px solid gainsboro'
    },

    popupContent: {
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        height: '90vh',
        margin: 'auto',
        zIndex: 5,

        [theme.breakpoints.up('sm')]: {
            width: '90vh',
            maxWidth : '1500px',
            flexShrink: 0
        }
    },

    list: {
        listStyleType: 'none',
        height: '500px',
        width: '300px',
        overflowX: 'hidden',
        overflowY: 'scroll'
    },

    listRows : {
        padding : '1rem',
        overflowY : 'auto',
        height : '95%'
    },

    pointerClose: {
        display: 'flex',
        cursor: 'pointer'
    }
}))

const ModalSearchResults = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const { searchStateContext, closeSearchModal } = useContext(SearchContext)
    const { openModalSearch, loading, results } = searchStateContext

    return (
        <Modal className={classes.modal}
            open={openModalSearch}
            onClose={closeSearchModal}>
            <Fade in={openModalSearch}>
                <div className={classes.paper}>
                    <div className={classes.popupContent}>
                        <Col sm={12} md={5}>
                            <div className={classes.wrapperLeft}>
                                {loading && <Loading/>}
                                <Typography variant="h3">
                                    {t('layout:members')} ({results?.users?.length})
                                </Typography>
                                <div className={classes.listRows}>
                                    {results?.users?.length !== 0 ? results.users.map((userRaw, index) => {
                                        const user = new UserModel(userRaw)
                                        return(
                                            <div key={index} className="my-2">
                                                <Link href={user.getProfileLink} prefetch={false}>
                                                    <a className="d-flex decoration-none">
                                                        <img className="img-profile-wrapper rounded-circle"
                                                            src={user.getAvatar}
                                                            alt={user.getUsername}
                                                            width={40}
                                                        />
                                                        <p> {user.getFullName}</p>
                                                    </a>
                                                </Link>
                                            </div>
                                        )}) : <p>no results </p>
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={7}>
                            <Typography variant="h3">
                                {t('layout:announces')} ({results?.announces?.length})
                            </Typography>
                            <div className={classes.listRows}>
                                {loading && <Loading/>}
                                {results?.announces?.length !== 0 ? results.announces.map((announceRaw, index) => {
                                    return(
                                        <div key={index} className="m-1">
                                            <AnnounceCardLight announceRaw={announceRaw}/>
                                        </div>
                                    )}) : <p> no results </p> }
                            </div>
                        </Col>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ModalSearchResults
