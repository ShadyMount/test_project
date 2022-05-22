import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import paintingsReducer from './slices/paintingsSlice';
import settingsReducer from './slices/settingsSlice';


import { save, load } from "redux-localstorage-simple"


export const rootReducer = combineReducers({
  paintingsReducer,
  settingsReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        save({ states: ["settingsReducer"] })
      ),
    preloadedState: load({ states: ["settingsReducer"] })

  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
