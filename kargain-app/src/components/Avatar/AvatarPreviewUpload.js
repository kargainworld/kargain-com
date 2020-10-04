import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { MessageContext } from '../../context/MessageContext';
import { useAuth } from '../../context/AuthProvider';
import UsersService from '../../services/UsersService';

const FileInput = ({ value, onChange = noop, ...rest }) => (
    <input
        {...rest}
        // style={{ display: "none" }}
        type="file"
        id="imageUpload"
        accept=".png, .jpg, .jpeg"
        onChange={e => {
            onChange([...e.target.files]);
        }}
    />
);

const AvatarPreviewUpload = () => {
    const { authenticatedUser, updateAuthenticatedRawUser, isAuthenticated } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(MessageContext);
    const [avatarLocation, setAvatarLocation] = useState(authenticatedUser.getAvatar);

    const onChangeFile = (files) => {
        dispatchModal({ msg: 'Uploading...', persist : true });
        let data = new FormData();
        data.append('avatar', files[0]);

        UsersService.uploadAvatar(data)
            .then(doc => {
                updateAuthenticatedRawUser(doc);
                dispatchModal({ msg: 'Upload Successful'});
            }).catch(err => {
                dispatchModalError({ err, persist : true });
            });
    };

    useEffect(() => {
        setAvatarLocation(authenticatedUser.getAvatar);
    }, [authenticatedUser]);

    return (
        <div className="avatar-upload">
            {isAuthenticated && (
                <div className="avatar-edit">
                    <FileInput onChange={onChangeFile}/>
                    <label htmlFor="imageUpload">
                        <EditIcon/>
                    </label>
                </div>
            )}
            <div className="avatar-preview" style={{ height : 160, width : 160}}>
                <div id="imagePreview" style={{ backgroundImage: `url(${avatarLocation})` }}/>
            </div>
        </div>
    );
};

export default AvatarPreviewUpload;
