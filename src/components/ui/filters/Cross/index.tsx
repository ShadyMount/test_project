/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import { FC, MouseEventHandler } from 'react';
import cn from 'classnames/bind';
import { ReactComponent as SelectCross } from '../../images/cross.svg';
import styles from './Cross.module.scss';

export type TCross = {
  isSelected: boolean;
  isDarkTheme: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>
};

const cx = cn.bind(styles);

const Cross: FC<TCross> = ({
  isSelected, isDarkTheme, className, onClick,
}) => (
  <div
    className={cx(className, {
      Cross__selected: isSelected,
      Cross__dark: isDarkTheme,
    })}
    onClick={onClick}
  >
    <SelectCross />
  </div>
);

export default Cross;
