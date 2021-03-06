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
      'pagination-page-with-active': isActive && !isDarkTheme,
      'pagination-page-with-active_dark': isDarkTheme && isActive,
    })}
    {...other}
  />
);

export default PaginationPageWithActive;
