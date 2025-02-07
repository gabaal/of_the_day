"use client";

import { useEffect, useState } from "react";
import { getHistoricalEvent } from "../../lib/historicalFacts";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      let eventsArray = [];
      for (let i = 0; i < 5; i++) {
        const eventData = await getHistoricalEvent();
        eventsArray.push(eventData);
      }
      setEvents(eventsArray);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-light p-6">
      <h1 className="text-4xl font-bold mb-6">More Historical Events</h1>
      <div className="space-y-6">
        {events.map((event, index) => (
          <p key={index} className="text-xl">
            {event.year}: {event.event}
          </p>
        ))}
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
