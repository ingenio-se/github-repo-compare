import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { Search as SearchIcon } from 'react-feather';
import { Trash } from 'react-feather';
import { searchRepositories } from '../../api/apiClient';
import { fetchCommitActivity } from '../../api/apiClient';
import RepoGraph from '../RepoGraph/RepoGraph'; 
import { formatDistanceToNow, parseISO } from 'date-fns';

const formatTimeAgo = (dateString) => {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  };

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
 
// Function to generate a random color in hexadecimal format
const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
};

// Handler for when a suggestion is clicked
const handleSuggestionClick = async (repo) => {
  // Check if the repo is already selected
  if (!selectedRepos.find((selectedRepo) => selectedRepo.id === repo.id)) {
    try {
        const commitActivity = await fetchCommitActivity(repo.full_name);
        // Assuming commitActivity is an array of 52 weeks of activity
        const repoWithCommitData = {
          ...repo,
          commitActivity,
          color: generateRandomColor() // Add a random color
        };
        setSelectedRepos([...selectedRepos, repoWithCommitData]);
      } catch (error) {
        console.error("Error fetching commit activity:", error);
      }
  }
  // Clear the suggestions to hide the list
  setSuggestions([]);
  setInputValue(''); // Optionally clear the input
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
  const handleRemoveRepo = (repoId) => {
    setSelectedRepos(selectedRepos.filter(repo => repo.id !== repoId));
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
      {selectedRepos.length === 0 && (
        <p className="search-prompt">
          <SearchIcon className="search-icon" />
          Search for a GitHub repository to populate graph
        </p>
      )}
    <div className="selected-repos">
        {selectedRepos.map((repo, index) => (
          <div key={index} className="selected-repo" style={{ borderLeft: `4px solid ${repo.color}` }}>
             <div className="repo-details">
                <span>{renderSuggestionItem(repo.full_name)}</span>
                <span className="repo-stars">
                ⭐ {repo.stargazers_count} Updated {formatTimeAgo(repo.updated_at)}
                </span>
            </div>
            <button className="remove-repo-button" onClick={() => handleRemoveRepo(repo.id)}>
            <Trash size={16} />
            </button>
            <RepoGraph repo={repo} /> {/* Pass the repo as a prop to the RepoGraph component */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;


