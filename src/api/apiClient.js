const API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
console.log("GitHub Token:", GITHUB_TOKEN);

const headers = {
  'Authorization': `token ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
};

export const searchRepositories = async (searchTerm) => {
  const response = await fetch(`${API_BASE_URL}/search/repositories?q=${searchTerm}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API responded with status ${response.status}`);
  }
  return response.json();
};

export const getCommitActivity = async (owner, repo) => {
  const response = await fetch(`${API_BASE_URL}/repos/${owner}/${repo}/stats/commit_activity`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API responded with status ${response.status}`);
  }
  return response.json();
};
