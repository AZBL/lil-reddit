import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";
import { FcReddit } from "react-icons/fc";
import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <header>
        <Link to="/">
          {" "}
          <h1 className="title">
            {" "}
            <span className="lil">Lil'</span> Reddit
          </h1>
        </Link>
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          <SearchResultsList results={results} />
        </div>
        <div className="icons">
          <Link to="/">
            <FcReddit className="logo" />
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
