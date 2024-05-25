import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { eventId, userId } = await req.json();
  try {
    const insertedEventUser = await db.execute(
      sql`
          INSERT INTO event_user(event_id, user_id)
          VALUES(${eventId}, ${userId})
          ON CONFLICT (event_id, user_id) DO NOTHING
          RETURNING event_id, user_id;
        `
    );
    console.log("INSERTED EVENT USER", insertedEventUser);
    return new NextResponse(
      JSON.stringify({
        event_id: insertedEventUser.rows[0].event_id,
        user_id: insertedEventUser.rows[0].user_id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("[CREATE_DOCUMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
