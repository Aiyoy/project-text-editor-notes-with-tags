/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import reactStringReplace from 'react-string-replace';
import { useDispatch, useSelector } from 'react-redux';

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

import './noteForm.css';

const NoteForm = (props: { type: string; noteInf?: INote }): JSX.Element => {
  const notes: INote[] = useSelector(selectNotes);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<INote>();

  const id = props.noteInf?.id || nanoid();

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

  const [formatedText, setFormatedText] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmite = async (data: INote) => {
    const newNote: INote = {
      id: id,
      title: data.title,
      content: data.content,
      tags: tags,
    };
    if (props.type === formType.add) {
      await dispatch(addNote(newNote));
    } else {
      await dispatch(updateNote(newNote));
    }
    reset();
    clearErrors();

    localStorage.setItem('Notes', JSON.stringify(notes.concat(newNote)));
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<Element>) => {
    if (event.key === ' ' && !!tag.length) {
      const newTag: ITag = {
        id: nanoid(),
        tag: tag,
      };
      setTags([...tags, newTag]);
      setTag('');
    }
  };

  const handleTagDelete = (id: string) => {
    const filterTags = tags.filter((tag: ITag) => tag.id !== id);
    setTags(filterTags);
  };

  const transformText = (): void => {
    const replacedText = reactStringReplace(content, /#(\w+)/g, (match, i) => (
      <span className="tag">#{match}</span>
    ));

    let text: any = '';

    replacedText.forEach((word: any) => {
      text += word;
    });
    // const contentArr: string[] = content.split(' ');
    // const formatedContent = contentArr
    //   .map((word: string) => {
    //     const formatedWord = word.startsWith('#') ? '<span className="tag">word</span>' : word;
    //     console.log(formatedWord);
    //     return formatedWord;
    //   })
    //   .join(' ');
    console.log(text);
    // setFormatedText(replacedText.join(' '));
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleSubmite)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            {formLabel.title}
            <br />
            <input
              className="form-input"
              placeholder={formPlaceholder.title}
              value={title}
              type="text"
              {...register('title', {
                required: true,
                onChange: (e) => {
                  setTitle(e.target.value);
                },
              })}
            />
          </label>
          {errors.title && <p className="error">{errorText}</p>}
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            {formLabel.content}
            <br />
            <textarea
              className="form-textarea"
              placeholder={formPlaceholder.content}
              value={content}
              {...register('content', {
                required: true,
                onChange: (e) => {
                  setContent(e.target.value);
                },
              })}
              onBlur={transformText}
            />
          </label>
          {errors.content && <p className="error">{errorText}</p>}
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            {formLabel.tags}
            <br />
            <input
              className="form-input"
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

        <button className="form-btn" type="submit">
          {props.type === formType.add ? formBTNType.add : formBTNType.edit}
        </button>
      </form>
    </>
  );
};

export default NoteForm;
