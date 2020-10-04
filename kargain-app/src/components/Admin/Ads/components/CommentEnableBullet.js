import React from 'react'
import PropTypes from 'prop-types'
import BooleanBullet from '../../BooleanBullet'

const CommentEnableBullet = ({ comment, handleDisableAction, handleEnableAction }) => {
    const activated = comment.getIsEnabled
    
    const handleUpdate = async () => {
        const action = activated ? handleDisableAction : handleEnableAction
        await action()
        comment.toggleIsEnabled()
    }
    
    return (
        <div className="edit">
            <BooleanBullet
                bool={activated}
                onClick={() => handleUpdate()}
            />
        </div>
    );
};

CommentEnableBullet.propTypes = {
    comment : PropTypes.object.isRequired
}

export default CommentEnableBullet;
