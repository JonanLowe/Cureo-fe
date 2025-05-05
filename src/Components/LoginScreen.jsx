import {useContext} from "react";
import UserContext from "../contexts/userContext.js"
import AllUsers from "./AllUsers.jsx";

export default function LoginScreen(){
  const {user, setShowLogin, setUser, setLoggedIn } = useContext(UserContext); 
  
  return (
    <div aria-label="login menu" className = "popup">
      <div aria-label="login screen" className="popup-inner">
        <AllUsers setUser={setUser}/>
          <button id="close" aria-labelledby="close" className="close-button" onClick={()=>{setShowLogin(false), setUser(null)}}>cancel</button>
          <button id="login" aria-labelledby="login" className="login-button" onClick={()=>{setLoggedIn(true), setShowLogin(false)}} disabled={!user}>{user? <>Login as {user}</>: <>No User Selected</>}</button>
      </div>
    </div>
  )
} 