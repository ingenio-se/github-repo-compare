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

export const fetchCommitActivity = async (fullName) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const response = await fetch(`${API_BASE_URL}/repos/${fullName}/stats/commit_activity`, { headers });
    
    if (!response.ok) {
      throw new Error('GitHub API responded with an error: ' + response.statusText);
    }
  
    const commitActivity = await response.json();
    return commitActivity; // This will return an array of commit activity for the last year
  };
  

  // Function to fetch the latest issues of a repository
  async function fetchLatestIssues(fullName) {
    const issuesResponse = await fetch(`${API_BASE_URL}/repos/${fullName}/issues?state=open`, { headers });
    if (!issuesResponse.ok) {
      throw new Error(`Error fetching issues: ${issuesResponse.statusText}`);
    }
    return await issuesResponse.json();
  }
  
  // Function to fetch comments for a given issue in a repository
  async function fetchCommentsForIssue(fullName, issueNumber) {
    const commentsResponse = await fetch(`${API_BASE_URL}/repos/${fullName}/issues/${issueNumber}/comments`, { headers });
    if (!commentsResponse.ok) {
      throw new Error(`Error fetching comments: ${commentsResponse.statusText}`);
    }
    return await commentsResponse.json();
  }
  
  // Main function to fetch comments for the latest issues of a repository
  export const fetchCommentsForRepo = async (fullName) => {
    
    try {
      const issues = await fetchLatestIssues(fullName);
  
      // Limit the number of issues to process to avoid hitting API rate limits
      const limitedIssues = issues.slice(0, 5); // Adjust the number as needed
  
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
  