# PRE_ASSIGNMENT_ANSWERS

## Which ML powered feature will you choose and why?

I chose the sentiment analysis feature for several reasons:

User Engagement: Sentiment analysis on the latest issues can provide immediate value to users by giving them a quick insight into the community's feelings around a repository. It can help users gauge the positivity or concerns within the repository's community, which is valuable information for potential contributors or users evaluating whether to use the repository.

Practicality: Sentiment analysis is a well-established application of machine learning and natural language processing. There are mature APIs available, like Google's Cloud Natural Language API or Amazon Comprehend, that can perform sentiment analysis with high accuracy and minimal setup.

Efficiency: Implementing sentiment analysis can be done efficiently by calling an external API with the text data and interpreting the results. It doesn't require training a custom model or maintaining a dataset, which can be resource-intensive.

Visualization: The output of sentiment analysis is straightforward to visualize (e.g., emojis) and doesn't require complex UI changes. It can be a simple yet powerful addition to the existing UI.

## What do you think are the greatest areas of risk in completing the project?

API Limitations and Reliability: Relying on external APIs (GitHub for data and Google Cloud or similar for sentiment analysis) introduces a dependency. Any changes, downtimes, or rate limits of these APIs can directly impact the functionality of the project.

Accuracy of Sentiment Analysis: The accuracy of sentiment analysis can vary, and incorrect analysis might lead to misleading conclusions for the users.

Data Privacy and Security: Handling user data, especially if integrating any form of user authentication or personal data, requires strict compliance with data privacy laws and security measures.

## What changes/additions would you make to the design?

Enhanced Data Visualization: Implement more interactive data visualization elements for the commit activity, like tooltips, zooming, and filtering capabilities.

User Interface Personalization: Allow users to customize the interface, such as dark/light mode or different color schemes, for better accessibility and personal preference.

## List two or three features that you would consider implementing in the future that would add significant value to the project.

Repository Comparison: A feature to compare multiple repositories side by side in terms of commit activity, star growth, and sentiment analysis to help users in decision-making.

Issue Resolution Time Analysis: Analyze and visualize the average time taken to close issues in a repository, providing insights into the responsiveness and activity of the repository maintainers.

Automated Repository Recommendations: Based on the user's search history or specified interests, the app could suggest other repositories they might find interesting.

## Are there any clarifying questions you would ask? If you're able to make assumptions about these and continue, please record and share your assumptions

User Target Group: Who is the primary user of this app? Developers, repository maintainers, or general users?

Assumption: The app is targeted towards developers and open-source contributors.

Data Privacy Concerns: Are there any specific data privacy concerns or regulations that need to be considered, especially with sentiment analysis?

Assumption: Standard data privacy practices are followed, and no personal user data is processed for sentiment analysis.

Extensibility and Integration: Is the app expected to integrate with other tools or platforms in the future?

Assumption: The app is standalone for now but designed with modularity in mind to allow future integrations.
