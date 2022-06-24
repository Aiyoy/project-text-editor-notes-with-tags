import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import Tag from '../Tag/Tag';
import { addSearchTag, deleteSearchTag, selectTags } from '../Redux/searchSlice';
import { searchPlaceholder, tagType } from '../Constants/constants';

const SearchBar: () => JSX.Element = (): JSX.Element => {
  const dispatch = useDispatch();

  const [tag, setTag] = useState<string>('');

  const tags: ITag[] = useSelector(selectTags);

  function handleKeyDown(event: React.KeyboardEvent<Element>): void {
    if (event.key === ' ' && !!tag.length) {
      const newTag: ITag = {
        id: nanoid(),
        tag: tag,
      };
      dispatch(addSearchTag(newTag));
      setTag('');
    }
  }

  const handleTagDelete = (id: string): void => {
    dispatch(deleteSearchTag(id));
  };

  return (
    <>
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder={searchPlaceholder}
          value={tag}
          onChange={(e) => {
            setTag(e.target.value.trim());
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="search-tags-container">
        {!!tags.length &&
          tags.map((tag: ITag) => {
            return (
              <Tag
                key={nanoid()}
                tag={tag.tag}
                type={tagType.delete}
                onClick={() => handleTagDelete(tag.id)}
              />
            );
          })}
      </div>
    </>
  );
};

export default SearchBar;
