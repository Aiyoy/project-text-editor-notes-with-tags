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
    deleteNote(state: noteInitialState, action: { payload: string; type: string }) {
      const filterNotes = state.notes.filter((note: INote) => note.id !== action.payload);
      state.notes = filterNotes;
    },
    updateNote(state: noteInitialState, action: { payload: INote; type: string }) {
      const index = state.notes.findIndex((note: INote) => note.id === action.payload.id);
      state.notes[index] = action.payload;
    },
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;

export const selectNotes = (state: RootState): INote[] => state.notes.notes;

export default noteSlice.reducer;