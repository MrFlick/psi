-- sample data

INSERT INTO people (person_id, full_name)
VALUES (1, "Del Close"),
(2, "Mick Napier"),
(3, "Anna Singleton"),
(4, "Helen Edelman"),
(5, "Daniel Voss"),
(6, "Blake Abney"),
(7, "Jane Ritchie"),
(8, "Zachary Burcham");

INSERT INTO courses(course_id, course_name, prev_course_id)
VALUES ("IMPROV-1", "Improv 1: Intro to Improv", NULL),
("IMPROV-2", "Improv 2: Improv Skills", "IMPROV-1"),
("IMED-1", "Intermediate 1: Scene Work", "IMPROV-2"),
("IMED-2", "Intermediate 2: Advanced Scene Work", "IMED-1"),
("IMED-3", "Intermediate 3: Long Form Scene Work", "IMED-2"),
("LF-1", "Longform 1: The Harold", "IMED-3"),
("LF-2", "Longform 2: The Deconstruction", "LF-1"),
("LF-3", "Longform 3: The Performer", "LF-2");

INSERT INTO terms(term_id, term_name)
VALUES (1, "2018 - Term 5");

INSERT INTO classes (class_id, term_id, course_id, day_of_week)
VALUES (1, 1, "IMPROV-1", "Sun"),
(2, 1, "IMPROV-2", "Thurs"),
(3, 1, "IMPROV-2", "Sat"),
(4, 1, "IMED-1", "Mon"),
(5, 1, "IMED-2", "Wed"),
(6, 1, "IMED-3", "Thurs"),
(7, 1, "LF-1", "Tues"),
(8, 1, "LF-2", "Mon");

INSERT INTO class_teachers(class_id, person_id)
VALUES (1, 1), (2, 2), (3, 1), (4, 2), 
(5, 1), (6, 2), (7, 1), (8,2);

INSERT INTO class_roster(class_id, person_id)
VALUES (1, 3), (1, 4), (1, 5), (2, 6), (2,7), (2, 8);