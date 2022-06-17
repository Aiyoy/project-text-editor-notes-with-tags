import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

const initialState: noteInitialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote(state: noteInitialState, action: { payload: INote; type: string }) {
      state.notes = [...state.notes, action.payload];
    },
    addNotes(state: noteInitialState, action: { payload: INote[]; type: string }) {
      state.notes = [...action.payload];
    },
    deleteNote(state: noteInitialState, action: { payload: string; type: string }) {
      const filterNotes = state.notes.filter((note: INote) => note.id !== action.payload);
      state.notes = filterNotes;
      localStorage.setItem('Notes', JSON.stringify(filterNotes));
    },
    updateNote(state: noteInitialState, action: { payload: INote; type: string }) {
      const index = state.notes.findIndex((note: INote) => note.id === action.payload.id);
      state.notes[index] = action.payload;
      localStorage.setItem('Notes', JSON.stringify(state.notes));
    },
  },
});

export const { addNote, addNotes, deleteNote, updateNote } = noteSlice.actions;

export const selectNotes = (state: RootState): INote[] => state.notes.notes;

export default noteSlice.reducer;
