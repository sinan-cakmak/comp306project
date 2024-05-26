// /app/popular-events/page.tsx
import React from "react";
import { getPopularEvents } from "@/app/actions/get-popular-events";
import { auth } from "@clerk/nextjs/server";
import EventCard from "./components/event-card"; // Adjust the import path as necessary

export default async function PopularEvents() {
  const { userId } = auth();
  const popularEvents = await getPopularEvents(userId);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/clubs_background.jpg')` }}
      >
        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "2em",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Most Popular Events
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {popularEvents.map((event) => (
            <EventCard key={event.event_id} event={event} userId={userId} />
          ))}
        </div>
      </div>
    </div>
  );
}
