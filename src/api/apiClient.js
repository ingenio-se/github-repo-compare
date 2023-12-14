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
// Function to fetch commit activity for a given repository
export const fetchCommitActivity = async (fullName) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/repos/${fullName}/commits?since=${oneYearAgo.toISOString()}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }
  
      const commits = await response.json();
      return processCommits(commits);
    } catch (error) {
      console.error('Error fetching commit activity:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  };
  
  // Function to process raw commit data into weekly activity
  const processCommits = (commits) => {
    // Initialize a map to count commits per week
    const commitsPerWeek = new Map();
  
    for (const commit of commits) {
      const weekStart = getWeekStart(new Date(commit.commit.author.date));
      commitsPerWeek.set(weekStart, (commitsPerWeek.get(weekStart) || 0) + 1);
    }
  
    // Convert the map into an array of data points
    const commitData = Array.from(commitsPerWeek, ([weekStart, count]) => ({
      weekStart,
      count
    }));
  
    // Sort by date, just in case
    commitData.sort((a, b) => new Date(a.weekStart) - new Date(b.weekStart));
  
    return commitData;
  };
  
  // Helper function to get the start of the week (Sunday) for a given date
  const getWeekStart = (date) => {
    const weekStart = new Date(date);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    return weekStart.toISOString().split('T')[0]; // Return date string in YYYY-MM-DD format
  };