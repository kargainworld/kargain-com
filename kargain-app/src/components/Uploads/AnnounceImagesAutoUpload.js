import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import { MessageContext } from '../../context/MessageContext';
import UploadDropZone from './UploadDropZone';
import CardMediaMUI from '../CardMediaMUI';
import AnnounceService from '../../services/AnnounceService';

const AnnounceImagesAutoUpload = ({ announceSlug, enableRefreshAfterUpload }) => {
    const [uploads, setUploads] = useState([]);
    const router = useRouter();
    const { dispatchModal, dispatchModalError } = useContext(MessageContext);

    const startUploadAPI = (files) => {
        if (!announceSlug) return dispatchModalError({ err: 'add a slug' });

        dispatchModal({ msg: 'Uploading...' });
        let data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('images', files[i]);
        }

        AnnounceService.uploadImages(announceSlug, data)
            .then(() => {
                dispatchModal({ msg: 'Upload Successful' });
                if(enableRefreshAfterUpload){
                    router.reload();
                }
            }).catch(err => {
                dispatchModalError({ err });
            });
    };

    return (
        <>
            <UploadDropZone fireFiles={startUploadAPI}/>
            <Typography as="p">{uploads.length} images téléchargées </Typography>

            {uploads && (
                <div className="m-2 m-auto p-2">
                    <Row>
                        {uploads.map((upload, index) => {
                            return (
                                <Col key={index}>
                                    <div className="m-2">
                                        <CardMediaMUI src={upload.location} classes={{
                                            img: {
                                                maxWidth: '100%',
                                                margin: '0 auto',
                                                maxHeight: '200px',
                                                objectFit: 'contain'
                                            }
                                        }}/>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            )}
        </>
    );
};

AnnounceImagesAutoUpload.propTypes = {
    announceSlug: PropTypes.string.isRequired
};

export default AnnounceImagesAutoUpload;
