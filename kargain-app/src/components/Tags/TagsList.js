import React, {memo} from 'react';
import PropTypes from 'prop-types'
import clsx from 'clsx';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    tags: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        width: '100%',
    },

    tag: {
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        margin: '2px',
        padding: '5px',
        borderRadius: '10px',
        fontWeight : 'bold'
    },
}));

const TagsList = memo(({tags, editMode, onRemoveTag}) => {
    const classes = useStyles()
    if(!tags) return null

    return(
        <ul className={classes.tags}>
            {tags.map((tag, i) => (
                <li key={i} className={classes.tag}>
                    #{tag}

                    {editMode && (
                        <span onClick={() => {
                            onRemoveTag(i);
                        }}>
                        <RemoveCircleIcon/>
                    </span>
                    )}
                </li>
            ))}
        </ul>
    )
})

TagsList.propTypes = {
    tags : PropTypes.arrayOf(PropTypes.string),
    editMode : PropTypes.bool,
    onRemoveTag : PropTypes.func
}

TagsList.defaultProps = {
    tags : []
}

export default TagsList
