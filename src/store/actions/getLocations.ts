import { AppDispatch } from '..';
import { paintingsApi } from '../../utils/paintingsApi';
import { paintingsSlice } from '../slices/paintingsSlice';

const getLocations = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(paintingsSlice.actions.setIsLoading());
    const locations = await paintingsApi.fetchLocations();
    dispatch(paintingsSlice.actions.setLocationsLoadingSuccess(locations));
  } catch ({ message }) {
    dispatch(paintingsSlice.actions.setError(message));
  }
};

export default getLocations;
