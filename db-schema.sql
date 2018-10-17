--sqlite3 db/data.sqlite3 ".read db-schema.sql"

CREATE TABLE people (
	person_id INTEGER PRIMARY KEY,
	full_name TEXT NOT NULL,
	email TEXT
);

CREATE TABLE courses (
	course_id TEXT PRIMARY KEY,
	course_name TEXT,
	course_desc TEXT,
	prev_course_id TEXT
);

CREATE TABLE terms (
	term_id INTEGER PRIMARY KEY,
	term_name TEXT NOT NULL,
	start_date TEXT,
	end_date TEXT
);

CREATE TABLE classes (
	class_id INTEGER PRIMARY KEY,
	term_id INTEGER NOT NULL,
	course_id TEXT NOT NULL,
	day_of_week TEXT,
	start_time INTEGER,
	end_time INTEGER,
	location TEXT
);

CREATE TABLE class_teachers (
	class_id INTEGER NOT NULL,
	person_id INTEGER NOT NULL,
	teacher_type INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE class_roster (
	class_id INTEGER NOT NULL,
	person_id INTEGER NOT NULL
);

CREATE TABLE class_schedule (
	class_id INTEGER NOT NULL,
	start_date_time TEXT
);
