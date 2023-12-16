# GitHub Repo Analyzer

GitHub Repo Analyzer is a React application that allows users to visualize the commit activity of GitHub repositories over the last year and perform sentiment analysis on repository issues using machine learning.

## Features

- Search GitHub repositories.
- Visualize commit activity in graph form.
- Sentiment analysis on repository issues to understand community sentiment.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js.
- You have a GitHub API key.
- You have a Google Cloud Natural Language API key.

## Installation

To install GitHub Repo Analyzer from a zip file, follow these steps:

1. Download the project zip file.
2. Extract the zip file to a desired location on your system.
3. Open a terminal or command prompt and navigate to the extracted project directory:

cd path/to/github-repo-analyzer

4. Install the necessary packages:

npm install


## Setting Up Environment Variables

1. Create a `.env` file in the project root.
2. Add the following variables:

REACT_APP_GITHUB_TOKEN=your_github_token
REACT_APP_GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key


## Running the Application

Run the application in development mode:

npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

After running the app, you can search for GitHub repositories using the search bar. Click on a repository from the suggestions to view its commit activity graph and sentiment analysis.

## Contributing

Contributions to GitHub Repo Analyzer are welcome. Please adhere to this project's `code of conduct` while contributing.

## License

This project is licensed under the [MIT License](LICENSE).
