



import { AppDispatch } from "..";
import { paintingsApi } from "../../services/paintingsApi";
import { paintingsSlice } from "../slices/paintingsSlice";


export const getAuthors = () =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(paintingsSlice.actions.setIsLoading())
            const authors = await paintingsApi.fetchAuthors()
            dispatch(paintingsSlice.actions.setAuthorsLoadingSuccess(authors))
        } catch ({ message }) {
            dispatch(paintingsSlice.actions.setError(message))
        }
    }