export default function Pagination({lastPage, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage}){
  const handleItemsPerPage = (e) => {
    setItemsPerPage(e.target.value)   
  }
  
  if (currentPage > lastPage){setCurrentPage(lastPage-1)}

  const sortByOptions = [
     { label: '50', value: 50 },   
     { label: '100', value: 100 },
   ]
  
  const sortByList = sortByOptions.map(option=>
     <option key = {option.value} value = {option.value}> {option.label}</option>
  )
  
  return (
    <section className = "pagination">
      <section aria-label="dropdown options for results per page">
        <label>itemsPerPage: &nbsp;
          <select onChange={handleItemsPerPage} value ={itemsPerPage}>
            {sortByList}
          </select>
        </label>
      </section >
    <div className = "pagination-controls">
      <button className="pagination-button" aria-label="first page button" disabled={currentPage===0} onClick={()=>{setCurrentPage(0)}}>First Page</button>
      <button className="pagination-button" aria-label="previous page button" disabled={currentPage===0} onClick={()=>{setCurrentPage(currentPage-1)}}> {"<"} </button>
      <div className="pagination-current" aria-label="current page"> {currentPage+1} </div>
      <button className="pagination-button" aria-label="next page button"disabled={currentPage+1>=lastPage} onClick={()=>{setCurrentPage(currentPage+1)}}> {">"}</button>
      <button className="pagination-button" aria-label="last page button"disabled={currentPage+1>=lastPage} onClick={()=>{setCurrentPage(lastPage-1)}}>Last Page</button>
    </div>
  </section>
  )
}