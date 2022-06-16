import { nanoid } from 'nanoid';

import Note from '../Note/Note';

import './notesContainer.css';

const notes: INote[] = [
  {
    title: 'NewNote',
    content: 'This is test note',
    tags: ['firstNote', 'tag', 'test'],
  },
];

const NoteContainer = (): JSX.Element => {
  return (
    <>
      <div className="notes-container">
        {!!notes.length && (
          <>
            {notes.length > 0 &&
              notes.map((note: INote) => {
                return <Note key={nanoid()} noteInf={note} />;
              })}
          </>
        )}
      </div>
    </>
  );
};

export default NoteContainer;
