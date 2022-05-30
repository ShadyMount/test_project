import react, { FC } from 'react';
import cn from 'classnames/bind';

import { settingsSlice } from '../../store/slices/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPaintings } from '../../store/actions/getPaintings';

import Input from '../ui/filters/Input';
import Range from '../ui/filters/Range';
import Select from '../ui/filters/Select';

import styles from './Filters.module.scss';

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

  const [isRangeClosed, setIsRangeClosed] = react.useState(true);
  const [isRangeChanged, setIsRangeChanged] = react.useState(false);

  const getData = react.useCallback(() => {
    if (isRangeClosed && isRangeChanged) {
      dispatch(getPaintings({
        q: name,
        authorId: author?.id,
        locationId: location?.id,
        created_gte: createdFrom !== '' ? createdFrom : null,
        created_lte: createdBefore !== '' ? createdBefore : null,
        _page: currentPage,
        _limit: pageSize,
      }));
      setIsRangeChanged(false);
    }
  }, [dispatch, name, author,
    location, createdFrom, createdBefore,
    isRangeClosed, currentPage, pageSize]);

  const onChangeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value !== name) {
      dispatch(setName(e.target.value));
    }
  };

  const onChangeCreatedFromHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setCreatedFrom(e.target.value));
    setIsRangeChanged(true);
  };

  const onChangeCreatedBeforeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setCreatedBefore(e.target.value));
    setIsRangeChanged(true);
  };

  react.useEffect(() => {
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
        onChange={(auth) => dispatch(setAuthor(auth))}
        options={authors}
        value={author?.name}
        placeHolder="Author"
        onCrossClicked={() => dispatch(setAuthor(null))}
      />
      <Select
        isDarkTheme={isDarkTheme}
        disabled={false}
        onChange={(loc) => dispatch(setLocation({ id: loc.id, location: loc.name }))}
        options={locationsArr}
        value={location?.location}
        placeHolder="Location"
        onCrossClicked={() => dispatch(setLocation(null))}
      />

      <Range
        isDarkTheme={isDarkTheme}
        title="Created"
        onClose={() => setIsRangeClosed(true)}
        onOpen={() => setIsRangeClosed(false)}
      >
        <div className={cx('filters__rangeParent')}>
          <Input
            className={cx('filters__rangeChildren')}
            isDarkTheme={isDarkTheme}
            placeholder="from"
            value={createdFrom}
            onChange={onChangeCreatedFromHandler}
          />
          <div className={cx('filters__rangeStick', { 'filters__rangeStick--dark': isDarkTheme })} />
          <Input
            className={cx('filters__rangeChildren')}
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

export default react.memo(Filters);
