-- sample data

INSERT INTO people (personId, fullName)
VALUES (1, "Del Close"),
(2, "Mick Napier"),
(3, "Anna Singleton"),
(4, "Helen Edelman"),
(5, "Daniel Voss"),
(6, "Blake Abney"),
(7, "Jane Ritchie"),
(8, "Zachary Burcham"),
(9,'Tyler Oberndorf'),
(10,'Corbin Hartley'),
(11,'Catherine Kelley'),
(12,'Brenna Ketterman'),
(13,'Alexis Millard'),
(14,'Rienne Rouse'),
(15,'Christina Byers'),
(16,'Miranda Earl'),
(17,'Emily Thomas'),
(18,'Jane Martin'),
(19,'Matthew Jerie'),
(20,'Tyler Fraley');

INSERT INTO courses(courseId, courseName, courseDesc, 
    courseTopic, courseLevel, courseSequence, prevCourseId)
VALUES ("IMPROV-1", "Improv 1", "Intro to Improv",
    "IMPROV", "1", 100, NULL),
("IMPROV-2", "Improv 2", "Improv Skills",
    "IMPROV", "2", 150, "IMPROV-1"),
("IMED-1", "Intermediate 1", "Scene Work",
    "IMED", "1", 200, "IMPROV-2"),
("IMED-2", "Intermediate 2", "Advanced Scene Work",
    "IMED", "2", 220, "IMED-1"),
("IMED-3", "Intermediate 3", "Long Form Scene Work",
    "IMED", "3", 240, "IMED-2"),
("LF-1", "Longform 1", "The Harold",
    "LF", "1", 300, "IMED-3"),
("LF-2", "Longform 2", "The Deconstruction",
    "LF", "2", 320, "LF-1"),
("LF-3", "Longform 3", "The Performer",
    "LF", "3", 340, "LF-2");

INSERT INTO terms(termId, termName)
VALUES (1, "2018 - Term 4"),
(2, "2018 - Term 5");

INSERT INTO classes (classId, termId, courseId, dayOfWeek)
VALUES (1, 2, "IMPROV-1", "Sun"),
(2, 2, "IMPROV-2", "Thurs"),
(3, 2, "IMPROV-2", "Sat"),
(4, 2, "IMED-1", "Mon"),
(5, 2, "IMED-2", "Wed"),
(6, 2, "IMED-3", "Thurs"),
(7, 2, "LF-1", "Tues"),
(8, 2, "LF-2", "Mon");

INSERT INTO class_teachers(classId, personId)
VALUES (1, 1), (2, 2), (3, 1), (4, 2), 
(5, 1), (6, 2), (7, 1), (8,2);

INSERT INTO class_roster(classId, personId)
VALUES (1, 3), (1, 4), (1, 5),
(2, 6), (2, 7), (2, 8),
(3, 9), (3, 10), (3, 11),
(4, 12), (4, 13), (4, 14);
