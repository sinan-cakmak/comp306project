import React from "react";
import { getUsers } from "@/app/actions/get-users";
import { auth } from "@clerk/nextjs/server";
import { addUser } from "@/app/actions/add-user";

export default async function Users() {
  const { userId } = auth();
  await addUser(userId);
  const users = await getUsers();
  console.log(users);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/users_background.jpg')` }}
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
          Users
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {users.map((user) => (
            <div
              key={user.user_id}
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
              {user.clerkImageUrl && (
                <img
                  src={user.clerkImageUrl}
                  alt={user.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "20px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "1.5em", margin: "0 0 10px" }}>
                  {user.name}
                </h2>
                <p style={{ fontWeight: "bold" }}>
                  <strong>Height:</strong> {user.height} cm
                </p>
                <p style={{ fontWeight: "bold" }}>
                  <strong>Weight:</strong> {user.weight} kg
                </p>
                <p style={{ fontWeight: "bold" }}>
                  <strong>Total Enrollments:</strong> {user.total_enrollments}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  <strong>Unique Events:</strong> {user.unique_events}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
