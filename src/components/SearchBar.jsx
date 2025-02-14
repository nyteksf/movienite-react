import { useEffect, useState } from "react";

import { Search } from "@/components/Icons";

import "@/components/search-bar.css";
import "@/components/landing-page.css";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ searchTitleRef }) => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleChange = (value) => {
    setValue(value);
  };

  useEffect(() => {
    searchTitleRef.current.classList.add("search__title--show");
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim() !== "") {
          navigate(`/discover/search/${encodeURIComponent(value)}`);
        }
      }}
    >
      <div className="search">
        <h1 ref={searchTitleRef} className="search__title">
          START STREAMING NOW
        </h1>
        <div className="search__input--wrapper">
          <input
            className="search__input"
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            name="query"
            placeholder="Enter Movie Title"
          />
          <button className="search__input--btn" type="submit">
            <Search className="fa-magnifying-glass" />
          </button>
        </div>
      </div>
    </form>
  );
};
