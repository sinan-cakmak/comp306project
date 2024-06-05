import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const { userId } = await auth();
  console.log("USER ID", userId);
  try {
    const usersBookingsCount = await db.execute(
      sql`
        SELECT 
          COUNT(*) as booking_count
        FROM 
          event_user 
        WHERE 
          user_id = ${userId};
        `
    );
    console.log("USER'S BOOKINGS", usersBookingsCount.rows);
    return new NextResponse(
      JSON.stringify({
        usersBookingsCount: usersBookingsCount.rows,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("[CREATE_DOCUMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
