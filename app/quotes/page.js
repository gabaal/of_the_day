"use client";

import { useEffect, useState } from "react";
import { getQuoteOfTheDay } from "../../lib/quotes";
import Skeleton from "../../components/Skeleton";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      let quotesArray = [];
      for (let i = 0; i < 5; i++) {
        const quoteData = await getQuoteOfTheDay();
        quotesArray.push(quoteData);
      }
      setQuotes(quotesArray);
    };

    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-light p-6">
      <h1 className="text-4xl font-bold mb-6">More Quotes</h1>
      <div className="space-y-6">
        {quotes ? (
          quotes.map((q, index) => (
            <div key={index} className="text-center">
              <blockquote className="text-2xl italic">
                &quot;{q.quote}&quot;
              </blockquote>
              <p className="text-xl text-muted mt-2">— {q.author}</p>
            </div>
          ))
        ) : (
          <Skeleton height="h-8" />
        )}
        <button
          onClick={() => router.push("/")}
          className="block mx-auto mt-6 px-6 py-2 bg-accent text-light rounded hover:bg-muted transition"
        >
          Back to Main Page
        </button>
      </div>
    </div>
  );
}
