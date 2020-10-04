import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../../context/AuthProvider'
import { MessageContext } from '../../context/MessageContext'
import CommentsService from '../../services/CommentsService'

const CommentsList = ({ comments }) => {
    const { authenticatedUser } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(MessageContext);
    const [openDialogRemove, setOpenDialogRemove] = useState(false);
    const [selectCommentID, setSelectedCommentID] = useState()

    const handleOpenDialogRemove = (commentID) => {
        setOpenDialogRemove(true);
        setSelectedCommentID(commentID)
    };

    const handleCloseDialogRemove = () => {
        setOpenDialogRemove(false);
    };

    const handleRemoveComment = () => {
        CommentsService.disableComment(selectCommentID)
            .then(() => {
                dispatchModal({ msg: 'Comment successfully removed' });
                window.location.reload()
            }).catch(err => {
                dispatchModalError({ err });
            });
    };

    return (
        <div className="comments">
            <ModalConfirmRemoveComment
                openDialogRemove={openDialogRemove}
                handleCloseDialogRemove={handleCloseDialogRemove}
                handleCallback={handleRemoveComment}
            />

            <ul className="commentsCardList">
                {comments && comments.map((comment, index) => {
                    const isOwn = authenticatedUser.getID === comment.getAuthor.getID

                    return (
                        <li key={index} className="d-flex align-items-center my-2">
                            {isOwn && (
                                <span
                                    className="mx-1 top-profile-location edit"
                                    onClick={()=>handleOpenDialogRemove(comment.getID) }>
                                    <RemoveCircleIcon/>
                                </span>
                            )}

                            <Link href={comment.getAuthor.getProfileLink}>
                                <a>
                                    <Typography as="p" gutterBottom className="mx-1">
                                        <strong>{comment.getAuthor.getFullName} : </strong>
                                    </Typography>
                                </a>
                            </Link>

                            <Typography as="p" gutterBottom>
                                {comment.getMessage}
                            </Typography>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

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
};

export default CommentsList;
