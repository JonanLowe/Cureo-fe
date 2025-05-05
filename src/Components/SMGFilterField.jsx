import { useState } from "react";
import FilterOptions from "./SMGFilterOptions";

export default function FilterField ({appliedFilters, setAppliedFilters, filterOptions, filterName, searchFilters, setSearchFilters}){
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div  onClick={()=>{setShowOptions(!showOptions)}}>
      <fieldset aria-label={`Show filters for ${filterName}`}>
        {filterName}
      </fieldset>
      {showOptions? <FilterOptions
        appliedFilters={appliedFilters}
        setAppliedFilters={setAppliedFilters}
        searchFilters={searchFilters}
        filterName={filterName}
        options={filterOptions}
        setSearchFilters={setSearchFilters}/>
        :null
      }
    </div>
  )
}