import { Link } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/userContext.js"

export default function Nav(){
  const {user, loggedIn} = useContext(UserContext);

  return (
    <nav id="navbar" className = "nav">
      <section className = "links">
        <Link to="/"> Home </Link>
        <Link to="/ScienceMuseum"> Explore Science Museum Group</Link>
        <Link to="/Europeana"> Explore Europeana Group </Link>
        {loggedIn? <Link to="/usercollections"> My Collections </Link>:null}
      </section>
    </nav>
  )
} 