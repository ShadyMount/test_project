import cn from 'classnames/bind';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { settingsSlice } from '../../store/slices/settingsSlice';
import Pagination from '../ui/Pagination';

import styles from './Paginator.module.scss';

const cx = cn.bind(styles);

export interface PaginatorProps {
  theme: boolean
}

const Paginator = ({ theme }: PaginatorProps) => {
  const { currentPage, pagesAmount } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();

  return (
    <div className={cx('paginator')}>
      <Pagination
        currentPage={Number(currentPage)}
        onChange={(page) => dispatch(settingsSlice.actions.setCurrentPage(page))}
        pagesAmount={Number(pagesAmount)}
        isDarkTheme={theme}
      />
    </div>
  );
};

export default Paginator;
