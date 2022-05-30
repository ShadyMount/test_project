import React, { ChangeEventHandler, FC } from 'react';
import cn from 'classnames/bind';
import { IAuthor, ILocation } from '../../types/types';
import styles from './Filters.module.scss';

import Input from '../ui/filters/Input';
import Range from '../ui/filters/Range';
import Select from '../ui/filters/Select';

interface IFilters {
  isDarkTheme: boolean,
  nameInputValue: string,
  onChangeNameHandler: React.ChangeEventHandler<HTMLInputElement>,
  onChangeAuthorHandler: (auth: IAuthor) => void,
  authors: IAuthor[],
  author: IAuthor | null,
  onAuthorCrossClickHandler: () => void,
  onChangeLocationHandler: (loc: any) => void,
  locations: ILocation[],
  location: ILocation | null,
  onLocationCrossClickHandler: () => void,
  onCloseRangeHandler: () => void,
  onOpenRangeHandler: () => void,
  createdFromInputValue: string,
  onChangeCreatedFromHandler: ChangeEventHandler<HTMLInputElement>,
  createdBeforeInputValue: string,
  onChangeCreatedBeforeHandler: ChangeEventHandler<HTMLInputElement>,
}

const cx = cn.bind(styles);

const Filters:FC<IFilters> = ({
  isDarkTheme, nameInputValue, onChangeNameHandler, onChangeAuthorHandler,
  authors, author, onAuthorCrossClickHandler, onChangeLocationHandler,
  locations, location, onLocationCrossClickHandler, onCloseRangeHandler,
  onOpenRangeHandler, createdFromInputValue, onChangeCreatedFromHandler,
  createdBeforeInputValue, onChangeCreatedBeforeHandler,
}) => {
  const locationsArr = locations.map((e) => ({ id: e.id, name: e.location }));

  return (
    <div className={cx('filters')}>

      <Input
        isDarkTheme={isDarkTheme}
        placeholder="Name"
        value={nameInputValue}
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
            value={createdFromInputValue}
            onChange={onChangeCreatedFromHandler}
          />
          <div className={cx('filters__range-stick', { 'filters__range-stick_dark': isDarkTheme })} />
          <Input
            className={cx('filters__range-children')}
            isDarkTheme={isDarkTheme}
            placeholder="before"
            value={createdBeforeInputValue}
            onChange={onChangeCreatedBeforeHandler}
          />
        </div>
      </Range>

    </div>
  );
};

export default Filters;
