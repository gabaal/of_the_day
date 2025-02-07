import axios from "axios";

// Function to get today's date in MM/DD format
const getTodayDate = () => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}/${day}`;
};

// Fetch a random notable birth of the day
export const getNotableBirth = async () => {
  try {
    const today = getTodayDate();
    const response = await axios.get(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${today}`
    );

    const births = response.data.births;
    if (births.length > 0) {
      const randomBirth = births[Math.floor(Math.random() * births.length)];
      return {
        name: randomBirth.text,
        year: randomBirth.year,
      };
    } else {
      return { name: "No notable birth found", year: "N/A" };
    }
  } catch (error) {
    console.error("Error fetching notable births:", error);
    return { name: "Error fetching birth", year: "N/A" };
  }
};

// Fetch a random notable death of the day
export const getNotableDeath = async () => {
  try {
    const today = getTodayDate();
    const response = await axios.get(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/deaths/${today}`
    );

    const deaths = response.data.deaths;
    if (deaths.length > 0) {
      const randomDeath = deaths[Math.floor(Math.random() * deaths.length)];
      return {
        name: randomDeath.text,
        year: randomDeath.year,
      };
    } else {
      return { name: "No notable death found", year: "N/A" };
    }
  } catch (error) {
    console.error("Error fetching notable deaths:", error);
    return { name: "Error fetching death", year: "N/A" };
  }
};
