DO $$ BEGIN
 CREATE TYPE "public"."event_enum" AS ENUM('cycling', 'yoga', 'cross-fit', 'dance', 'power-lifting', 'running', 'swimming', 'pilates', 'kickboxing', 'aerobics', 'hiit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "club" (
	"club_id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"location" varchar,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"event_id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"event_type" "event_enum" NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"club_id" integer NOT NULL,
	"instructor_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_user" (
	"event_id" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "event_user_event_id_user_id_pk" PRIMARY KEY("event_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "instructor" (
	"instructor_id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"picture" varchar,
	"experience" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"height" double precision,
	"weight" double precision,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_club_id_club_club_id_fk" FOREIGN KEY ("club_id") REFERENCES "public"."club"("club_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_instructor_id_instructor_instructor_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructor"("instructor_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_user" ADD CONSTRAINT "event_user_event_id_event_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("event_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_user" ADD CONSTRAINT "event_user_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
