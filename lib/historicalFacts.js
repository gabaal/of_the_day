import axios from "axios";

// Fetch historical event of the day
export const getHistoricalEvent = async () => {
  try {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    const response = await axios.get(
      `https://api.api-ninjas.com/v1/historicalevents?month=${month}&day=${day}`,
      {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    return response.data[Math.floor(Math.random() * response.data.length)];
  } catch (error) {
    console.error("Error fetching historical event:", error);
    return { event: "Error fetching event", year: "N/A" };
  }
};
