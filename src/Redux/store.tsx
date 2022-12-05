import { configureStore } from '@reduxjs/toolkit';

import noteSlice from './noteSlice';
import searchSlice from './searchSlice';

export const store = configureStore({
  reducer: {
    notes: noteSlice,
    search: searchSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
