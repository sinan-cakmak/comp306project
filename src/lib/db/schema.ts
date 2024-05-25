import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  unique,
  smallint,
  boolean,
  foreignKey,
  uuid,
  doublePrecision,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const eventEnum = pgEnum("event_enum", [
  "cycling",
  "yoga",
  "cross-fit",
  "dance",
  "power-lifting",
  "running",
  "swimming",
]);
//1st entity - 1st table
export const user = pgTable("user", {
  user_id: varchar("user_id").notNull().primaryKey(),
  height: doublePrecision("height"),
  weight: doublePrecision("weight"),
  created: timestamp("created", { mode: "string" }).defaultNow().notNull(),
});
//2nd entity - 2nd table
export const club = pgTable("club", {
  club_id: serial("club_id").notNull().primaryKey(),
  name: varchar("name").notNull(),
  location: varchar("location"),
  description: text("description"),
});
//3rd entity - 3rd table
export const instructor = pgTable("instructor", {
  instructor_id: serial("instructor_id").notNull().primaryKey(),
  name: varchar("name").notNull(),
  picture: varchar("picture"),
  experience: integer("experience"),
});
//4th entity - 4th table
export const event = pgTable("event", {
  event_id: serial("event_id").notNull().primaryKey(),
  name: varchar("name"),
  event_type: eventEnum("event_type").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  club_id: integer("club_id")
    .notNull()
    .references(() => club.club_id),
  instructor_id: integer("instructor_id")
    .notNull()
    .references(() => instructor.instructor_id),
});
//5th table
export const event_user = pgTable(
  "event_user",
  {
    event_id: integer("event_id")
      .notNull()
      .references(() => event.event_id),
    user_id: varchar("user_id").notNull(),
    created: timestamp("created", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.event_id, table.user_id] }),
    };
  }
);
