import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import Note from '../Note/Note';
import { searchError } from '../Constants/constants';
import { selectNotes, addNotes } from '../Redux/noteSlice';
import { selectTags } from '../Redux/searchSlice';

import './notesContainer.css';

const NoteContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const notes: INote[] = useSelector(selectNotes);
  const tags: ITag[] = useSelector(selectTags);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>(notes);

  useEffect((): void => {
    const curTags = tags.map((tag: ITag) => tag.tag);

    let filterNotes: INote[] = notes;

    for (let i = 0; i < curTags.length; i++) {
      filterNotes = filterNotes.filter((note: INote) => {
        const boolRes = note.tags.map((tag: ITag) => {
          return curTags[i] === tag.tag;
        });
        return boolRes.includes(true);
      });
    }
    setFilteredNotes(filterNotes);
  }, [notes, tags]);

  useEffect(() => {
    if (localStorage.getItem('Notes') && localStorage.getItem('Notes') !== '[]') {
      const notesLS = JSON.parse(localStorage.getItem('Notes') as string);
      dispatch(addNotes(notesLS));
      console.log('start', localStorage.getItem('Notes'));
    }

    // return (): void => {
    //   localStorage.setItem('Notes', JSON.stringify(notes));
    // };
  }, [dispatch]);

  return (
    <>
      <div className="notes-container">
        {!!filteredNotes.length &&
          filteredNotes.map((note: INote) => {
            return <Note key={nanoid()} noteInf={note} />;
          })}
        {!filteredNotes.length && <div>{searchError}</div>}
      </div>
    </>
  );
};

export default NoteContainer;
