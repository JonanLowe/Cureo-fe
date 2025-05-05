import { useContext} from "react";
import UserContext from "../contexts/userContext.js"
import UserMenu from "./UserMenu.jsx";
import LoginButton from "./LoginButton.jsx";

export default function Header(){
  const { loggedIn } = useContext(UserContext);

  return (
    <header className = "header">
      <div className = "header-contents">
        <h2 id="header-text">Cureo</h2> 
        <div className = "login-user-info">
          {loggedIn? <UserMenu/>: <LoginButton/>}
        </div>
      </div>
    </header>
  )
} 