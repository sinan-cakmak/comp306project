import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req, res) {
  const { height, weight } = await req.json();
  const { userId } = await auth();

  try {
    const updatedUser = await db.execute(
      sql`
        UPDATE "user"
        SET height = ${height}, weight = ${weight}
        WHERE user_id = ${userId}
        RETURNING user_id, height, weight;
      `
    );

    console.log("UPDATED USER", updatedUser);

    return new NextResponse(
      JSON.stringify({
        user_id: updatedUser.rows[0].user_id,
        height: updatedUser.rows[0].height,
        weight: updatedUser.rows[0].weight,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("[UPDATE_USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
