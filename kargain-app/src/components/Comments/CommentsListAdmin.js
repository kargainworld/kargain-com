import React, {  useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Table } from 'reactstrap'
import { MessageContext } from '../../context/MessageContext'
import CommentsService from '../../services/CommentsService'
import CommentEnableBullet from '../Admin/Ads/components/CommentEnableBullet'

const CommentsList = ({ comments }) => {
    const { dispatchModal, dispatchModalError } = useContext(MessageContext)
    
    const handleEnableComment = (commentID) => {
        CommentsService.enableComment(commentID)
            .then(() => {
                dispatchModal({ msg: 'Comment successfully enabled' })
            }).catch(err => {
                dispatchModalError({ err })
            })
    }
    
    const handleDisableComment = (commentID) => {
        return CommentsService.disableComment(commentID)
            .then(() => {
                dispatchModal({ msg: 'Comment successfully disabled' })
            }).catch(err => {
                dispatchModalError({ err })
            })
    }
    
    return (
        <div className="comments" style={{ width : '90vw' }}>
            <p>
                <span className="mx-1">
                    Total <strong>{comments.length}</strong>
                </span>
                <span className="mx-1">
                    Activés <strong>{comments.filter(comment => comment.getIsEnabled).length}</strong>
                </span>
            </p>
            <Table>
                <thead>
                    <tr>
                        <td>Message</td>
                        <td>Auteur</td>
                        <td>Date</td>
                        <td>Active</td>
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment, index) => {
                        return (
                            <tr key={index} className="p-2">
                                <td style={{ width: '50%'}}>
                                    <Typography as="p" gutterBottom>
                                        <strong>
                                            {comment.getMessage}
                                        </strong>
                                    </Typography>
                                </td>
                                <td>
                                    <Link href={comment.getAuthor.getProfileLink}>
                                        <a>
                                            <Typography as="p" gutterBottom className="mx-1">
                                                {comment.getAuthor.getFullName}
                                            </Typography>
                                        </a>
                                    </Link>
                                </td>
                                <td>
                                    <Typography as="p" gutterBottom className="mx-1">
                                        {comment.getDate}
                                    </Typography>
                                </td>
                                <td>
                                    <CommentEnableBullet
                                        comment={comment}
                                        handleEnableAction={() => handleEnableComment(comment.getID)}
                                        handleDisableAction={() => handleDisableComment(comment.getID)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

const ModalConfirmRemoveComment = ({openDialogRemove, handleCloseDialogRemove, handleCallback}) => {
    const { t } = useTranslation()

    return(
        <Dialog
            open={openDialogRemove}
            onClose={handleCloseDialogRemove}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" disableTypography>
                {t('vehicles:confirm-suppression')}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleCloseDialogRemove} color="primary" autoFocus>
                    {t('vehicles:cancel')}
                </Button>
                <Button
                    variant="contained"
                    startIcon={<RemoveCircleIcon/>}
                    onClick={handleCallback}>
                    {t('vehicles:remove_comment')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
CommentsList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentsList
