
import { ReactComponent as Logo } from './Logo.svg';
import { ReactComponent as ThemeSwitcherDark } from './ThemeSwitcherDark.svg';
import { ReactComponent as ThemeSwitcherLight } from './ThemeSwitcherLight.svg';

export interface HeaderProps {
  theme: string,
  themeToggler: () => void

}
const AppHeader = ({ theme, themeToggler }: HeaderProps) => {


  return (
    <div className="header">
      <div className="logo_switcher">
        <div className="logo">
          <Logo />
        </div>
        <div className="theme_switcher">
          {
            theme === 'dark'
              ? <ThemeSwitcherLight onClick={themeToggler} />
              : <ThemeSwitcherDark onClick={themeToggler} />
          }
        </div>
      </div>
    </div>
  )
}

export default AppHeader