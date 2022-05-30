/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthor, ILocation, IPainting } from '../../types/types';
import { paintingsInitialState } from '../initialStates/paintingsInitState';

export const paintingsSlice = createSlice({
  name: 'paintings',
  initialState: paintingsInitialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setPaintingsLoadingSuccess(state, action: PayloadAction<IPainting[]>) {
      state.paintings = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    setLocationsLoadingSuccess(state, action: PayloadAction<ILocation[]>) {
      state.locations = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    setAuthorsLoadingSuccess(state, action: PayloadAction<IAuthor[]>) {
      state.authors = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    setError(state, action: PayloadAction<unknown>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default paintingsSlice.reducer;
