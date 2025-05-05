export default function EuropeanaFilterOptions ({appliedFilters, setAppliedFilters, searchFilters, filterName, options, setSearchFilters}){

  function removeString(searchString, substring){
    return searchString.replace(new RegExp(substring, 'g'), '')
  }

  const handleChange = (e) => {
    let categoryString = ""
    if (filterName==="Museum"){categoryString = "DATA_PROVIDER"}
    if (filterName==="Country"){categoryString = "COUNTRY"}
    if (filterName==="Type"){categoryString = "TYPE"}
    const filterString = e.target.value
    const checked = e.target.checked
    if (checked) {
      setAppliedFilters([...appliedFilters, filterString]);
      setSearchFilters(searchFilters + "&qf=" + categoryString + ':' + '"' + filterString + '"')
    } else {
      setAppliedFilters(appliedFilters.filter((item) => item !== filterString));
      const stringToRemove =  "&qf=" + categoryString + ':' + '"' + filterString + '"';
      setSearchFilters((removeString(searchFilters, stringToRemove)))
    }
  }

  const subFiltersList = options.map(option => {  
    return (
      <ul>
        <li key={option.label}>
          <input aria-label={`Checkbox for ${option.label}`} type="checkbox" name={option.label} value={option.label} checked={appliedFilters.includes(option.label)} onChange={handleChange}/>
            {option.label}
            <span aria-label="number of results" style={{"color":"grey"}}>- {option.count}</span>
        </li>
      </ul>
    )}
  )

  return (
    <ul aria-label="list of available filters" className = "list-container">
      {subFiltersList}
    </ul>
  )
}