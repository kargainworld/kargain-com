import React, { useRef, useContext, useEffect, useState } from 'react'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import { useForm } from 'react-hook-form'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import { format } from 'date-fns'
import parseISO from 'date-fns/parseISO'
import { MessageContext } from '../context/MessageContext'
import { useAuth } from '../context/AuthProvider'
import useStyles from './Conversations/conversation.styles'
import ValidationError from './Form/Validations/ValidationError'
import ConversationsService from '../services/ConversationsService'
import { ModalContext } from '../context/ModalContext'

export default function ModalMessaging () {
    const contentRef = useRef()
    const classes = useStyles()
    const { t } = useTranslation()
    const { isAuthenticated, authenticatedUser, setForceLoginModal } = useAuth()
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    const { modalStateContext, dispatchModalState } = useContext(ModalContext)
    const [conversation, setConversation] = useState(null)
    const { register, errors, handleSubmit, reset } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all'
    })
    
    const recipient = modalStateContext.modalMessagingProfile
    const recipientID = recipient.getID
    
    const handleClose = () => dispatchModalState({
        openModalMessaging : false
    })
    
    const loadConversation = async () => {
        try {
            let conversation = await ConversationsService.getConversationWithProfile(recipientID)
            setConversation(conversation)
        } catch (err) {
            dispatchModalError({ err })
        }
    }
    
    const onSubmitMessage = async (form) => {
        const { message } = form
        try {
            const conversation = await ConversationsService.postConversationMessage(message, recipient.getID)
            setConversation(conversation)
            dispatchModal({ msg: 'Message posted' })
            if(contentRef.current){
                contentRef.current.scrollTop = contentRef.current?.scrollHeight
            }
            reset()
        } catch (err) {
            dispatchModalError({
                err,
                persist: true
            })
        }
    }

    useEffect(() => {
        if(isAuthenticated && recipientID){
            loadConversation()
        }
    }, [recipientID, isAuthenticated])
    
    if(!isAuthenticated) {
        setForceLoginModal(true)
        return null
    }
    
    return (
        <Modal
            open={modalStateContext.openModalMessaging}
            className={classes.modal}
            onClose={handleClose}
        >
            <Fade in={modalStateContext.openModalMessaging}>
                <div className={classes.paper}>
                    {recipient && (
                        <div className={classes.conversation}>
                            <div className={classes.conversationHeader}>
                                <div className={classes.headerUsername}>
                                    <div style={{ maxWidth: '70%' }}>
                                        <Link href={recipient.getProfileLink} prefetch={false}>
                                            <a>
                                                <img className="rounded-circle"
                                                    src={recipient.getAvatar}
                                                    alt={recipient.getUsername}
                                                    width={50}
                                                    height={50}
                                                />
                                                <span className="mx-2">{recipient.getFullName}</span>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.conversationContent} ref={contentRef}>
                                <div className={classes.messageContainer}>
                                    {(conversation?.messages?.length !== 0) ? (
                                        <>
                                            {conversation?.createdAt && format(parseISO(conversation.createdAt), 'MM/dd/yyyy')}
                                            {conversation?.messages.map((message, index) => {
                                                if (authenticatedUser.getID === message?.from) {
                                                    return (
                                                        <div key={index} className={classes.textJustifiedEnd}>
                                                            <div className={classes.basicMessage}>
                                                                <div className={classes.messageBubble}>
                                                                    {message?.content}
                                                                </div>
                        
                                                                <img className="dropdown-toggler rounded-circle mx-2"
                                                                    width="30"
                                                                    height="30"
                                                                    src={authenticatedUser.getAvatar}
                                                                    title={authenticatedUser.getFullName}
                                                                    alt={authenticatedUser.getUsername}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className={classes.textJustifiedStart}>
                                                            <div className={classes.basicMessage}>
                                                                <img className="dropdown-toggler rounded-circle mx-2"
                                                                    width="30"
                                                                    height="30"
                                                                    src={recipient.getAvatar}
                                                                    title={recipient.getFullName}
                                                                    alt={recipient.getUsername}
                                                                />
                                                                <div className={classes.messageBubbleLeft}>
                                                                    {message?.content}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </>
                                    ) : (
                                        <Typography variant="body1">
                                            {`Start a conversation with ${recipient.getFullName}`}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                            <div className={classes.conversationFooter}>
                                <form
                                    className={classes.conversationForm}
                                    onSubmit={handleSubmit(onSubmitMessage)}>
                                    <textarea
                                        className={classes.conversationTextarea}
                                        name="message"
                                        ref={register({ required: t('form_validations:required') })}
                                        placeholder={t('layout:write_your_message')}
                                        maxLength={30000}
                                        rows={2}
                                    />
                                    {errors && <ValidationError errors={errors} name={name}/>}
                                    <button className={classes.conversationInputButton} type="submit">
                                        {t('layout:send')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </Fade>
        </Modal>
    )
}
