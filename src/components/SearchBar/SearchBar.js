import React, { useState } from 'react';
import './SearchBar.css';
import { Search as SearchIcon, Trash } from 'react-feather';
import { searchRepositories, fetchCommitActivity, fetchCommentsForRepo } from '../../api/apiClient';
import RepoGraph from '../RepoGraph/RepoGraph';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { analyzeSentiment } from '../../api/sentimentService';

/**
 * Converts an ISO date string to a human-readable time-ago format.
 * @param {string} dateString - The ISO date string.
 * @returns {string} A formatted time-ago string.
 */
const formatTimeAgo = (dateString) => {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
};

/**
 * SearchBar Component
 * Renders a search bar for GitHub repositories, displays a list of selected repositories,
 * and provides options to view commit activity, analyze sentiment, and remove repositories.
 */
const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);

  /**
   * Handles changes in the search input, fetching repository suggestions.
   * @param {Event} event - The input change event.
   */
  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    if (searchTerm.length > 2) {
      try {
        const data = await searchRepositories(searchTerm);
        setSuggestions(data.items || []);
      } catch (error) {
        console.error("Error fetching repositories: ", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  /**
   * Generates a random hexadecimal color.
   * @returns {string} A random hexadecimal color string.
   */
  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padEnd(6, '0');
  };

  /**
   * Handles selection of a repository from suggestions. Fetches additional data and
   * adds the repository to the selected list.
   * @param {Object} repo - The selected repository object.
   */
  const handleSuggestionClick = async (repo) => {
    if (!selectedRepos.find((selectedRepo) => selectedRepo.id === repo.id)) {
      try {
        const commitActivity = await fetchCommitActivity(repo.full_name);
        const commentsText = await fetchCommentsForRepo(repo.full_name);
        const sentimentScore = await analyzeSentiment(commentsText);
        
        const repoWithDetails = {
          ...repo,
          commitActivity,
          color: generateRandomColor(),
          sentiment: sentimentScore
        };
        
        setSelectedRepos(prevRepos => [...selectedRepos, repoWithDetails]);
      } catch (error) {
        console.error("Error fetching commit activity:", error);
      }
    }
    setSuggestions([]);
    setInputValue('');
  };

  /**
   * Submits the search form, triggering a search operation.
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(inputValue);
  };

  /**
   * Renders a repository item for display in suggestions.
   * @param {string} fullName - The full name of the repository.
   * @returns {JSX.Element} The JSX element for the repository item.
   */
  const renderSuggestionItem = (fullName) => {
    const [user, repo] = fullName.split('/');
    return (<>{user} / <strong>{repo}</strong></>);
  };

  /**
   * Removes a repository from the selected list.
   * @param {number} repoId - The ID of the repository to remove.
   */
  const handleRemoveRepo = (repoId) => {
    setSelectedRepos(selectedRepos.filter(repo => repo.id !== repoId));
  };

  /**
   * Formats the repository star count for display.
   * @param {number} count - The star count.
   * @returns {string} Formatted star count.
   */
  function formatStars(count) {
    return count < 1000 ? count.toString() : (count / 1000).toFixed(1) + 'k';
  }

  return (
    <div className="search-interface">
      <form onSubmit={handleSubmit}>
        <div className="search-box">
          <input type="text" 
                 placeholder="Search a GitHub Repository..." 
                 value={inputValue}
                 onChange={handleInputChange} />
          <button type="submit" className="search-button">
            <SearchIcon />
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
                ⭐ {formatStars(repo.stargazers_count)} Updated {formatTimeAgo(repo.updated_at)}
              </span>
              {repo.sentiment > 0 ? '😊' : repo.sentiment < 0 ? '😟' : '😐'}
            </div>
            <button className="remove-repo-button" onClick={() => handleRemoveRepo(repo.id)}>
              <Trash size={16} />
            </button>
            <RepoGraph selectedRepos={selectedRepos} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
