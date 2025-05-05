import {Link} from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/userContext.js"

export default function CollectionCard({collectionName, itemCount}){
  const {user} = useContext(UserContext);

  return (
    <section className="collections-card">
      <Link to={`/users/${user}/collections/${collectionName}`}>          
        <p className="item-card-name">{collectionName}</p>
        <div className="item-card-info-container">
          {itemCount? <p className="item-card-info-text">collection Length: {itemCount}</p>: null}
        </div>
      </Link>
    </section>
  )
}