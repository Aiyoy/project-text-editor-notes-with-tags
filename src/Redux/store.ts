import { configureStore } from '@reduxjs/toolkit';

import noteSlice from './noteSlice';

export const store = configureStore({
  reducer: {
    notes: noteSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
