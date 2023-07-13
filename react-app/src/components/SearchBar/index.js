import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const history = useHistory();
  const [searchString, setSearchString] = useState("");
  // const [userSearched, setUserSearched] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchString.length === 0) {
      setSearchString("");
      return history.push(`/businesses/search/empty`);
    } else {
      setSearchString("");
      return history.push(`/businesses/search/${searchString}`);
    }
  };

  return (
    <div className="search-container">
      <form className="search-container-form" onSubmit={onSubmit}>
        <input
          className="search-container-input"
          type="text"
          placeholder="American, seafood, cafe"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        ></input>
        <button className="magnifying-css" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
