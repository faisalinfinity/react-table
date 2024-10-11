import { Search as SearchIcon } from "lucide-react";

const Search = ({searchTerm,handleSearch}) => {
  return (
    <>
      <div className="search-container">
        <input
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          placeholder="Search by first name"
          className="search-input"
          aria-label="Search by first name"
        />
        <SearchIcon className="search-icon" size={20} />
      </div>
    </>
  );
};

export default Search;
