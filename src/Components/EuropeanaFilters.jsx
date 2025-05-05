import EuropeanaFilterField from "./EuropeanaFilterField.jsx"
import {useState} from "react"

export default function EuropeanaFilters({setCurrentPage, filters, searchFilters, setSearchFilters}){
  const [appliedFilters, setAppliedFilters] = useState([])

  const filtersList = filters.map(filter => 
  { 
    if(filter.name==="DATA_PROVIDER" || filter.name==="COUNTRY" || filter.name==="TYPE"){
      let filterName = ""
      if(filter.name==="DATA_PROVIDER"){filterName = "Museum"}
      if(filter.name==="COUNTRY"){filterName = "Country"}
      if(filter.name==="TYPE"){filterName = "Type"}
      return (
        <li key={filter.fields.label} className="list-container">
          <EuropeanaFilterField appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} filterName={filterName} filterOptions={filter.fields} searchFilters={searchFilters} setSearchFilters={setSearchFilters}/>
        </li>        
      )  
    }
  }
)

return (
  <ul aria-label="list of filter categories" className = "sub-filters-list">
    <button aria-label="clear filters button" onClick={()=>{setSearchFilters(""), setAppliedFilters([]), setCurrentPage(0)}}>clear Filters</button>
    {filtersList}
  </ul> 
  )
}