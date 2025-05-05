import { useState } from "react";

const SearchBox = ({searchTerm, setSearchTerm, setCurrentPage}) => {
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

  function handleChange(e) {
    setCurrentSearchTerm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(currentSearchTerm);
    setCurrentPage(0);
  }

  return (
    <section>
      <form>
        <label htmlFor="search-input"></label>
        <input
          aria-label="search input box"
          type="text"
          id="search-input"
          onChange={handleChange}
          value={currentSearchTerm}
        />
        <button aria-labelledby="searchButton" id="searchButton" onClick={handleSubmit}>Search</button>
        <label htmlFor="search-input"></label>
      </form>
    </section>
  );
};

export default SearchBox;
