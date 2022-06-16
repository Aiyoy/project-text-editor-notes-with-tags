import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import Note from '../Note/Note';
import { selectNotes } from '../Redux/noteSlice';

import './notesContainer.css';

const NoteContainer = (): JSX.Element => {
  const notes = useSelector(selectNotes);

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
