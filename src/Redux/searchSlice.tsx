import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

const initialState: searchInitialState = {
  tags: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchTag(state: searchInitialState, action: { payload: ITag; type: string }) {
      state.tags = [...state.tags, action.payload];
    },
    deleteSearchTag(state: searchInitialState, action: { payload: string; type: string }) {
      const filterTags = state.tags.filter((tag: ITag) => tag.id !== action.payload);
      state.tags = filterTags;
    },
  },
});

export const { addSearchTag, deleteSearchTag } = searchSlice.actions;

export const selectTags = (state: RootState): ITag[] => state.search.tags;

export default searchSlice.reducer;
