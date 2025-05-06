import { useEffect, useState } from "react"
import { getAllUsers } from "../api/api.js"
import UserCard from "./UserCard.jsx";
import UserLoadingMessage from "./UserLoadingMessage.jsx";

export default function AllUsers(){   
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(()=>{
    setIsLoading(true);
    getAllUsers().then((users) => {
      setIsLoading(false);
      setUsers(users);
      })
      .catch(
        (err) => {setIsError(true),
      setErrorMsg('Sorry - Error getting users')
    })
  }, [])

  const usersList = users.map(user=>
    <li aria-label={`select user ${user.userName}`} key={user._id}>
      <UserCard 
      userName={user.userName}
      collectionsCount={Object.keys(user.collections).length}
      />
    </li>
  ); 

  if (isError) {
    return <p>
      Error getting users
    </p>
  }

  if (isLoading) {
    return <>
    <UserLoadingMessage/>
  </>
  }

  return (   
    <section className = "popup-contents">
      <h2 style={{"lineHeight":"0em"}}>Select a User:</h2>    
      <ul aria-label="list of users" className = "user-list-container" >
        {usersList}
      </ul>
    </section>
  )
}
