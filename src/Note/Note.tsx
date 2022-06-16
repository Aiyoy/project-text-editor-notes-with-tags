import { nanoid } from 'nanoid';

import Tag from '../Tag/Tag';

import './note.css';

const Note = (props: { noteInf: INote }): JSX.Element => {
  const tags: string[] = props.noteInf.tags;
  return (
    <>
      <div className="note-container">
        <div className="wrapper">
          <div className="note-title">{props.noteInf.title}</div>
          <div className="note-btns">
            <div className="note-btns_edit"></div>
            <div className="note-btns_trash"></div>
          </div>
        </div>
        <div className="note-content">{props.noteInf.content}</div>
        <div className="note-tags">
          {!!tags.length &&
            tags.map((tag: string) => {
              return <Tag key={nanoid()} tag={tag} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Note;
