import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { club } from "@/lib/db/schema";
import { clerkClient } from "@clerk/nextjs/server";

export const getClubs = async () => {
  const clubsData = await db.execute(
    sql`
      SELECT 
        c.club_id,
        c.name,
        c.location,
        c.description,
        COUNT(eu.user_id) as total_enrollments
      FROM 
        club c
      LEFT JOIN 
        event e ON c.club_id = e.club_id
      LEFT JOIN 
        event_user eu ON e.event_id = eu.event_id
      GROUP BY 
        c.club_id, c.name, c.location, c.description
      ORDER BY
        total_enrollments DESC;
              `
  );
  return clubsData.rows;
};
