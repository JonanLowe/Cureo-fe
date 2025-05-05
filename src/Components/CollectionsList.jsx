import { useEffect, useState, useContext } from "react"
import { getCollections, removeItemFromCollection, addItemToCollection } from "../api/api.js"
import UserContext from "../contexts/userContext.js"
import CollectionCard from "./CollectionCard.jsx"
import CreateCollectionCard from "./CreateCollectionCard.jsx";

export default function collectionsList({item, setShowCollections}){
  const {user, loggedIn} = useContext(UserContext);       
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [updateCollections, setUpdateCollections]= useState(false)
  
  useEffect(()=>{
    if(user){
    setIsLoading(true);
    getCollections(user).then((collections) => {
      setIsLoading(false);
      setCollections(collections);
      }).catch((err) => {if(user) {setIsError(true)}})
  }}, [user, updateCollections])

  function checkCollections(collectionKey){
    return collections[collectionKey].some((element) =>element.item.itemId === item.itemId)
  }

  function handleAddItem (collectionKey){
    addItemToCollection(user, collectionKey, item)
    setShowCollections(false)
  }

  function handleRemoveItem(collectionKey) {
    removeItemFromCollection(user, collectionKey, item)
    setShowCollections(false)
  }
  
  const collectionsList = Object.keys(collections).map(collectionKey=>
    <li className="collections-popup-listitem" key={collectionKey}>
      <CollectionCard collectionName={collectionKey} itemCount={collections[collectionKey].length}/>
      {checkCollections(collectionKey)? <button aria-label={`remove item from collection ${collectionKey}`} className="add-to-collection-button" onClick={()=>{handleRemoveItem(collectionKey)}}>-</button> :
      <button aria-label={`add item to collection ${collectionKey}`} className="add-to-collection-button" onClick={()=>{handleAddItem(collectionKey)}} > + </button>}
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
    return (
      <div className="collections-list" >
        <p>loading collections...</p>
      </div>)
  }

   return (
     <div className="collections-list" >
        <p>create collection option here</p>
        <CreateCollectionCard updateCollections={updateCollections} setUpdateCollections={setUpdateCollections}/>
        <div aria-label="list of collections" className="collections-popup-list-container">
          <ul>
            {collectionsList}
          </ul> 
        </div>
      </div>
  )
}