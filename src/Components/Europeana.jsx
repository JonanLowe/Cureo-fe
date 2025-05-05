import { useState } from "react"
import Pagination from "./Pagination.jsx"
import SearchBox from "./SearchBox.jsx";
import MuseumGroupItems from "./MuseumGroupItems.jsx"
import SMGFilters from "./SMGFilters.jsx";
import EuropeanaFilters from "./EuropeanaFilters.jsx";

export default function Europeana({museumGroup}){
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage]= useState(50);
  const [searchFilters, setSearchFilters] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [availableFilters, setAvailableFilters] = useState([])
  const [lastPage, setLastPage] = useState("")
  
  return (   
    <>
      <h2>Browse and Search The Europeana Group</h2>    
      <div className="pagination" style={{display: 'flex', flexDirection: "row"}}>
        {!isLoading? <SearchBox searchTerm={searchTerm} isLoading={isLoading} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage}/>:null}
        {!isLoading? <button onClick={()=>{setShowFilters(!showFilters)}}>Show Filters</button>:null}
      </div>
      <div className = "master-display">
        <MuseumGroupItems setIsLoading={setIsLoading} isLoading={isLoading} group={museumGroup} setAvailableFilters={setAvailableFilters} searchTerm={searchTerm} searchFilters={searchFilters} setSearchFilters={setSearchFilters} currentPage={currentPage} itemsPerPage={itemsPerPage} setLastPage={setLastPage}/>
        <div className="filters-list">
          {showFilters && museumGroup==="SMG"? <SMGFilters setCurrentPage={setCurrentPage} filters={availableFilters} searchFilters={searchFilters} setSearchFilters={setSearchFilters}/>:null}
          {showFilters && museumGroup==="europeana"? <EuropeanaFilters setCurrentPage={setCurrentPage} filters={availableFilters} searchFilters={searchFilters} setSearchFilters={setSearchFilters}/>:null}
       </div>
     </div>
     {!isLoading? <Pagination itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage}/>:null}
    </>
  )
}