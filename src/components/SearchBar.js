import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { SlClose } from "react-icons/sl";

const SearchBar = ({ setResults }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    if (searchInput.trim() === "") {
      setResults([]);
      return;
    }
    axios
      .get(
        `https://www.reddit.com/api/subreddit_autocomplete.json?query=${e.target.value}`
      )
      .then((response) => {
        const results = response.data.subreddits;
        setResults(results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clearInput = () => {
    setSearchInput("");
    setResults([]);
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Search Lil' Reddit..."
        value={searchInput}
        onChange={handleChange}
      />
      {searchInput.length === 0 ? (
        <FaSearch id="search-icon" />
      ) : (
        <SlClose id="clear-search-icon" onClick={clearInput} />
      )}
    </div>
  );
};

export { SearchBar };
