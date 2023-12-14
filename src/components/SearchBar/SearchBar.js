import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { Search as SearchIcon } from 'react-feather';
import { searchRepositories } from '../../api/apiClient';
import RepoGraph from '../RepoGraph/RepoGraph'; 

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);

  // Handler for when the input changes
  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    // Optionally debounce this call to prevent excessive API calls
    if (searchTerm.length > 2) {
        try {
          const data = await searchRepositories(searchTerm);
          setSuggestions(data.items || []); // Assuming the API client returns the correct format
        } catch (error) {
          console.error("Error fetching repositories: ", error);
          // Handle error (e.g., show a notification to the user)
          setSuggestions([]); // Clear suggestions on error
        }
      } else {
        setSuggestions([]); // Clear suggestions if searchTerm is too short
    }
};
 // Handler for when a suggestion is clicked
 const handleSuggestionClick = (repo) => {
    // Check if the repo is already selected
    if (!selectedRepos.find((selectedRepo) => selectedRepo.id === repo.id)) {
      setSelectedRepos([...selectedRepos, repo]);
    }
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
  const renderSuggestionItem = (fullName) => {
    const [user, repo] = fullName.split('/');
    return (
      <>
        {user} / <strong>{repo}</strong>
      </>
    );
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
                {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((repo, index) => (
                    <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(repo)}>
                        {renderSuggestionItem(repo.full_name)}
                    </li>
                    ))}
                </ul>
                )}
        </div>

      </form>
      <p className="search-prompt">
        <SearchIcon className="search-icon" />
        Search for a GitHub repository to populate graph
    </p>
    <div className="selected-repos">
        {selectedRepos.map((repo, index) => (
          <div key={index} className="selected-repo" style={{ borderLeft: `4px solid ${repo.color}` }}>
            <span>{repo.full_name}</span>
            <RepoGraph repo={repo} /> {/* Pass the repo as a prop to the RepoGraph component */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;


