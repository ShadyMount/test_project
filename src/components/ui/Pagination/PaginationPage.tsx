/* eslint-disable react/jsx-props-no-spreading */
import { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames/bind';
import styles from './PaginationPage.module.scss';

const cx = cn.bind(styles);

export interface PaginationPageProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkTheme: boolean;
}

const PaginationPage: FC<PaginationPageProps> = ({ isDarkTheme, className, ...other }) => (
  <button
    type="button"
    className={cx(
      'pagination-page',
      {
        'pagination-page_dark': isDarkTheme,
      },
      className,
    )}
    {...other}
  />
);

export default PaginationPage;
