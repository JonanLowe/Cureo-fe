import { Route, Routes } from 'react-router-dom'

import Home from './Home.jsx'
import SingleItem from './SingleItem.jsx'
import AllUsers from './AllUsers.jsx';
import UserCollections from './UserCollections.jsx'
import SingleCollection from './SingleCollection.jsx';
import ErrorPage from './ErrorPage.jsx'
import Europeana from './Europeana.jsx'
import SMG from './SMG.jsx'

export default function RoutesComponent() {

  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/sciencemuseum" element={<SMG museumGroup={"SMG"} homeSearchTerm={""}/> }/>
        <Route path="/europeana" element={<Europeana museumGroup={"europeana"}/> }/>
        <Route path="/items/:museumGroup/:type/:id" element={<SingleItem/>}/>
        <Route path="/allusers" element={<AllUsers/>}/>
        <Route path="/usercollections" element={<UserCollections/>}/>
        <Route path="/users/:user/collections/:collectionname" element={<SingleCollection/>}/>
        <Route path="/*" element={<ErrorPage/>}/> 
    </Routes>
  )
}
