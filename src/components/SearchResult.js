import React from "react";
import { Link } from "react-router-dom";

export const SearchResult = ({ result }) => {
  return (
    <Link to={`subreddit/${result}`} className="search-result-container">
      <div className="search-result">
        r/
        {result}
      </div>
    </Link>
  );
};
