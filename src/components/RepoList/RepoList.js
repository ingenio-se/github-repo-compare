import React from 'react';
import './RepoList.css'; // Styles for the repository list

/**
 * RepoList Component
 * 
 * This component renders a list of repositories. Each repository can be removed from the list
 * using the provided 'Remove' button.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.repos - Array of repository objects to be listed.
 * @param {Function} props.onRemoveRepo - Function to call when a repository is removed.
 * @returns {React.Component} - The rendered list of repositories.
 */
const RepoList = ({ repos, onRemoveRepo }) => {
  return (
    <ul className="repo-list">
      {repos.map((repo, index) => (
        <li key={repo.id} className="repo-list-item">
          {/* Color indicator for each repository */}
          <span className="repo-color-indicator" style={{ backgroundColor: repo.color }} />
          {/* Repository name */}
          {repo.name}
          {/* Button to remove repository from the list */}
          <button onClick={() => onRemoveRepo(repo.id)} className="remove-repo-button">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
