import axios from "axios";

export const getBirthAndDeath = async () => {
  try {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(today.getDate()).padStart(2, "0");

    const birthUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;
    const deathUrl = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/deaths/${month}/${day}`;

    // Fetch births and deaths concurrently
    const [birthResponse, deathResponse] = await Promise.all([
      axios.get(birthUrl),
      axios.get(deathUrl),
    ]);

    // Extract and pick a random birth
    const births = birthResponse.data.births;
    const randomBirth =
      births.length > 0
        ? births[Math.floor(Math.random() * births.length)]
        : null;

    // Extract and pick a random death
    const deaths = deathResponse.data.deaths;
    const randomDeath =
      deaths.length > 0
        ? deaths[Math.floor(Math.random() * deaths.length)]
        : null;

    return {
      birth: randomBirth
        ? { year: randomBirth.year, name: randomBirth.text }
        : { year: "N/A", name: "No notable birth found for today." },
      death: randomDeath
        ? { year: randomDeath.year, name: randomDeath.text }
        : { year: "N/A", name: "No notable death found for today." },
    };
  } catch (error) {
    console.error("Error fetching birth and death data:", error);
    return {
      birth: { year: "N/A", name: "Error fetching birth data." },
      death: { year: "N/A", name: "Error fetching death data." },
    };
  }
};
