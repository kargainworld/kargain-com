import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import DropZone from 'react-dropzone-uploader';
import ClearIcon from '@material-ui/icons/Clear';
import ReplayIcon from '@material-ui/icons/Replay';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';

const blue = '#007bff';

const useStyles = makeStyles((theme) => ({
    root: {
        float: 'left',
        clear: 'both',
        width: '100%',
        textAlign: 'center',
        background: theme.palette.white,
        borderRadius: '7px',
        border: '3px solid #eee',
        transition: 'all .2s ease',
        userSelect: 'none',

        '&:hover': {
            borderColor: blue
        }
    },

    previewContainer: {
        width: '100%',
        padding: '1rem',
        zIndex: 'unset',
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    },

    labelInput: {
        backgroundColor: blue,
        color: theme.palette.white,
        cursor: 'pointer',
        padding: 10,
        borderRadius: 3,
        transition: 'all .2s ease',
        border: `2px solid ${blue}`,
        '&:hover': {
            backgroundColor: theme.palette.white,
            color: blue
        }
    },
    img: {
        objectFit: 'contain',
        maxHeight: '300px',
        maxWidth: '300px'
    }
}));

const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {previews}

            <div {...dropzoneProps} style={{
                overflow: 'hidden',
                border: 'none'
            }}>
                {files.length < maxFiles && input}
            </div>

            {files.length > 0 && submitButton}
        </div>
    );
};

const Preview = (props) => {
    const {
        fileWithMeta: { cancel, remove, restart },
        meta: { name = '', percent = 0, previewUrl, status },
        isUpload,
        canCancel,
        canRemove,
        canRestart
    } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.previewContainer, 'dzu-previewContainer')}>
            <div style={{
                margin: '1rem',
                flex: 1
            }}>
                <img className={clsx(classes.img, 'dzu-previewImage')} src={previewUrl} alt={name}/>
            </div>
            <div style={{
                margin: '1rem',
                display: 'flex',
                flex: 2
            }}>
                <Alert severity="success">{name}</Alert>
            </div>

            <div className="dzu-previewStatusContainer">
                {isUpload && (
                    <progress max={100} value={status === 'done' || status === 'headers_received' ? 100 : percent}/>
                )}

                {status === 'uploading' && canCancel && (
                    <IconButton className="dzu-previewButton" aria-label="cancel" onClick={cancel}>
                        <CancelIcon/>
                    </IconButton>
                )}

                {status !== 'preparing' && status !== 'getting_upload_params' && status !== 'uploading' && canRemove && (
                    <IconButton className="dzu-previewButton" aria-label="delete" onClick={remove}>
                        <ClearIcon/>
                    </IconButton>
                )}

                {['error_upload_params', 'exception_upload', 'error_upload', 'aborted', 'ready'].includes(status) && canRestart && (
                    <IconButton className="dzu-previewButton" aria-label="restart" onClick={restart}>
                        <ReplayIcon/>
                    </IconButton>
                )}

            </div>
        </div>
    );
};

const getFilesFromEvent = e => {
    return new Promise(resolve => {
        getDroppedOrSelectedFiles(e).then(chosenFiles => {
            resolve(chosenFiles.map(f => f.fileObject));
        });
    });
};

const SubmitButton = (props) => {
    if (props.hideSubmit) return null;
    const { className, buttonClassName, style, buttonStyle, disabled, content, onSubmit, files } = props;

    const _disabled =
        files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status)) ||
        !files.some(f => ['headers_received', 'done'].includes(f.meta.status));

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)));
    };

    return (
        <div className={className} style={style}>
            <button
                type="submit"
                className={buttonClassName}
                style={buttonStyle}
                onClick={handleSubmit}
                disabled={disabled || _disabled}
            >
                {content}
            </button>
        </div>
    );
};

const UploadDropZone = ({ fireFiles, ...props }) => {
    const max = props.multiple ? props.maxFiles : 1;

    const handleSubmit = (FilesObject, allFiles) => {
        let files = FilesObject.map(file => file.file);
        fireFiles(files);
        setTimeout(() => {
            allFiles.forEach(f => f.remove());
        }, 3000);
    };

    return (
        <div className="d-flex m-3">
            <DropZone
                onSubmit={handleSubmit}
                maxFiles={max}
                accept={props.accept}
                multiple={props.multiple}
                canCancel={props.canCancel}
                inputContent={(files, extra) => (extra.reject ? props.dragLabelReject : props.dragLabel)}
                LayoutComponent={Layout}
                PreviewComponent={Preview}
                SubmitButtonComponent={innerProps =>
                    <SubmitButton
                        {...innerProps}
                        hideSubmit={props.hideSubmit}
                    />}
                onChangeStatus={(meta, status, metas) => {
                    const files = metas.map(meta => meta.file);
                    props.getFiles(files);
                }}
                submitButtonContent={props.submitLabel}
                submitButtonDisabled={props.disableSubmit}
                getFilesFromEvent={getFilesFromEvent}
                styles={{
                    dropzoneReject: {
                        borderColor: 'red',
                        backgroundColor: '#DAA'
                    },
                    previewImage: { maxHeight: '100px' }
                }}
                inputWithFilesContent={files => `${props.maxFiles - files.length} ${props.remainingLabel}`}
            />
        </div>
    );
};

UploadDropZone.PropsType = {
    fireFiles: PropTypes.func.isRequired,
    maxFiles: PropTypes.number,
    accept: PropTypes.string,
    disableSubmit: PropTypes.bool,
    hideSubmit: PropTypes.bool,
    submitLabel: PropTypes.string
};

UploadDropZone.defaultProps = {
    maxFiles: 10,
    accept: 'image/*',
    dragLabel: 'Drag images',
    dragLabelReject: 'Image, audio and video files only',
    remainingLabel: 'images left allowed',
    multiple: true,
    canCancel: true,
    submitLabel: 'Uploader',
    getFiles: () => {
    }
};

export default UploadDropZone;

