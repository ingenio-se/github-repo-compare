import React from 'react';
import './RepoList.css'; // Make sure to create a corresponding CSS file

const RepoList = ({ repos, onRemoveRepo }) => {
  return (
    <ul className="repo-list">
      {repos.map((repo, index) => (
        <li key={repo.id} className="repo-list-item">
          <span className="repo-color-indicator" style={{ backgroundColor: repo.color }} />
          {repo.name}
          <button onClick={() => onRemoveRepo(repo.id)} className="remove-repo-button">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
