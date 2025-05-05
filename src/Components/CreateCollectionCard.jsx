import { useState, useContext } from "react";
import UserContext from "../contexts/userContext.js"
import { createCollection } from "../api/api.js";

export default function CreateCollectionCard({updateCollections, setUpdateCollections}){
  const {user} = useContext(UserContext);
  const [currentCollectionName, setCurrentCollectionName] = useState("")
  const [isCreating, setIsCreating]= useState(false)

  function handleChange(e) {
    setCurrentCollectionName(e.target.value);
  }
  
  function handleCreate() {
    setIsCreating(true);
    createCollection(user, currentCollectionName)
    .then((response)=>{
      if (response.status === 200){
        setUpdateCollections(!updateCollections)
      }
    })
  } 

  return (       
    <section aria-label="Create a new collection" className="create-collections-card">
      <p className="item-card-name">Create New Collection</p>
      <div>
        <label htmlFor="create-collection-input">
          <input
            type="text"
            id="create-collection-input"
            onChange={handleChange}
            value={currentCollectionName}
          />
          </label>
        <button onClick={()=>{handleCreate()}}>Create</button>
      </div>
    </section>
  )
}