import { Link } from "react-router-dom"

export default function Home(){
    
   return (   
    <>
      <div style={{"lineHeight":"1.8em"}}>
        <p>Welcome to Cureo</p>
        <p>Search and save artworks and cultural items from thousands of institutions across Europe</p>
        <p>You can browse and search items from the Science Museum Group and the Europeana Group</p>
        <p>Login to save items to your own collections</p>
        <p>Use the links below, or in the navigation bar to get started</p>
      </div>
      <Link to="/ScienceMuseum">
        <button style={{"margin":"10px"}}>Explore Science Musem Group</button>
      </Link>
      <Link to="/Europeana">
        <button style={{"margin":"10px"}}>Explore Europeana Group</button>
      </Link>
    </>
  )
}