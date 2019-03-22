const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Person = sequelize.define('people', {
    person_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: Sequelize.TEXT,
    email: Sequelize.TEXT,
  });

  const Course = sequelize.define('courses', {
    course_id: { type: Sequelize.TEXT, primaryKey: true },
    course_name: Sequelize.TEXT,
    course_desc: Sequelize.TEXT,
    course_topic: Sequelize.TEXT,
    course_level: Sequelize.TEXT,
    course_sequence: Sequelize.INTEGER,
    prev_course_id: Sequelize.TEXT,
  });

  const Term = sequelize.define('terms', {
    term_id: { type: Sequelize.INTEGER, primaryKey: true },
    term_name: Sequelize.TEXT,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
  });

  const TermClass = sequelize.define('classes', {
    class_id: { type: Sequelize.INTEGER, primaryKey: true },
    term_id: Sequelize.INTEGER,
    course_id: Sequelize.TEXT,
    day_of_week: Sequelize.TEXT,
    start_time: Sequelize.INTEGER,
    end_time: Sequelize.INTEGER,
    location: Sequelize.TEXT,
  });

  TermClass.belongsTo(Term, { foreignKey: 'term_id' });
  TermClass.belongsTo(Course, { foreignKey: 'course_id' });
  Term.hasMany(TermClass, { foreignKey: 'term_id' });
  const ClassRoster = sequelize.define('class_roster', {
    class_id: { type: Sequelize.INTEGER, primaryKey: true },
    person_id: { type: Sequelize.INTEGER, primaryKey: true },
  }, { freezeTableName: true });
  ClassRoster.hasMany(TermClass, { foreignKey: 'class_id' });
  Person.belongsToMany(TermClass, {
    through: 'class_roster',
    foreignKey: 'person_id',
    other_key: 'class_id',
  });
  TermClass.belongsToMany(Person, {
    through: 'class_roster',
    as: { singular: 'student', plural: 'students' },
    foreignKey: 'class_id',
    other_key: 'person_id',
  });
  Person.belongsToMany(TermClass, {
    through: 'class_teachers',
    foreignKey: 'person_id',
    other_key: 'class_id',
  });
  TermClass.belongsToMany(Person, {
    through: 'class_teachers',
    as: { singular: 'teacher', plural: 'teachers' },
    foreignKey: 'class_id',
    other_key: 'person_id',
  });

  Term.prototype.countStudents = () => {
    ClassRoster.count({
      distinct: true,
      col: 'person_id',
      include: [
        {
          model: TermClass,
          where: { term_id: this.term_id },
        },
      ],
    });
  };

  return {
    Person,
    Course,
    Term,
    TermClass,
  };
};
