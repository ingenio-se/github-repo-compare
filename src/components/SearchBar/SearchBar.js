import React, { useState } from 'react';
import './SearchBar.css';
import { Search as SearchIcon } from 'react-feather';
import { searchRepositories } from '../../api/apiClient';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  // Handler for when the input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Optionally debounce this call to prevent excessive API calls
  };

  // Function to handle search and fetch data
  const handleSearch = async (searchTerm) => {
    try {
      const data = await searchRepositories(searchTerm);
      console.log(data);
      // Process and use the data as needed
      // For example, update a state variable or pass data to a parent component
    } catch (error) {
      console.error("Error fetching repositories: ", error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  // Handler for when the search is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(inputValue);
  };

  
  return (
    <div className="search-interface">
      <form onSubmit={handleSubmit}>
        <div className="search-box">
                <input type="text" 
                placeholder="Search a GitHub Repository..." 
                value={inputValue}
                onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                <SearchIcon /> {/* Feather Icon for search */}
                </button>
            
        </div>
      </form>
      <p className="search-prompt">
        <SearchIcon className="search-icon" />
        Search for a GitHub repository to populate graph
    </p>
    </div>
  );
};

export default SearchBar;


