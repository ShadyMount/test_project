import { AppDispatch } from '..';
import { paintingsApi } from '../../utils/paintingsApi';
import { paintingsSlice } from '../slices/paintingsSlice';

const getAuthors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(paintingsSlice.actions.setIsLoading());
    const authors = await paintingsApi.fetchAuthors();
    dispatch(paintingsSlice.actions.setAuthorsLoadingSuccess(authors));
  } catch ({ message }) {
    dispatch(paintingsSlice.actions.setError(message));
  }
};

export default getAuthors;
