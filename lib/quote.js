// lib/quote.js
import axios from "axios";

export const getQuoteOfTheDay = async () => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY, // Get the API key from environment variables
      },
    });

    if (response.data && response.data.length > 0) {
      const { quote, author } = response.data[0];
      return { quote, author };
    } else {
      return { quote: "No quote available", author: "Unknown" };
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { quote: "Error fetching quote", author: "Unknown" };
  }
};
