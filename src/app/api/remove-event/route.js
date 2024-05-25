import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req, res) {
  const { eventId } = await req.json();
  const { userId } = await auth();
  try {
    const deletedEventUser = await db.execute(
      sql`
        DELETE FROM event_user
        WHERE event_id = ${eventId} AND user_id = ${userId}
        RETURNING event_id, user_id;
      `
    );
    console.log("DELETED EVENT USER", deletedEventUser);
    return new NextResponse(
      JSON.stringify({
        event_id: deletedEventUser.rows[0].event_id,
        user_id: deletedEventUser.rows[0].user_id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("[CREATE_DOCUMENT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
