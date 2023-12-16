/**
 * sentimentService.js
 * This module contains a function to analyze the sentiment of text
 * using the Google Cloud Natural Language API.
 */

const GOOGLE_CLOUD_API_KEY = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;

/**
 * Analyzes the sentiment of a given text string using the Google Cloud Natural Language API.
 * 
 * The function sends a request to the Google Cloud API with the text and receives
 * a sentiment analysis response, which includes a sentiment score ranging from -1 (very negative)
 * to 1 (very positive).
 *
 * @param {string} text - The text to be analyzed for sentiment.
 * @returns {Promise<number>} - A promise that resolves to the sentiment score.
 * @throws {Error} - Throws an error if the API request fails or if there's an issue with the request.
 */
export const analyzeSentiment = async (text) => {
  try {
    const response = await fetch(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${GOOGLE_CLOUD_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        document: {
          type: 'PLAIN_TEXT',
          content: text,
        },
        encodingType: 'UTF8',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const sentimentData = await response.json();
   
    // Return the overall sentiment score from the response
    return sentimentData.documentSentiment.score;
  } catch (error) {
    console.error("Error in analyzeSentiment:", error);
    throw error;
  }
};
