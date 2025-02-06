import axios from "axios";

export const getHistoricalFact = async () => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are zero-based in JS
    const day = today.getDate();

    const response = await axios.get(
      `https://api.api-ninjas.com/v1/historicalevents?month=${month}&day=${day}`,
      {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY, // Get API key from environment variables
        },
      }
    );

    if (response.data && response.data.length > 0) {
      // Pick a random historical event
      const randomIndex = Math.floor(Math.random() * response.data.length);
      const { year, event } = response.data[randomIndex];
      return { year, event };
    } else {
      return { year: "N/A", event: "No historical event found for today." };
    }
  } catch (error) {
    console.error("Error fetching historical fact:", error);
    return { year: "N/A", event: "Error fetching historical event." };
  }
};
