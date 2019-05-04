/* eslint-disable no-throw-literal */
const express = require('express');
const modelSource = require('../models');

const router = express.Router();

function getRouter(sequelize) {
  const models = modelSource(sequelize);

  router.use(express.json());

  router.get('/', (req, res) => {
    res.send('hello');
  });
  router.get('/people', (req, res) => {
    models.Person.findAll().then((people) => {
      res.send(people);
    });
  });
  router.get('/people/:pid', (req, res) => {
    models.Person.findByPk(req.params.pid).then((person) => {
      res.send(person);
    });
  });
  router.get('/people/:pid/classes', ((req, res) => {
    models.Person.findByPk(req.params.pid)
      .then(person => person.getClasses({ include: [models.Course, models.Term] }))
      .then(data => data.map((x) => {
        const y = x.get({ plain: true });
        y.courseName = y.course.courseName;
        y.termName = y.term.termName;
        delete y.course;
        delete y.class_roster;
        delete y.term;
        return y;
      }))
      .then((classes) => { res.send(classes); });
  }));
  router.get('/courses', (req, res) => {
    models.Course.findAll().then((courses) => {
      res.send(courses);
    });
  });
  router.get('/courses/:cid', (req, res) => {
    models.Course.findByPk(req.params.cid).then((course) => {
      res.send(course);
    });
  });
  router.get('/terms', (req, res) => {
    models.Term.findAll().then((terms) => {
      res.send(terms);
    });
  });
  router.get('/terms/:tid', (req, res) => {
    models.Term.findByPk(req.params.tid).then((term) => {
      term.countStudents().then((studentCount) => {
        term.countClasses().then((classCount) => {
          const x = term.get({ plain: true });
          x.studentCount = studentCount;
          x.classCount = classCount;
          res.send(x);
        });
      });
    });
  });
  router.get('/terms/:tid/classes', (req, res) => {
    const query = {
      where: { termId: req.params.tid },
      include: [models.Course,
        {
          model: models.Person,
          trough: 'class_teachers',
          as: 'teachers',
        }],
    };
    models.TermClass.findAll(query)
      .then((data => data.map((x) => {
        const y = x.get({ plain: true });
        y.teachers.map((z) => {
          const zz = z;
          delete zz.class_teachers;
          return zz;
        });
        return y;
      })))
      .then((classes) => {
        res.send(classes);
      });
  });
  router.get('/classes/:cid', (req, res) => {
    models.TermClass.findByPk(req.params.cid).then(
      (termClass) => {
        Promise.all([termClass.getCourse(), termClass.getTeachers()])
          .then((values) => {
            const course = values[0];
            const teachers = values[1];
            const termClassObj = termClass.get({ plain: true });
            delete termClassObj.courseId;
            termClassObj.course = course;
            termClassObj.teachers = teachers.map((x) => {
              const y = x.get({ plain: true });
              delete y.class_teachers;
              return y;
            });
            res.send(termClass);
          });
      },
    );
  });
  router.get('/classes/:cid/students', (req, res) => {
    models.TermClass.findByPk(req.params.cid)
      .then(terClass => terClass.getStudents())
      .then(data => data.map((x) => {
        const y = x.get({ plain: true });
        delete y.class_roster;
        return y;
      }))
      .then((term) => {
        res.send(term);
      });
  });
  router.post('/classes/:cid/students', (req, res, next) => {
    const classId = req.params.cid;
    const actions = Object.keys(req.body);
    const knownActions = ['add'];
    if (!actions.every(x => knownActions.includes(x))) {
      const badActions = actions.filter(x => !knownActions.includes(x));
      throw {
        message: `Unrecognized action(s): ${badActions.join(', ')}`,
      };
    }
    Object.entries(req.body).forEach(([k, v]) => {
      if (!Array.isArray(v)) {
        throw {
          message: `Action '${k}' does not contain array`,
        };
      }
    });
    const getPerson = (data, t) => {
      const personData = models.Person.build(data).get({ plain: true });
      if (personData.personId) {
        return models.Person.findByPk(personData.personId);
      }
      return models.Person.create(personData, { transaction: t });
    };
    sequelize.transaction({ autocommit: false }, (t) => {
      return Promise.all(req.body.add.map((rawPerson) => {
        return getPerson(rawPerson, t).then((p) => {
          if (p) {
            return p.addClass(classId, { transaction: t });
          }
          throw {
            message: `Unable to find person: ${JSON.stringify(rawPerson)}`,
          };
        }).catch((err) => {
          throw err;
        });
      }));
    }).then((results) => {
      res.send(results);
    }).catch(next);
  });

  // API Error Handler
  // eslint-disable-next-line consistent-return
  router.use((err, req, res, next) => {
    console.log('ERROR HANDLER');
    if (res.headersSent) {
      return next(err);
    }
    res.status(err.status || 500).json({ message: err.message });
  });

  return router;
}

module.exports = getRouter;
