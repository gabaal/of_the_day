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
      const quoteData = await getQuoteOfTheDay();
      setQuote(quoteData.quote);
      setAuthor(quoteData.author);

      const historyData = await getHistoricalFact();
      setHistoricalFact(historyData.event);
      setHistoricalYear(historyData.year);

      const birthDeathData = await getBirthAndDeath();
      setBirth(birthDeathData.birth);
      setDeath(birthDeathData.death);
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-primary text-light flex flex-col items-center justify-center p-6">
      {/* Main Title */}
      <h1 className="text-5xl font-bold text-white mb-10">Of The Day</h1>

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
