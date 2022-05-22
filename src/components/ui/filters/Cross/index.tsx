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

const Cross: FC<TCross> = ({ isSelected, isDarkTheme, className, onClick }) => (
  <div
    className={cx(className, {
      Cross__selected: isSelected,
      Cross__dark: isDarkTheme
    })}
    onClick={onClick}
    >
    <SelectCross />
  </div>
);

export default Cross;