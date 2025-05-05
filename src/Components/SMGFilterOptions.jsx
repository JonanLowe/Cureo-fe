import {useState} from "react";

export default function FilterOptions ({appliedFilters, setAppliedFilters, searchFilters, filterName, options, setSearchFilters}){

  function removeString(searchString, substring){
    return searchString.replace(new RegExp(substring, 'g'), '')
  }
  
  const handleChange = (e) => {
    const categoryString = e.target.value
    const filterString = e.target.name
    const checked = e.target.checked
    if (checked) {
      setAppliedFilters([...appliedFilters, filterString]);
      setSearchFilters(searchFilters + '/' +categoryString + '/' + filterString)
    } else {
      setAppliedFilters(appliedFilters.filter((item) => item !== filterString));
      const stringToRemove =  '/' +categoryString + '/' + filterString;
      setSearchFilters((removeString(searchFilters, stringToRemove)))
    }
  }

const subFiltersList = Object.keys(options).map(key => 
  {  
    return (
      <ul>
        <li key={key}>
          <input aria-label={`Checkbox for ${filterName}`}type="checkbox" name={options[key].value} value={filterName} checked={appliedFilters.includes(options[key].value)} onChange={handleChange}/>
            {options[key].value}
            <span> {options[key].count}</span>
        </li>
      </ul>
    )
  }
)

 return (
    <ul className = "list-container">
    {subFiltersList}
    </ul>
 )
}