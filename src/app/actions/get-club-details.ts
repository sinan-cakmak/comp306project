import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const getClubDetails = async (club_id: number, userId: string) => {
  const clubDetailsData = await db.execute(
    sql`
        SELECT 
          c.club_id,
          c.name,
          c.location,
          c.description,
          json_agg(
            json_build_object(
              'event_id', e.event_id,
              'name', e.name,
              'event_type', e.event_type,
              'description', e.description,
              'date', e.date,
              'bookings', (SELECT COUNT(*) FROM event_user eu WHERE eu.event_id = e.event_id),
              'instructor', json_build_object(
                'instructor_id', i.instructor_id,
                'name', i.name,
                'picture', i.picture,
                'experience', i.experience
              ),
              'enrolled', CASE WHEN eu.user_id IS NOT NULL THEN true ELSE false END
            )
          ) AS events
        FROM 
          club c
        JOIN
          event e ON c.club_id = e.club_id
        JOIN
          instructor i ON e.instructor_id = i.instructor_id
        LEFT JOIN 
          event_user eu ON e.event_id = eu.event_id AND eu.user_id = ${userId}
        WHERE 
          c.club_id = ${club_id}
        GROUP BY 
          c.club_id;
              `
  );
  return clubDetailsData.rows;
};
