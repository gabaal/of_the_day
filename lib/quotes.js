import axios from "axios";

// Fetch quote of the day
export const getQuoteOfTheDay = async () => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    if (response.data && response.data.length > 0) {
      const { quote, author, year } = response.data[0];
      return { quote, author, year };
    } else {
      return { quote: "No quote available", author: "Unknown", year: "N/A" };
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { quote: "Error fetching quote", author: "Unknown", year: "N/A" };
  }
};

// Fetch multiple quotes for the quote details page
export const getMultipleQuotes = async (count = 5) => {
  const quotes = [];

  for (let i = 0; i < count; i++) {
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (response.data.length > 0) {
        quotes.push(response.data[0]); // Since the API returns an array with one quote
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }

  return quotes;
};
