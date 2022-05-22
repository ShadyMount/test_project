import classes from './ItemCardStyles.module.css'


interface ItemCardProps {
  imageUrl: string,
  name: string,
  author: string,
  location: string,
  created: number
}


const ItemCard = ({ imageUrl, name, author, location, created }: ItemCardProps) => {


  return (
    <div>
      <img src={imageUrl} className={classes.itemImage} alt={name} />
      <div className={classes.itemDescription} >
        <div className={classes.itemName}>{name}</div>
        <div className={classes.itemInfo}>
        <div><span>Author: </span>{author}</div>
        <div><span>Created: </span>{created}</div>
        <div><span>Location: </span>{location}</div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard