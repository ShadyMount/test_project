import cn from 'classnames/bind';
import { useState } from 'react';
import styles from './ItemCard.module.scss';

const cx = cn.bind(styles);

interface ItemCardProps {
  imageUrl: string,
  name: string,
  author: string,
  location: string,
  created: number
}

const ItemCard = ({
  imageUrl, name, author, location, created,
}: ItemCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={cx('item')}>
      <img
        onLoad={() => setIsLoaded(true)}
        src={imageUrl}
        className={cx('item__image', { 'item__image_visible': isLoaded })}
        alt={name}
      />
      {!isLoaded && <div className={cx('item__loader')} />}

      <div className={cx('item__description')}>
        <div className={cx('item__name')}>{name}</div>
        <div className={cx('item__info')}>
          <div>
            <span>Author: </span>
            {author}
          </div>
          <div>
            <span>Created: </span>
            {created}
          </div>
          <div>
            <span>Location: </span>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
