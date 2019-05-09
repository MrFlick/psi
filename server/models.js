const Sequelize = require('sequelize');

function getVerifiedEmail(profile) {
  if (profile.emails) {
    const record = profile.emails.find(x => x.verified);
    if (record) {
      return record.value;
    }
    return null;
  }
  return null;
}

module.exports = (sequelize) => {
  const Person = sequelize.define('people', {
    personId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: Sequelize.TEXT,
    email: Sequelize.TEXT,
  });

  const LoginId = sequelize.define('login_ids', {
    source: { type: Sequelize.TEXT, primaryKey: true },
    identifier: { type: Sequelize.TEXT, primaryKey: true },
    personId: Sequelize.INTEGER,
  });

  const LoginFailures = sequelize.define('login_failures', {
    rowid: { type: Sequelize.INTEGER, primaryKey: true },
    source: Sequelize.TEXT,
    identifier: Sequelize.TEXT,
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    loginDateTime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });

  Person.getFromLogin = function getFromLogin(profile, log = true) {
    const source = profile.provider;
    const identifier = profile.id;
    return LoginId.findOne({
      where: { source, identifier },
    }).then((record) => {
      if (record) {
        return Person.findByPk(record.personId);
      }
      if (log) {
        const attempt = { source, identifier, name: profile.displayName };
        const email = getVerifiedEmail(profile);
        if (email) {
          attempt.email = email;
        }
        return LoginFailures.create(attempt).then(() => Promise.resolve(null));
      }
      return Promise.resolve(null);
    });
  };

  const Course = sequelize.define('courses', {
    courseId: { type: Sequelize.TEXT, primaryKey: true },
    courseName: Sequelize.TEXT,
    courseDesc: Sequelize.TEXT,
    courseTopic: Sequelize.TEXT,
    courseLevel: Sequelize.TEXT,
    courseSequence: Sequelize.INTEGER,
    prevCourseId: Sequelize.TEXT,
  });

  const Term = sequelize.define('terms', {
    termId: { type: Sequelize.INTEGER, primaryKey: true },
    termName: Sequelize.TEXT,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
  });

  const TermClass = sequelize.define('classes', {
    classId: { type: Sequelize.INTEGER, primaryKey: true },
    termId: Sequelize.INTEGER,
    courseId: Sequelize.TEXT,
    dayOfWeek: Sequelize.TEXT,
    startTime: Sequelize.INTEGER,
    endTime: Sequelize.INTEGER,
    location: Sequelize.TEXT,
  });

  TermClass.belongsTo(Term, { foreignKey: 'termId' });
  TermClass.belongsTo(Course, { foreignKey: 'courseId' });
  Term.hasMany(TermClass, { foreignKey: 'termId' });
  const ClassRoster = sequelize.define('class_roster', {
    classId: { field: 'classId', type: Sequelize.INTEGER, primaryKey: true },
    personId: { field: 'personId', type: Sequelize.INTEGER, primaryKey: true },
  }, { freezeTableName: true });
  ClassRoster.hasMany(TermClass, { foreignKey: 'classId' });
  Person.belongsToMany(TermClass, {
    through: 'class_roster',
    foreignKey: 'personId',
    other_key: 'classId',
  });
  TermClass.belongsToMany(Person, {
    through: 'class_roster',
    as: { singular: 'student', plural: 'students' },
    foreignKey: 'classId',
    other_key: 'personId',
  });
  Person.belongsToMany(TermClass, {
    through: 'class_teachers',
    foreignKey: 'personId',
    other_key: 'classId',
  });
  TermClass.belongsToMany(Person, {
    through: 'class_teachers',
    as: { singular: 'teacher', plural: 'teachers' },
    foreignKey: 'classId',
    other_key: 'personId',
  });

  Term.prototype.countStudents = function countStudents() {
    return ClassRoster.count({
      distinct: true,
      col: 'personId',
      include: [
        {
          model: TermClass,
          where: { termId: this.termId },
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
