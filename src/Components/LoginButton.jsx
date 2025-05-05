import { useContext } from "react";
import UserContext from "../contexts/userContext.js"
import '../dropdownButton.css'

export default function LoginButton(){
  const { setShowLogin } = useContext(UserContext);
  
    return (
      <button aria-labelledby="login" id="login" onClick={()=>{setShowLogin(true)}} className="dropbtn">Login</button>
    )
} 