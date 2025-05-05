import { useState } from "react";
import EuropeanaFilterOptions from "./EuropeanaFilterOptions";

export default function EuropeanaFilterField ({appliedFilters, setAppliedFilters, filterOptions, filterName, searchFilters, setSearchFilters}){
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div onClick={()=>{setShowOptions(!showOptions)}}>
        <fieldset aria-label={`Show filters for ${filterName}`}>
              {filterName}
        </fieldset>
      {showOptions? <EuropeanaFilterOptions
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