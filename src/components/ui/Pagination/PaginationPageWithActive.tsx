/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import cn from 'classnames/bind';
import PaginationPage, { PaginationPageProps } from './PaginationPage';

interface IProps extends PaginationPageProps {
  isActive: boolean;
}

const PaginationPageWithActive: FC<IProps> = ({
  isDarkTheme, isActive, className, ...other
}) => (
  <PaginationPage
    isDarkTheme={isDarkTheme}
    className={cn(className, {
      'pagination-page-With-active': isActive,
      'pagination-page-With-active_dark': isDarkTheme && isActive,
    })}
    {...other}
  />
);

export default PaginationPageWithActive;
