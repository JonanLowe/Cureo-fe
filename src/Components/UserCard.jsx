import { useContext } from "react";
import UserContext from "../contexts/userContext.js"

export default function UserCard({userName, collectionsCount}){
  const {setUser} = useContext(UserContext);

  return (
    <section aria-label={`Select User ${userName}`} onClick={()=>{setUser(userName)}}>
      <button>
        <p>{userName}</p>
        <p>Collections: {collectionsCount}</p>
      </button>
    </section>
  )
}