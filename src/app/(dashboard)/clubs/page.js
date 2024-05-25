import React from "react";
import Link from "next/link";
import { getClubs } from "@/app/actions/get-clubs";
import { auth } from "@clerk/nextjs/server";
import { addUser } from "@/app/actions/add-user";

export default async function Clubs() {
  const { userId } = auth();
  await addUser(userId);
  const clubs = await getClubs();
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/clubs_background.jpg')` }}
      >
        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>
      <div className="relative w-full p-8">
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "2em",
            marginBottom: "20px",
            textAlign: "center",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Available Clubs
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {clubs.map((club) => (
            <div
              key={club.club_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                position: "relative",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.5em", margin: "0 0 10px" }}>
                  {club.name}
                </h2>
                <p style={{ fontWeight: "bold" }}>
                  <strong>Location:</strong> {club.location}
                </p>
                <p style={{ color: "#666" }}>{club.description}</p>
              </div>
              <Link href={`/clubs/${club.club_id}`} legacyBehavior>
                <a
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#00539C",
                    color: "white",
                    borderRadius: "5px",
                    textDecoration: "none",
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                  }}
                >
                  Visit <span style={{ marginLeft: "5px" }}>→</span>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
