import cn from 'classnames/bind';
import styles from './Items.module.scss';
import { baseURL } from '../../utils/axiosInstance';
import { useAppSelector } from '../../store/hooks';
import ItemCard from '../ItemCard';

const cx = cn.bind(styles);

const Items = () => {
  const { paintings, authors, locations } = useAppSelector((state) => state.paintingsReducer);

  return (
    <div className={cx('items')}>
      {paintings.map((item) => (
        <ItemCard
          key={item.id}
          author={authors.find((author) => author.id === item.authorId)?.name || 'Unknown author'}
          created={item.created}
          imageUrl={`${baseURL}${item.imageUrl}`}
          location={locations.find((location) => location.id === item.locationId)?.location || 'Unknown location'}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default Items;
