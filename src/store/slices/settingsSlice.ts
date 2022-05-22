import { IAuthor, ILocation } from './../../types/types';
import { settingsInitialState } from '../initialStates/settingsInitState';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


  export const settingsSlice = createSlice({
    name: 'settings',
    initialState : settingsInitialState,
    reducers: {
      setIsLoading(state){
        state.isLoading = true
      },
      setName(state, action: PayloadAction<string>){
        state.name = action.payload
      },
      setAuthor(state, action: PayloadAction<IAuthor | null>){
        state.author = action.payload
      },
      setLocation(state, action: PayloadAction<ILocation | null>){
        state.location = action.payload
      },
      setCreatedFrom(state, action: PayloadAction<string>){
        state.createdFrom = action.payload
      },
      setCreatedBefore(state, action: PayloadAction<string>){
        state.createdBefore = action.payload
      },
      setCurrentPage(state, action: PayloadAction<number>){
        state.currentPage = action.payload
      },
      setIsDarkTheme(state, action: PayloadAction<boolean>){
        state.isDarkTheme = action.payload
      },
      setPagesAmount(state, action: PayloadAction<number>){
        state.pagesAmount = Math.ceil( action.payload / state.pageSize)
      },
      setError(state, action: PayloadAction<unknown>){
        state.isLoading = false
        state.error = action.payload
      }
    }
  })

  export default settingsSlice.reducer