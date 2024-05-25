import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { club } from "@/lib/db/schema";

export const getClubs = async () => {
  const clubsData = await db.execute(
    sql`
        select
        club_id,
        name,
        location,
        description
        from club
              `
  );
  return clubsData.rows;
};
