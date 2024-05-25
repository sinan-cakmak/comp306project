import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { club } from "@/lib/db/schema";

export const addUser = async (userId: string) => {
  const insertedUserId = await db.execute(
    sql`
        INSERT INTO "user"(user_id)
        VALUES(${userId}) 
        ON CONFLICT (user_id) DO NOTHING
        RETURNING user_id;
`
  );
};
