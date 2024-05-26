import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const getPopularEvents = async (userId: string) => {
  const popularEventsData = await db.execute(
    sql`
      SELECT 
        e.event_id,
        e.name,
        e.event_type,
        e.description,
        e.date,
        (SELECT COUNT(*) FROM event_user eu WHERE eu.event_id = e.event_id) AS bookings,
        json_build_object(
          'instructor_id', i.instructor_id,
          'name', i.name,
          'picture', i.picture,
          'experience', i.experience
        ) AS instructor,
        json_build_object(
          'club_id', c.club_id,
          'name', c.name,
          'location', c.location
        ) AS club,
        CASE WHEN eu.user_id IS NOT NULL THEN true ELSE false END AS enrolled
      FROM 
        event e
      JOIN 
        instructor i ON e.instructor_id = i.instructor_id
      JOIN 
        club c ON e.club_id = c.club_id
      LEFT JOIN 
        event_user eu ON e.event_id = eu.event_id AND eu.user_id = ${userId}
      GROUP BY 
        e.event_id, e.name, e.event_type, e.description, e.date, i.instructor_id, i.name, i.picture, i.experience, c.club_id, c.name, c.location, eu.user_id
      ORDER BY 
        bookings DESC
      LIMIT 10;
    `
  );
  return popularEventsData.rows;
};
