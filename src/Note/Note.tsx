import { useState } from 'react';
import { useDispatch } from 'react-redux';
import reactStringReplace from 'react-string-replace';
import { nanoid } from 'nanoid';

import ModalWindow from '../ModalWindow/ModalWindow';
import NoteForm from '../NoteForm/NoteForm';
import Tag from '../Tag/Tag';
import { tagType, formType } from '../Constants/constants';
import { deleteNote } from '../Redux/noteSlice';
import { AppDispatch } from '../Redux/store';

import './note.css';

const Note = (props: { noteInf: INote }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const tags: ITag[] = props.noteInf.tags;

  const handleDelete = async () => {
    await dispatch(deleteNote(props.noteInf.id));
  };

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="note-container">
        <div className="wrapper">
          <div className="note-title">{props.noteInf.title}</div>
          <div className="note-btns">
            <div className="note-btns_edit" onClick={() => setModalOpen(true)}></div>
            <div className="note-btns_trash" onClick={handleDelete}></div>
          </div>
        </div>
        <div className="note-content">
          {reactStringReplace(props.noteInf.content, /#(\w+)/g, (match, i) => (
            <span key={nanoid()} className="tag">
              #{match}
            </span>
          ))}
        </div>
        <div className="note-tags">
          {tags.length > 0 &&
            tags.map((tag: ITag) => {
              return <Tag key={tag.id} tag={tag.tag} type={tagType.withoutDelete} />;
            })}
        </div>
      </div>
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {<NoteForm type={formType.edit} noteInf={props.noteInf} />}
        </ModalWindow>
      )}
    </>
  );
};

export default Note;
