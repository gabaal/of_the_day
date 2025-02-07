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
export const getMultipleQuotes = async () => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    return response.data.slice(0, 5);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [{ quote: "Error fetching quotes", author: "Unknown", year: "N/A" }];
  }
};
