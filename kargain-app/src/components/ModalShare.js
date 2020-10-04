import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import { useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import copy from 'copy-to-clipboard'
import { ModalContext } from '../context/ModalContext'
import EmailInput from '../components/Form/Inputs/EmailInput'
import AnnounceService from '../services/AnnounceService'
import { MessageContext } from '../context/MessageContext'
import { useAuth } from '../context/AuthProvider'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth : '600px',
        width : '100%'
    },

    list: {
        listStyleType: 'none',
        height: '500px',
        width: '300px',
        overflowX: 'hidden',
        overflowY: 'scroll'
    },

    pointerClose: {
        display: 'flex',
        cursor: 'pointer'
    }
}))

// const Facebook = () => {
//     const label = "Via facebook"
//     const { modalStateContext } = useContext(ModalContext)
//     const shareUrl = `https://kargain.com/announce/${modalStateContext.modalShareAnnounce.getSlug}`
//     const title = modalStateContext.modalShareAnnounce.getAnnounceTitle
//
//     return(
//         <div className="d-flex">
//             <FacebookShareButton
//                 url={shareUrl}
//                 quote={`Kargain.com | ${title}`}
//             >
//                 <a className="social-link-modal" href="#">
//                     {label} <FacebookIcon/>
//                 </a>
//             </FacebookShareButton>
//         </div>
//     )
// }

// const Messenger = () => {
//     const label = "Via Facebook Messenger"
//     const { modalStateContext } = useContext(ModalContext)
//     const shareUrl = modalStateContext.modalShareAnnounce.getAnnounceShareLink
//     const title = modalStateContext.modalShareAnnounce.getAnnounceTitle
//
//     return(
//         <div className="d-flex">
//             <FacebookMessengerShareButton
//                 url={shareUrl}
//                 quote={`Kargain.com | ${title}`}
//             >
//                 <a className="social-link-modal" href="#">
//                     {label} <FacebookIcon/>
//                 </a>
//             </FacebookMessengerShareButton>
//         </div>
//     )
// }

const Email = () => {
    const label = 'Via email'
    const { t } = useTranslation()
    const [openForm, setOpenForm] = useState(false)
    const { modalStateContext } = useContext(ModalContext)
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const { control, errors, handleSubmit } = useForm()
    
    const onSubmit = (form) => {
        AnnounceService.mailtoAnnounceLink(modalStateContext.modalShareAnnounce.getSlug, form.email)
            .then(() => {
                dispatchModal({
                    msg: t('layout:email_had_been_sent_to_{email}', {email : form.email})
                })
            }).catch(err => {
                dispatchModalError({ err })
            })
    }
    
    return(
        <div className="d-flex">
            <div style={{ flex : 1 }}>
                <a className="social-link-modal" href="#" onClick={() => setOpenForm(open => !open)}>
                    {label}
                </a>
            </div>
            
            {openForm && (
                <div style={{ flex : 3 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <EmailInput
                            name="email"
                            placeholder="email"
                            errors={errors}
                            control={control}
                            rules={{ required: t('form_validations:field-is-required') }}
                        />
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            )}
        </div>
    )
}

const Clipboard = () => {
    const { t } = useTranslation()
    const { modalStateContext } = useContext(ModalContext)
    const [clipBoarCopied, setClipBoardCopied] = useState(false)
    const label = !clipBoarCopied ? t('layout:copy_link') : t('layout:copy_link_copied')
    
    const handleClick = () => {
        copy(modalStateContext.modalShareAnnounce.getAnnounceTitle, {
            onCopy : () => setClipBoardCopied(true)
        })}
    
    return(
        <div className="d-flex">
            <a className="social-link-modal" href="#" onClick={handleClick}>
                {label}
            </a>
        </div>
    )
}

export default function ModalShare () {
    const classes = useStyles()
    const { isAuthenticated, setForceLoginModal } = useAuth()
    const { modalStateContext, dispatchModalState } = useContext(ModalContext)
    
    const handleClose = () => {
        dispatchModalState({
            openModalShare : false
        })
    }
    
    useEffect(()=> {
        if(!isAuthenticated){
            setForceLoginModal(true)
            dispatchModalState({
                openModalShare : false
            })
        }
    },[modalStateContext.openModalShare, isAuthenticated])
    
    if(!isAuthenticated) return null
    
    return (
        <Modal
            className={classes.modal}
            open={modalStateContext.openModalShare}
            onClose={handleClose}>
            <Fade in={modalStateContext.openModalShare}>
                <div className={classes.paper}>
                    <Typography component="h2" variant="h2">
                        Partager
                    </Typography>
                    
                    <div className="d-flex flex-column my-2 providers">
                        {/*<Facebook/>*/}
                        {/*<Messenger/>*/}
                        <Email/>
                        <Clipboard/>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}
