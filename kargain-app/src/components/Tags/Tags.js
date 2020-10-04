import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TagsList from './TagsList';

const Tags = ({ defaultTags, onChange: fireTags }) => {
    const tagInput = useRef();
    const [tags, setTags] = useState(defaultTags);

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    };

    const inputKeyDown = (e) => {
        const val = e.target.value;

        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
        }

        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            tagInput.current.value = null;
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };

    useEffect(() => {
        setTags(defaultTags);
    }, [defaultTags]);

    useEffect(() => {
        fireTags(tags);
    }, [tags]);

    return (
        <div>
            <div className="input-field">
                <input
                    type="text"
                    className="input-text"
                    onKeyDown={inputKeyDown}
                    ref={tagInput}
                />
            </div>
            <div className="my-2">
                <TagsList
                    editMode
                    tags={tags}
                    onRemoveTag={removeTag}
                />
            </div>
        </div>
    );
};

Tags.propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultTags: PropTypes.arrayOf(PropTypes.string),
    maxTags: PropTypes.number
};

Tags.defaultProps = {
    // fireTags: () => {},
    defaultTags: []
};
export default Tags;
