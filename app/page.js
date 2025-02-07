"use client";

import { useEffect, useState } from "react";
import { getQuoteOfTheDay } from "../lib/quotes";
import { getHistoricalEvent } from "../lib/historicalFacts";
import { getNotableBirth, getNotableDeath } from "../lib/birthsAndDeaths";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [historicalEvent, setHistoricalEvent] = useState("");
  const [historicalYear, setHistoricalYear] = useState("");
  const [birth, setBirth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [death, setDeath] = useState("");
  const [deathYear, setDeathYear] = useState("");

  const router = useRouter();

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  useEffect(() => {
    const storedData = localStorage.getItem("ofTheDayData");
    const storedDate = localStorage.getItem("ofTheDayDate");

    if (storedData && storedDate === getTodayDate()) {
      // Use stored data if it's from today
      const data = JSON.parse(storedData);
      setQuote(data.quote);
      setAuthor(data.author);
      setHistoricalEvent(data.historicalEvent);
      setHistoricalYear(data.historicalYear);
      setBirth(data.birth);
      setBirthYear(data.birthYear);
      setDeath(data.death);
      setDeathYear(data.deathYear);
    } else {
      // Fetch new data if none is stored or it's a new day
      const fetchData = async () => {
        const quoteData = await getQuoteOfTheDay();
        const eventData = await getHistoricalEvent();
        const birthData = await getNotableBirth();
        const deathData = await getNotableDeath();

        const newData = {
          quote: quoteData.quote,
          author: quoteData.author,
          historicalEvent: eventData.event,
          historicalYear: eventData.year,
          birth: birthData.name,
          birthYear: birthData.year,
          death: deathData.name,
          deathYear: deathData.year,
        };

        // Store data in local storage with today's date
        localStorage.setItem("ofTheDayData", JSON.stringify(newData));
        localStorage.setItem("ofTheDayDate", getTodayDate());

        // Update state
        setQuote(newData.quote);
        setAuthor(newData.author);
        setHistoricalEvent(newData.historicalEvent);
        setHistoricalYear(newData.historicalYear);
        setBirth(newData.birth);
        setBirthYear(newData.birthYear);
        setDeath(newData.death);
        setDeathYear(newData.deathYear);
      };

      fetchData();
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary p-6">
      <div className="bg-secondary text-light p-10 rounded-lg shadow-lg max-w-[600px] w-full space-y-12">
        <h1 className="text-5xl font-bold text-center">Of The Day</h1>

        <div className="space-y-12">
          {/* Quote Section */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-accent">Quote</h2>
            <blockquote
              className="text-2xl italic text-light mt-3 cursor-pointer hover:text-muted"
              onClick={() => router.push("/quotes")}
            >
              &quot;{quote}&quot;
            </blockquote>
            <p className="text-xl text-muted mt-2">— {author}</p>
          </div>

          {/* Historical Event Section */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-accent">
              Historical Event
            </h2>
            <p className="text-xl text-light mt-3">
              {historicalYear}: {historicalEvent}
            </p>
          </div>

          {/* Birth Section */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-accent">Birth</h2>
            <p className="text-xl text-light mt-3">
              {birthYear}: {birth}
            </p>
          </div>

          {/* Death Section */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-accent">Death</h2>
            <p className="text-xl text-light mt-3">
              {deathYear}: {death}
            </p>
          </div>
        </div>

        {/* SignInButton / UserButton Section */}
        <div className="mt-8 text-center">
          <SignedOut>
            <SignInButton className="text-white bg-accent py-2 px-4 rounded-lg hover:bg-accent-dark">
              Log In
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
