--sqlite3 db/data.sqlite3 ".read db-schema.sql"

CREATE TABLE people (
	personId INTEGER PRIMARY KEY,
	fullName TEXT NOT NULL,
	email TEXT
);

CREATE TABLE courses (
	courseId TEXT PRIMARY KEY,
	courseName TEXT,
	courseDesc TEXT,
	courseTopic TEXT,
	courseLevel TEXT,
	courseSequence INT,
	prevCourseId TEXT
);

CREATE TABLE terms (
	termId INTEGER PRIMARY KEY,
	termName TEXT NOT NULL,
	startDate TEXT,
	endDate TEXT
);

CREATE TABLE classes (
	classId INTEGER PRIMARY KEY,
	termId INTEGER NOT NULL,
	courseId TEXT NOT NULL,
	dayOfWeek TEXT,
	startTime INTEGER,
	endTime INTEGER,
	location TEXT
);

CREATE TABLE class_teachers (
	classId INTEGER NOT NULL,
	personId INTEGER NOT NULL,
	teacherType INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE class_roster (
	classId INTEGER NOT NULL,
	personId INTEGER NOT NULL
);

CREATE TABLE class_schedule (
	classId INTEGER NOT NULL,
	startDateTime TEXT
);

CREATE TABLE login_ids (
	personId INTEGER PRIMARY KEY,
	source TEXT NOT NULL,
	identifier TEXT NOT NULL
);

CREATE TABLE login_failures (
	source TEXT NOT NULL,
	identifier TEXT NOT NULL,
	name TEXT,
	email TEXT,
	loginDateTime TEXT
);