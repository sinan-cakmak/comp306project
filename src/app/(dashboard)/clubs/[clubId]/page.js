import React from "react";
import { getClubDetails } from "@/app/actions/get-club-details";
import { auth } from "@clerk/nextjs/server";
import EventCard from "./components/event-card"; // Adjust the import path as necessary

export default async function ClubDetail({ params }) {
  const { userId } = auth();
  const clubDetails = await getClubDetails(parseInt(params.clubId), userId);

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
          {clubDetails[0].name}
        </h1>
        <p>
          <strong>Location:</strong> {clubDetails[0].location}
        </p>
        <p>{clubDetails[0].description}</p>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "1.5em",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Events
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {clubDetails[0].events.map((event) => {
            return (
              <EventCard key={event.event_id} event={event} userId={userId} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
