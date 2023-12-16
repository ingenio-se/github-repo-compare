/**
 * This module defines a set of functions for interacting with the GitHub API.
 * It includes functions to search repositories, fetch commit activity, and
 * retrieve comments from issues in a repository.
 */

const API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Common headers for GitHub API requests
const headers = {
  'Authorization': `token ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
};

/**
 * Searches repositories on GitHub using a given search term.
 * 
 * @param {string} searchTerm - The term used for searching repositories.
 * @returns {Promise<Object>} A promise that resolves to the search results.
 * @throws {Error} Throws an error if the API request fails.
 */
export const searchRepositories = async (searchTerm) => {
  const response = await fetch(`${API_BASE_URL}/search/repositories?q=${searchTerm}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API responded with status ${response.status}`);
  }
  return response.json();
};

/**
 * Fetches commit activity for a given repository.
 * 
 * @param {string} fullName - The full name of the repository (e.g., "owner/name").
 * @returns {Promise<Array>} A promise that resolves to an array of commit activity data for the last year.
 * @throws {Error} Throws an error if the API request fails.
 */
export const fetchCommitActivity = async (fullName) => {
  const response = await fetch(`${API_BASE_URL}/repos/${fullName}/stats/commit_activity`, { headers });
  
  if (!response.ok) {
    throw new Error('GitHub API responded with an error: ' + response.statusText);
  }

  return response.json();
};

/**
 * Fetches the latest issues of a given repository.
 * 
 * @param {string} fullName - The full name of the repository.
 * @returns {Promise<Array>} A promise that resolves to an array of issues.
 * @throws {Error} Throws an error if the API request fails.
 */
async function fetchLatestIssues(fullName) {
  const issuesResponse = await fetch(`${API_BASE_URL}/repos/${fullName}/issues?state=open`, { headers });
  if (!issuesResponse.ok) {
    throw new Error(`Error fetching issues: ${issuesResponse.statusText}`);
  }
  return issuesResponse.json();
}

/**
 * Fetches comments for a specific issue in a repository.
 * 
 * @param {string} fullName - The full name of the repository.
 * @param {number} issueNumber - The issue number.
 * @returns {Promise<Array>} A promise that resolves to an array of comments.
 * @throws {Error} Throws an error if the API request fails.
 */
async function fetchCommentsForIssue(fullName, issueNumber) {
  const commentsResponse = await fetch(`${API_BASE_URL}/repos/${fullName}/issues/${issueNumber}/comments`, { headers });
  if (!commentsResponse.ok) {
    throw new Error(`Error fetching comments: ${commentsResponse.statusText}`);
  }
  return commentsResponse.json();
}

/**
 * Fetches comments for the latest issues of a repository.
 * 
 * @param {string} fullName - The full name of the repository.
 * @returns {Promise<string>} A promise that resolves to a string containing all comments concatenated.
 * @throws {Error} Throws an error if the API request fails.
 */
export const fetchCommentsForRepo = async (fullName) => {
  try {
    const issues = await fetchLatestIssues(fullName);
    const limitedIssues = issues.slice(0, 5); // Limit the number of issues to avoid hitting API rate limits

    let allComments = [];
    for (const issue of limitedIssues) {
      const comments = await fetchCommentsForIssue(fullName, issue.number);
      allComments = allComments.concat(comments.map(comment => comment.body));
    }

    return allComments.join(' ');
  } catch (error) {
    console.error("Error in fetchCommentsForRepo:", error);
    return '';
  }
};
