import React, { useState } from 'react';
import './SearchBar.css'; // Make sure to create a corresponding CSS file

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  // Handler for when the input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Optionally debounce this call to prevent excessive API calls
    // onSearch(event.target.value);
  };

  // Handler for when the search is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search a GitHub Repository..."
          value={inputValue}
          onChange={handleInputChange}
          // Uncomment the following line to add the search icon inside the input field
          // style={{ backgroundImage: `url(${searchIconUrl})` }}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

