import useTranslation from 'next-translate/useTranslation'
import React from 'react'

const CommentForm = ({ onSubmitComment, textareaCommentRef, doneSubmitting }) => {
    const { t } = useTranslation()
    return (
        <form onSubmit={e => onSubmitComment(e)}
            className="comments-write">
            <div className="form-group position-relative w-auto">
                <textarea
                    rows={3}
                    cols={13}
                    ref={textareaCommentRef}
                    placeholder="ex: Superbe voiture"
                    className="form-control editor"
                />
            </div>
            
            <div className="mx-auto my-2">
                <button
                    disabled={!doneSubmitting}
                    type="submit"
                    className="btn btn-primary">
                    {t('vehicles:add_a_comment')}
                </button>
            </div>
        </form>
    )
}

export default CommentForm
