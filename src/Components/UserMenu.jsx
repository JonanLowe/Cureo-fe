import '../dropdownButton.css'
import { Link } from "react-router-dom"
import {useContext, useState} from "react";
import UserContext from "../contexts/userContext.js"

export default function UserMenu(){
  const { user, setUser, setLoggedIn } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false)

  return (
    <section>
      <button aria-label="show user menu" onClick={()=>{setShowMenu(!showMenu)}} >{user}</button>
        {showMenu?
          <div aria-label="user menu" className="dropdown-content">
            <Link to="/usercollections" onClick={()=>{setShowMenu(false)}}>My Collections</Link>
            <a onClick={()=>{setLoggedIn(false), setUser(null)}}>Logout</a>
          </div>
          : null
        }
    </section>
  )
} 