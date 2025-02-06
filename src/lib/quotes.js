import axios from "axios";

export const getQuoteOfTheDay = async () => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": "Y37RKNIMmFtd2jRWOkT+IA==CNxw1E4S2XPnlrt6",
      },
    });

    // Assuming the API returns an array of quotes, return the first one
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
