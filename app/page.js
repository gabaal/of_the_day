"use client";

import { useEffect, useState } from "react";
import { getQuoteOfTheDay } from "../lib/quote";
import { getHistoricalFact } from "../lib/history";
import { getBirthAndDeath } from "../lib/onthisday";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [historicalFact, setHistoricalFact] = useState("");
  const [historicalYear, setHistoricalYear] = useState("");
  const [birth, setBirth] = useState({});
  const [death, setDeath] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("dailyData");
      const today = new Date().toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // If stored data is from today, use it
        if (parsedData.date === today) {
          setQuote(parsedData.quote);
          setAuthor(parsedData.author);
          setHistoricalFact(parsedData.historicalFact);
          setHistoricalYear(parsedData.historicalYear);
          setBirth(parsedData.birth);
          setDeath(parsedData.death);
          return;
        }
      }

      // Fetch new data if no valid stored data exists
      const quoteData = await getQuoteOfTheDay();
      const historyData = await getHistoricalFact();
      const birthDeathData = await getBirthAndDeath();

      const newData = {
        date: today,
        quote: quoteData.quote,
        author: quoteData.author,
        historicalFact: historyData.event,
        historicalYear: historyData.year,
        birth: birthDeathData.birth,
        death: birthDeathData.death,
      };

      // Store the new data in localStorage
      localStorage.setItem("dailyData", JSON.stringify(newData));

      // Update state with the new data
      setQuote(newData.quote);
      setAuthor(newData.author);
      setHistoricalFact(newData.historicalFact);
      setHistoricalYear(newData.historicalYear);
      setBirth(newData.birth);
      setDeath(newData.death);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-primary text-light flex flex-col items-center justify-center p-6">
      {/* Main Title */}
      <h1 className="text-5xl font-bold text-white mb-10">....Of The Day</h1>

      {/* Content Wrapper */}
      <div className="max-w-3xl w-full bg-secondary shadow-lg rounded-lg p-10 space-y-8">
        {/* Quote Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-accent mb-4">Quote</h2>
          <blockquote className="italic text-2xl text-white">
            &quot;{quote}&quot;
          </blockquote>
          <p className="text-lg font-semibold text-light mt-2">— {author}</p>
        </div>

        {/* Historical Event Section */}
        <div className="text-center border-t border-light pt-6">
          <h2 className="text-3xl font-bold text-accent mb-4">
            Historical Event
          </h2>
          <p className="text-xl text-white">
            {historicalYear}: {historicalFact}
          </p>
        </div>

        {/* Birth Section */}
        <div className="text-center border-t border-light pt-6">
          <h2 className="text-3xl font-bold text-accent mb-4">Notable Birth</h2>
          <p className="text-xl text-white">
            {birth.year}: {birth.name}
          </p>
        </div>

        {/* Death Section */}
        <div className="text-center border-t border-light pt-6">
          <h2 className="text-3xl font-bold text-accent mb-4">Notable Death</h2>
          <p className="text-xl text-white">
            {death.year}: {death.name}
          </p>
        </div>
      </div>
    </div>
  );
}
