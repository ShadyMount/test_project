



import { AppDispatch } from "..";
import { paintingsApi } from "../../services/paintingsApi";
import { paintingsSlice } from "../slices/paintingsSlice";


export const getLocations = () =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(paintingsSlice.actions.setIsLoading())
            const locations = await paintingsApi.fetchLocations()
            dispatch(paintingsSlice.actions.setLocationsLoadingSuccess(locations))
        } catch ({ message }) {
            dispatch(paintingsSlice.actions.setError(message))
        }
    }