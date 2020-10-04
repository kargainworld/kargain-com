import React from 'react'

const AvatarPreview = ({src}) => {
    return(
        <div className="avatar-upload">
            <div className="avatar-preview">
                <div id="imagePreview" style={{ backgroundImage: `url(${src})` }} />
            </div>
        </div>
    )
}

export default AvatarPreview;
