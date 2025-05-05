import { useEffect, useState } from "react"
import { getCollections } from "../api/api.js"
import CollectionCard from "./CollectionCard.jsx"
import CreateCollectionCard from "./CreateCollectionCard.jsx";

import { useContext } from "react";
import UserContext from "../contexts/userContext.js"

export default function UserCollections(){
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
  
  const collectionsList = Object.keys(collections).map(collectionKey=>
    <li key={collectionKey}>
      <CollectionCard collectionName={collectionKey} itemCount={collections[collectionKey].length}/>
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
    return <p>loading collections...</p>;
  }

   return (
      <div className="center">
        <h2>{user}'s collections:</h2>      
        <CreateCollectionCard updateCollections={updateCollections} setUpdateCollections={setUpdateCollections}/>
          <ul className = "collections-list-container">
            {collectionsList}
          </ul> 
      </div>
  )
}