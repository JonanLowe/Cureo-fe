import { useState } from "react"
import FilterField from "./SMGFilterField.jsx"

export default function SMGFilters({setCurrentPage, filters, searchFilters, setSearchFilters}){

console.log(filters, "filters from SMG Filters")
  const [appliedFilters, setAppliedFilters] = useState([])

  const filtersList =Object.keys(filters).map(key => 
  {
    if(key==="category" || key==="museum"){
       return (
          <li key={key} className="list-container">
          <FilterField appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} filterName={key} filterOptions={filters[key]} searchFilters={searchFilters} setSearchFilters={setSearchFilters}/>
          </li>
       )  
    }
  }
)

return (
    <ul className="sub-filters-list">
      <button aria-label="clear filters button" onClick={()=>{setSearchFilters(""), setAppliedFilters([]), setCurrentPage(0)}}>clear Filters</button>
    {filtersList}
    </ul> 
)
}