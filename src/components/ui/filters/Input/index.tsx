/* eslint-disable react/jsx-props-no-spreading */
import cn from 'classnames/bind';
import { FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Current theme
   */
  isDarkTheme: boolean;
}

const Input: FC<IInput> = ({ isDarkTheme, className, ...other }) => (
  <input
    className={cx(className, 'input', {
      'input_dark': isDarkTheme,
    })}
    {...other}
  />
);

export default Input;
