"use client";

import React, { useState } from "react";
import Link from "next/link";

const mockUserBookings = {
  user: {
    user_id: "user123",
    height: 170, // in cm
    weight: 70, // in kg
    bookings: [
      {
        event_id: 1,
        name: "Morning Yoga",
        event_type: "yoga",
        date: "2024-05-25T08:00:00Z",
        club: {
          name: "Downtown Fitness Club",
        },
        instructor: {
          name: "Alice Johnson",
        },
      },
      {
        event_id: 2,
        name: "CrossFit Challenge",
        event_type: "cross-fit",
        date: "2024-05-25T10:00:00Z",
        club: {
          name: "Downtown Fitness Club",
        },
        instructor: {
          name: "Bob Smith",
        },
      },
      // Add more mock bookings as needed
    ],
  },
};

export default function MyBookings() {
  const [height, setHeight] = useState<number>(mockUserBookings.user.height);
  const [weight, setWeight] = useState<number>(mockUserBookings.user.weight);

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleSave = () => {
    // Save the height and weight (e.g., send to the server)
    console.log("Height:", height, "Weight:", weight);
  };

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
          My Bookings
        </h1>
        <div>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "1.5em",
              marginBottom: "20px",
            }}
          >
            Bookings
          </h2>
          {mockUserBookings.user.bookings.map((booking) => (
            <div
              key={booking.event_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "1.2em", margin: "0 0 10px" }}>
                {booking.name}
              </h3>
              <p>
                <strong>Club:</strong> {booking.club.name}
              </p>
              <p>
                <strong>Instructor:</strong> {booking.instructor.name}
              </p>
              <p>
                <strong>Date:</strong> {new Date(booking.date).toLocaleString()}
              </p>
              <Link href={`/${booking.event_id}`} legacyBehavior>
                <a
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#0070f3",
                    color: "white",
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  View Event
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <h2
            style={{ fontWeight: "bold", fontSize: "1.5em", margin: "20px 0" }}
          >
            Your Height and Weight
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <label style={{ marginRight: "10px" }}>Height (cm):</label>
              <input
                type="number"
                value={height}
                onChange={handleHeightChange}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "10px" }}>Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              onClick={handleSave}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
