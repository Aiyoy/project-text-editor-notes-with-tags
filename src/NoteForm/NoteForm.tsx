/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import reactStringReplace from 'react-string-replace';

import Tag from '../Tag/Tag';
import { addNote, updateNote, selectNotes } from '../Redux/noteSlice';
import { AppDispatch } from '../Redux/store';
import {
  formType,
  formBTNType,
  formLabel,
  formPlaceholder,
  errorText,
  tagType,
} from '../Constants/constants';

const NoteForm = (props: { type: string; noteInf?: INote }): JSX.Element => {
  const notes: INote[] = useSelector(selectNotes);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<INote>();

  const id: string = props.noteInf?.id || nanoid();

  const [title, setTitle] = useState<string>(() => {
    if (props.noteInf) {
      return props.noteInf.title;
    } else {
      return '';
    }
  });

  const [content, setContent] = useState<string>(() => {
    if (props.noteInf) {
      return props.noteInf.content;
    } else {
      return '';
    }
  });

  const [tags, setTags] = useState<ITag[]>(() => {
    if (props.noteInf) {
      return props.noteInf.tags;
    } else {
      return [];
    }
  });

  const [tag, setTag] = useState<string>('');

  const [isTitleActive, setIsTitleActive] = useState<boolean>(false);
  const [isContentActive, setIsContentActive] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmite = async (): Promise<void> => {
    const newNote: INote = {
      id: id,
      title: title,
      content: content,
      tags: tags,
    };

    if (props.type === formType.add) {
      localStorage.setItem('Notes', JSON.stringify(notes.concat(newNote)));
    } else {
      const index: number = notes.findIndex((note: INote) => note.id === id);
      const updateNotes: INote[] = notes.slice();
      updateNotes[index] = newNote;
      localStorage.setItem('Notes', JSON.stringify(updateNotes));
    }

    if (props.type === formType.add) {
      await dispatch(addNote(newNote));
    } else {
      await dispatch(updateNote(newNote));
    }
    reset();
    clearErrors();
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<Element>): void => {
    if (event.key === ' ' && !!tag.length) {
      const newTag: ITag = {
        id: nanoid(),
        tag: tag,
      };
      setTags(unique([...tags, newTag]));
      setTag('');
    }
  };

  const handleTagDelete = (id: string): void => {
    const filterTags: ITag[] = tags.filter((tag: ITag) => tag.id !== id);
    setTags(filterTags);
  };

  const selectTagFromText = (): void => {
    let contentArr: string[] = content.split(' ');
    contentArr = contentArr.filter((word: string) => /#(\w+)/g.exec(word));
    const tagsFromText: ITag[] = contentArr.map((word: string) => {
      return {
        id: nanoid(),
        tag: word.slice(1),
      };
    });
    setTags(unique([...tags, ...tagsFromText]));
  };

  const unique = (arr: ITag[]): ITag[] => {
    const result: string[] = [];
    const resultTags: ITag[] = [];

    for (const str of arr) {
      if (!result.includes(str.tag)) {
        result.push(str.tag);
        resultTags.push(str);
      }
    }
    return resultTags;
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleSubmite)}>
        <div className="form-wrapper ">
          <label className="label">
            {formLabel.title}
            <br />
            {props.type === formType.edit && !isTitleActive ? (
              <div className="pseudo-input" onClick={() => setIsTitleActive(true)}>
                {title}
              </div>
            ) : (
              <input
                className="input"
                placeholder={formPlaceholder.title}
                value={title}
                type="text"
                {...register('title', {
                  required: true,
                  onChange: (e) => {
                    setTitle(e.target.value);
                  },
                })}
                onBlur={() => setIsTitleActive(false)}
              />
            )}
          </label>
          {errors.title && <p className="error">{errorText}</p>}
        </div>

        <div className="form-wrapper ">
          <label className="label">
            {formLabel.content}
            <br />
            {props.type === formType.edit && !isContentActive ? (
              <div className="pseudo-textarea" onClick={() => setIsContentActive(true)}>
                {reactStringReplace(content, /#(\w+)/g, (match, i) => (
                  <span key={nanoid()} className="tag">
                    #{match}
                  </span>
                ))}
              </div>
            ) : (
              <textarea
                className="textarea"
                placeholder={formPlaceholder.content}
                value={content}
                {...register('content', {
                  required: true,
                  onChange: (e) => {
                    setContent(e.target.value);
                  },
                })}
                onBlur={() => {
                  selectTagFromText();
                  setIsContentActive(false);
                }}
              />
            )}
          </label>
          {errors.content && <p className="error">{errorText}</p>}
        </div>

        <div className="form-wrapper">
          <label className="label">
            {formLabel.tags}
            <br />
            <input
              className="input"
              placeholder={formPlaceholder.tags}
              value={tag}
              type="text"
              onChange={(e) => {
                setTag(e.target.value.trim());
              }}
              onKeyDown={onKeyPressHandler}
            />
          </label>
          {errors.tags && <p className="error">{errorText}</p>}
        </div>

        <div className="tags-wrapper">
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

        <button className="btn" type="submit">
          {props.type === formType.add ? formBTNType.add : formBTNType.edit}
        </button>
      </form>
    </>
  );
};

export default NoteForm;
