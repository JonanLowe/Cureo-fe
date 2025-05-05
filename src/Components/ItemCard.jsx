import {Link} from "react-router-dom"
import { useState, useContext } from "react";
import UserContext from "../contexts/userContext.js"
import { removeItemFromCollection } from "../api/api.js";
import CollectionsList from "./CollectionsList.jsx";
import Placeholder from "./Placeholder.jsx";

export default function ItemCard(props){
  const {updateCollection, viewingCollection, setUpdateCollection, type, museumGroup, museum, category, id, description, thumbnail} = props
  const {user, loggedIn} = useContext(UserContext);
  const [showCollections, setShowCollections] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isError, setIsError] = useState(false)
  let linkString = ""
  if (type !== "europeana") {linkString = `/items/${museumGroup}/${type}/${id}`}
  if (type === "europeana") {linkString = `/items/${type}${id}`}
  
  const item = {
        museumGroup: museumGroup,
        museum: museum,
        type: type,
        itemId: id,
        category: category,
        description: description,
        thumbnail: thumbnail,
    }

  function handleShowCollections() {
      setShowCollections(!showCollections)        
  }

  function handleRemoveItem() {
    setIsDeleting(true);
    removeItemFromCollection(user, viewingCollection, item)
    .then((response)=>{if (response.data.modifiedCount === 1){
      setUpdateCollection(!updateCollection)}
      else {
      setIsError(true)
      }
    })
  }

  if (isError) {
    return <>
    <p>Error</p>
    </>
  }

  return (
    <>
      <section aria-label={`information about ${description}`}className="item-card">
        <Link to={linkString}>
          {thumbnail === "no thumbnail" || thumbnail === "src/assets/gradient.jpg"? <Placeholder text={description}/> :<img src={thumbnail} alt={description} className="thumbnail"></img>}
        </Link>
        <div className="item-card-lower">
          <Link to={linkString}>
          <div>
            <p className="item-card-name">{description}</p>
            <p className="item-card-info-text">Museum: {museum}</p>             
          </div>
          </Link>
          <div>
            {!viewingCollection && loggedIn? <button className="add-to-collection-button" onClick={()=>{handleShowCollections()}}>+</button>:null}
            {viewingCollection? <button className="add-to-collection-button" onClick={()=>{handleRemoveItem()}}>{isDeleting ? "..." : "-"}</button>:null}
          </div>
        </div>
        <div className="collections-popup" >
          {showCollections? <CollectionsList setShowCollections={setShowCollections} item={item}/>:null}
        </div>
      </section>
    </>      
  )
}