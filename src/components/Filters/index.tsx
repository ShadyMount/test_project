import {
  FC, useCallback, useEffect, useState,
} from 'react';
import cn from 'classnames/bind';

import { settingsSlice } from '../../store/slices/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPaintings } from '../../store/actions/getPaintings';

import Input from '../ui/filters/Input';
import Range from '../ui/filters/Range';
import Select from '../ui/filters/Select';

import styles from './Filters.module.scss';
import { IAuthor } from '../../types/types';

const cx = cn.bind(styles);

export interface IFilters {
  isDarkTheme: boolean
}

const Filters:FC<IFilters> = ({ isDarkTheme }) => {
  const dispatch = useAppDispatch();

  const {
    setAuthor, setCreatedBefore, setCreatedFrom, setLocation, setName,
  } = settingsSlice.actions;
  const { authors, locations } = useAppSelector((state) => state.paintingsReducer);

  const {
    author, createdBefore, createdFrom, currentPage, location, name, pageSize,
  } = useAppSelector((state) => state.settingsReducer);

  const locationsArr = locations.map((e) => ({ id: e.id, name: e.location }));

  const [isRangeClosed, setIsRangeClosed] = useState(true);
  const [isFiltersChanged, setIsFiltersChanged] = useState(false);
  const [cp, setCp] = useState(currentPage);

  const getData = useCallback(() => {
    if ((isRangeClosed && isFiltersChanged) || cp !== currentPage) {
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
      setCp(currentPage);
    }
  }, [dispatch, name, author,
    location, createdFrom, createdBefore,
    isRangeClosed, currentPage, pageSize, isFiltersChanged, cp]);

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

  const onChangeLocationHandler = (loc: any) => {
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
    getData();
  }, [getData]);

  return (
    <div className={cx('filters')}>

      <Input
        isDarkTheme={isDarkTheme}
        placeholder="Name"
        value={name}
        onChange={onChangeNameHandler}
      />

      <Select
        isDarkTheme={isDarkTheme}
        disabled={false}
        onChange={onChangeAuthorHandler}
        options={authors}
        value={author?.name}
        placeHolder="Author"
        onCrossClicked={onAuthorCrossClickHandler}
      />
      <Select
        isDarkTheme={isDarkTheme}
        disabled={false}
        onChange={onChangeLocationHandler}
        options={locationsArr}
        value={location?.location}
        placeHolder="Location"
        onCrossClicked={onLocationCrossClickHandler}
      />

      <Range
        isDarkTheme={isDarkTheme}
        title="Created"
        onClose={onCloseRangeHandler}
        onOpen={onOpenRangeHandler}
      >
        <div className={cx('filters__range-parent')}>
          <Input
            className={cx('filters__range-children')}
            isDarkTheme={isDarkTheme}
            placeholder="from"
            value={createdFrom}
            onChange={onChangeCreatedFromHandler}
          />
          <div className={cx('filters__range-stick', { 'filters__range-stick_dark': isDarkTheme })} />
          <Input
            className={cx('filters__range-children')}
            isDarkTheme={isDarkTheme}
            placeholder="before"
            value={createdBefore}
            onChange={onChangeCreatedBeforeHandler}
          />
        </div>
      </Range>

    </div>
  );
};

export default Filters;
