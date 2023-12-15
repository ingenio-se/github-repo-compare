const GOOGLE_CLOUD_API_KEY = 'AIzaSyCyWHw9nLQV1wJxL3nwktbCnZ_ZQmKb4HU'
console.log("Google Token:", GOOGLE_CLOUD_API_KEY);
// Function to analyze sentiment of a text
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
   
    // Google's sentiment score ranges from -1 (negative) to 1 (positive)
    return sentimentData.documentSentiment.score;
  } catch (error) {
    console.error("Error in analyzeSentiment:", error);
    throw error;
  }
};