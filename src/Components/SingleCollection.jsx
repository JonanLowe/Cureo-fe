import {useParams} from 'react-router-dom';
import { getSingleCollection } from '../api/api.js';
import ItemCard from './ItemCard.jsx';
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/userContext.js"
import {getThumbnail, getAllThumbnails, getMuseum, getTitle, getType, getId} from "../utils/utils.js"

export default function SingleCollection(){
  const {user, collectionname} = useParams()
    const {loggedIn} = useContext(UserContext);        
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [updateCollection, setUpdateCollection] = useState(false)
    
    useEffect(()=>{
      setIsLoading(true);
      getSingleCollection(user, collectionname).then((collection) => {
        setItems(collection.map((item)=>{return item.item}));
        setIsLoading(false);
        }).catch((err) => {setIsError(true)})
    }, [updateCollection])
   
    const itemsList = items.map(item=>
      <li aria-label={getTitle(item)} key={item.itemId}>
        <ItemCard 
          museumGroup={getMuseumGroup(item)}
          museum={item.museum}
          category={item.category}
          type={item.type}
          id={item.itemId}
          description={item.description}
          thumbnail={item.thumbnail}
          viewingCollection={collectionname}
          setUpdateCollection={setUpdateCollection}
          updateCollection={updateCollection}
        />
      </li>);
         
    if (!loggedIn) {
      return <>
      <p>Login to view collections</p>
      </>
    }
  
    if (isError) {
      return <>
      <p>Error</p>
      </>
    }
    
    if (isLoading) {
      return <p>loading collection...</p>;
    }
  
    return (
        <div>
          <h2>{collectionname}</h2>
           <div className="1-searchgrid o-flex-container">
         <ul className = "list-container">
          {itemsList}
          </ul> 
          </div>
        </div>
    )
  }
 
function getMuseumGroup(item){
    if (item.dataProvider){
      return "Europeana"
    }
    else if (item.museum
    ){
      return "SMG"
    }
    return "No museum information"
}