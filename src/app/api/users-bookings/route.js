import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { userId } = await auth();
  try {
    const usersBookings = await db.execute(
      sql`
          SELECT 
          u.height,
          u.weight,
          json_agg(
            json_build_object(
              'event_id', e.event_id,
              'name', e.name,
              'event_type', e.event_type,
              'description', e.description,
              'date', e.date,
              'club', json_build_object(
                'name', c.name
              ),
              'instructor', json_build_object(
                'name', i.name,
                'picture', i.picture
              )
            )
          ) AS bookings
        FROM 
          "user" u
        JOIN 
          event_user eu ON u.user_id = eu.user_id
        JOIN 
          event e ON eu.event_id = e.event_id
        JOIN 
          club c ON e.club_id = c.club_id
        JOIN 
          instructor i ON e.instructor_id = i.instructor_id
        WHERE 
          u.user_id = ${userId}
        GROUP BY 
          u.user_id;
        `
    );
    console.log("USER'S BOOKINGS", usersBookings.rows);
    return new NextResponse(
      JSON.stringify({
        usersBookings: usersBookings.rows,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("[CREATE_DOCUMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
