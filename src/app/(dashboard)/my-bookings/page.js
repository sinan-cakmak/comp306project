"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MyBookings() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/users-bookings");
        const data = response.data.usersBookings;
        console.log("USER'S BOOKINGS", data);
        if (data.length > 0) {
          setHeight(data[0].height || 0);
          setWeight(data[0].weight || 0);
          console.log("BOOKINGS", data[0].bookings);
          setBookings(data[0].bookings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleHeightChange = (e) => {
    setHeight(Number(e.target.value));
  };

  const handleWeightChange = (e) => {
    setWeight(Number(e.target.value));
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/update-height-weight", { height, weight });
      console.log("Height and weight saved successfully!");
      toast.success("Height and weight saved successfully!");
    } catch (error) {
      console.error("Error saving height and weight:", error);
    }
  };

  const handleRemove = async (eventId) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/remove-event", {
        eventId,
      });
      console.log(response.data);
      if (response.data.event_id && response.data.user_id) {
        toast.success("Removed successfully!");
        setBookings(bookings.filter((booking) => booking.event_id !== eventId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while removing the booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
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
          {bookings.length === 0 ? (
            <p>You currently have no bookings.</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.event_id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.2em",
                      margin: "0 0 10px",
                      fontWeight: "bold",
                    }}
                  >
                    {booking.name}
                  </h3>
                  <p>
                    <strong>Club:</strong> {booking.club.name}
                  </p>
                  <p>
                    <strong>Instructor:</strong> {booking.instructor.name}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.date).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemove(booking.event_id)}
                    disabled={loading}
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: loading ? "#ccc" : "#EEA47F",
                      color: "white",
                      borderRadius: "5px",
                      textDecoration: "none",
                      marginTop: "10px",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
                <img
                  src={booking.instructor.picture}
                  alt={booking.instructor.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginLeft: "20px",
                  }}
                />
              </div>
            ))
          )}
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
                value={height === 0 ? "" : height}
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
                value={weight === 0 ? "" : weight}
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
                backgroundColor: "#00539C",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save Your Body Measurements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
