import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";

export const getUsers = async () => {
  // Fetch the list of users from Clerk
  const clerkResponse = await clerkClient.users.getUserList();

  // Log the Clerk response to check its structure
  console.log("Clerk Response:", clerkResponse);

  // Fetch user data from the database
  const usersData = await db.execute(
    sql`
      SELECT 
        u.user_id,
        coalesce(u.height,0) as height,
        coalesce(u.weight,0) as weight,
        COUNT(eu.event_id) as total_enrollments,
        COUNT(DISTINCT e.event_type) as unique_events
      FROM 
        "user" u
      LEFT JOIN 
        event_user eu ON u.user_id = eu.user_id
      LEFT JOIN 
        event e ON eu.event_id = e.event_id
      GROUP BY 
        u.user_id
      ORDER BY
        total_enrollments DESC
    `
  );

  // Merge user data with Clerk response
  const usersDataWithNames = usersData.rows.map((user) => {
    const clerkUser = clerkResponse.data.find((cu) => cu.id === user.user_id);
    let name = "Unknown";
    let clerkImageUrl = null;
    if (clerkUser) {
      const { firstName, lastName, imageUrl } = clerkUser;
      console.log("Clerk User:", firstName, lastName, imageUrl);
      if (firstName && lastName) {
        name = `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
          lastName
        )}`;
      } else if (firstName) {
        name = capitalizeFirstLetter(firstName);
      } else if (lastName) {
        name = capitalizeFirstLetter(lastName);
      }
      clerkImageUrl = imageUrl;
    }
    return {
      ...user,
      name,
      clerkImageUrl,
    };
  });

  return usersDataWithNames;
};

export default function capitalizeFirstLetter(text) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
