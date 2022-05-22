import { AppDispatch } from "..";
import { paintingsApi, GetPaintingsQueryParams } from "../../services/paintingsApi";
import { paintingsSlice } from "../slices/paintingsSlice";
import { settingsSlice } from "../slices/settingsSlice";


export const getPaintings = ({ q, authorId, created_gte, created_lte, locationId, _limit, _page }: GetPaintingsQueryParams) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(paintingsSlice.actions.setIsLoading())
            const { data, totalCounts } = await paintingsApi.fetchPaintings({
                q, authorId, created_gte, created_lte, locationId, _limit, _page
            })
            dispatch(paintingsSlice.actions.setPaintingsLoadingSuccess(data))
            dispatch(settingsSlice.actions.setPagesAmount(Number(totalCounts)))
        } catch ({ message }) {
            dispatch(paintingsSlice.actions.setError(message))
        }
    }