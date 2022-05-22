import { baseURL } from "../../services/axiosInstance"
import { useAppSelector } from "../../store/hooks"
import ItemCard from "../ItemCard/ItemCard"

const Items = () => {


  const { paintings, authors, locations } = useAppSelector(state => state.paintingsReducer)
  console.log(paintings);
  
  return (
    <div className="items">

      {paintings.map(item =>
   
        <ItemCard 
          key={item.id}
          author={authors.find(author => author.id === item.authorId)?.name || 'Unknown author'}
          created={item.created}
          imageUrl={`${baseURL}${item.imageUrl}`}
          location={locations.find(location => location.id === item.locationId)?.location || 'Unknown location'}
          name={item.name}
        />

        )}

    </div>
  )
}


export default Items