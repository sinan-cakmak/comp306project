"use client";

import React, { use, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EventCard = ({ event, userId }) => {
  const [enrolled, setEnrolled] = useState(event.enrolled);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/enroll-event", {
        eventId: event.event_id,
        userId,
      });
      if (response.data.event_id && response.data.user_id) {
        toast.success("Enrolled successfully!");
        setEnrolled(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while enrolling.");
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/remove-event", {
        eventId: event.event_id,
      });
      console.log(response.data.user_id);
      if (response.data.event_id && response.data.user_id) {
        toast.success("Enrolled successfully!");
        setEnrolled(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while enrolling.");
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div
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
      <h3 style={{ fontSize: "1.2em", margin: "0 0 10px", fontWeight: "bold" }}>
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
            <strong>Experience:</strong> {event.instructor.experience} years
          </p>
        </div>
      </div>
      {enrolled ? (
        <button
          onClick={handleRemove}
          disabled={loading}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#EEA47F",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            alignSelf: "flex-start",
            position: "absolute",
            bottom: "10px",
            left: "10px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Remove
        </button>
      ) : (
        <button
          onClick={handleEnroll}
          disabled={loading}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#00539C",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            alignSelf: "flex-start",
            position: "absolute",
            bottom: "10px",
            left: "10px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Enroll
        </button>
      )}
    </div>
  );
};

export default EventCard;
