import React from "react";
import Link from "next/link";

const mockData = {
  club: {
    club_id: 1,
    name: "Downtown Fitness Club",
    location: "123 Main St, Springfield",
    description: "A modern fitness club with all the latest equipment.",
    events: [
      {
        event_id: 1,
        name: "Morning Yoga",
        event_type: "yoga",
        description: "Start your day with a relaxing yoga session.",
        date: "2024-05-25T08:00:00Z",
        bookings: 15,
        instructor: {
          instructor_id: 1,
          name: "Alice Johnson",
          picture: "/instructors/alice.jpg",
          experience: 5,
        },
      },
      {
        event_id: 2,
        name: "CrossFit Challenge",
        event_type: "cross-fit",
        description: "Push your limits with our CrossFit Challenge.",
        date: "2024-05-25T10:00:00Z",
        bookings: 20,
        instructor: {
          instructor_id: 2,
          name: "Bob Smith",
          picture: "/instructors/bob.jpg",
          experience: 7,
        },
      },
      // Add more mock events as needed
    ],
  },
};

export default function ClubDetail() {
  // Find the club based on the clubId from the mock data
  const club = mockData.club;

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
          {club.name}
        </h1>
        <p>
          <strong>Location:</strong> {club.location}
        </p>
        <p>{club.description}</p>
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
          {club.events.map((event) => (
            <div
              key={event.event_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                position: "relative",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <h3 style={{ fontSize: "1.2em", margin: "0 0 10px" }}>
                {event.name}
              </h3>
              <p style={{ color: "#666" }}>{event.description}</p>
              <p>
                <strong>Date:</strong> {new Date(event.date).toLocaleString()}
              </p>
              <p>
                <strong>Bookings:</strong> {event.bookings}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  marginBottom: "40px",
                }}
              >
                <img
                  src={event.instructor.picture}
                  alt={event.instructor.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <p>
                    <strong>Instructor:</strong> {event.instructor.name}
                  </p>
                  <p>
                    <strong>Experience:</strong> {event.instructor.experience}{" "}
                    years
                  </p>
                </div>
              </div>
              <Link
                href={`/${club.club_id}/events/${event.event_id}`}
                legacyBehavior
              >
                <a
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "white",
                    borderRadius: "5px",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                  }}
                >
                  Book Now
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
