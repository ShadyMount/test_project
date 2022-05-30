import { FC, useCallback, useEffect } from 'react';
import cn from 'classnames/bind';
import styles from './App.module.scss';

import { settingsSlice } from './store/slices/settingsSlice';
import { getPaintings } from './store/actions/getPaintings';
import { useAppDispatch, useAppSelector } from './store/hooks';
import getLocations from './store/actions/getLocations';
import getAuthors from './store/actions/getAuthors';

import {
  AppHeader, Filters, Items, Paginator,
} from './components';

const cx = cn.bind(styles);

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkTheme } = useAppSelector((state) => state.settingsReducer);
  const { isLoading } = useAppSelector((state) => state.paintingsReducer);

  const initApp = useCallback(() => {
    dispatch(getPaintings({}));
    dispatch(getLocations());
    dispatch(getAuthors());
  }, [dispatch]);

  const themeToggler = () => {
    dispatch(settingsSlice.actions.setIsDarkTheme(!isDarkTheme));
  };

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <div className={cx('wrapper', { 'wrapper--dark': isDarkTheme })}>
      <div className={cx('wrapper__container')}>
        <AppHeader theme={isDarkTheme} themeToggler={themeToggler} />
        <Filters isDarkTheme={isDarkTheme} />
        {
          isLoading
            ? <div>Загрузка...</div>
            : <Items />
        }
        <Paginator theme={isDarkTheme} />
      </div>
    </div>
  );
};

export default App;
