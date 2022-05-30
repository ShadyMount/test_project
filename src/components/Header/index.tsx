import cn from 'classnames/bind';
import { ReactComponent as Logo } from './images/Logo.svg';
import { ReactComponent as ThemeSwitcherDark } from './images/ThemeSwitcherDark.svg';
import { ReactComponent as ThemeSwitcherLight } from './images/ThemeSwitcherLight.svg';
import styles from './AppHeader.module.scss';

const cx = cn.bind(styles);

export interface HeaderProps {
  theme: boolean,
  themeToggler: () => void
}

const AppHeader = ({ theme, themeToggler }: HeaderProps) => (
  <div className={cx('header')}>
    <Logo className={cx('header__logo')} />
    <div className={cx('header__themeToggler')}>
      {
        theme
          ? <ThemeSwitcherLight onClick={themeToggler} />
          : <ThemeSwitcherDark onClick={themeToggler} />
      }
    </div>
  </div>

);

export default AppHeader;
