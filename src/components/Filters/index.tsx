import {
  FC, useEffect, useState,
} from 'react';

import { settingsSlice } from '../../store/slices/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPaintings } from '../../store/actions/getPaintings';

import { IAuthor } from '../../types/types';
import Filters from './Filters';

const FiltersContainer:FC = () => {
  const dispatch = useAppDispatch();
  const {
    setAuthor, setCreatedBefore, setCreatedFrom, setLocation, setName,
  } = settingsSlice.actions;
  const { authors, locations } = useAppSelector((state) => state.paintingsReducer);
  const {
    author, createdBefore, createdFrom, currentPage, location, name, pageSize, isDarkTheme,
  } = useAppSelector((state) => state.settingsReducer);

  const [isRangeClosed, setIsRangeClosed] = useState(true);
  const [isFiltersChanged, setIsFiltersChanged] = useState(false);
  const [prevPage, setPrevPage] = useState(currentPage);

  const onChangeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value !== name) {
      dispatch(setName(e.target.value));
      setIsFiltersChanged(true);
    }
  };

  const onChangeAuthorHandler = (auth:IAuthor) => {
    if (auth !== author) {
      dispatch(setAuthor(auth));
      setIsFiltersChanged(true);
    }
  };

  const onChangeLocationHandler = (loc: { id: number, name: string }) => {
    if (loc.id !== location?.id) {
      dispatch(setLocation({ id: loc.id, location: loc.name }));
      setIsFiltersChanged(true);
    }
  };

  const onChangeCreatedFromHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value !== createdFrom) {
      dispatch(setCreatedFrom(e.target.value));
      setIsFiltersChanged(true);
    }
  };

  const onChangeCreatedBeforeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value !== createdBefore) {
      dispatch(setCreatedBefore(e.target.value));
      setIsFiltersChanged(true);
    }
  };

  const onAuthorCrossClickHandler = () => {
    dispatch(setAuthor(null));
    setIsFiltersChanged(true);
  };

  const onLocationCrossClickHandler = () => {
    dispatch(setLocation(null));
    setIsFiltersChanged(true);
  };

  const onCloseRangeHandler = () => {
    setIsRangeClosed(true);
  };

  const onOpenRangeHandler = () => {
    setIsRangeClosed(false);
  };

  useEffect(() => {
    if ((isRangeClosed && isFiltersChanged) || prevPage !== currentPage) {
      dispatch(getPaintings({
        q: name,
        authorId: author?.id,
        locationId: location?.id,
        created_gte: createdFrom !== '' ? createdFrom : null,
        created_lte: createdBefore !== '' ? createdBefore : null,
        _page: currentPage,
        _limit: pageSize,
      }));
      setIsFiltersChanged(false);
      setPrevPage(currentPage);
    }
  }, [dispatch, name, author,
    location, createdFrom, createdBefore,
    isRangeClosed, currentPage, pageSize, isFiltersChanged, prevPage]);

  return (
    <Filters
      author={author}
      authors={authors}
      createdBeforeInputValue={createdBefore}
      createdFromInputValue={createdFrom}
      isDarkTheme={isDarkTheme}
      location={location}
      locations={locations}
      nameInputValue={name}
      onAuthorCrossClickHandler={onAuthorCrossClickHandler}
      onChangeAuthorHandler={onChangeAuthorHandler}
      onChangeCreatedBeforeHandler={onChangeCreatedBeforeHandler}
      onChangeCreatedFromHandler={onChangeCreatedFromHandler}
      onChangeLocationHandler={onChangeLocationHandler}
      onChangeNameHandler={onChangeNameHandler}
      onCloseRangeHandler={onCloseRangeHandler}
      onLocationCrossClickHandler={onLocationCrossClickHandler}
      onOpenRangeHandler={onOpenRangeHandler}
    />
  );
};

export default FiltersContainer;
