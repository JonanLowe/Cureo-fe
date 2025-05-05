
import './App.css'
import { useState } from 'react';

import Header from './Components/Header'
import Nav from './Components/Nav'
import RoutesComponent from './Components/RoutesComponent.jsx'
import LoginScreen from "./Components/LoginScreen.jsx";

import UserContext from "./contexts/userContext.js";

function App() {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showLogin, setShowLogin]= useState(false);
  
  return (
    <UserContext.Provider value ={{ user, setUser, showLogin, setShowLogin, loggedIn, setLoggedIn}}>
    <main>
      <section className = "top">
        <Header/>
        <Nav/>
      </section>
      <section className = "content">
        {showLogin? <LoginScreen/> : null }
        <RoutesComponent/>
      </section>
    </main>
  </UserContext.Provider>
  )
}

export default App
