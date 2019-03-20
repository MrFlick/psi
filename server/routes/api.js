var express = require('express')
var router = express.Router()

function get_router(sequelize) {
  var models = require("../models")(sequelize);

  router.use(express.json());

  router.get('/', function (req, res) {
    res.send('hello')
  })
  router.get('/people', function (req, res) {
    models.Person.findAll().then(people => {
      res.send(people)
    })
  })
  router.get('/people/:pid', function (req, res) {
    models.Person.findByPk(req.params.pid).then(person => {
      res.send(person)
    })
  })
  router.get('/people/:pid/classes', function (req, res) {
    models.Person.findByPk(req.params.pid).
      then(person => {
        return person.getClasses({include: [models.Course, models.Term]})
      }).
      then(data => data.map(x => {
        x = x.get({plain: true})
        x.course_name = x.course.course_name
        x.term_name = x.term.term_name
        delete x.course
        delete x.class_roster
        delete x.term
        return x
      })).
      then(classes => {res.send(classes)})
  })
  router.get('/courses', function (req, res) {
    models.Course.findAll().then(courses => {
      res.send(courses)
    })
  })
  router.get('/courses/:cid', function (req, res) {
    models.Course.findByPk(req.params.cid).then(course => {
      res.send(course)
    })
  })
  router.get('/terms', function (req, res) {
    models.Term.findAll().then(terms => {
      res.send(terms)
    })
  })
  router.get('/terms/:tid', function (req, res) {
    models.Term.findByPk(req.params.tid).then(term => {
      term.countStudents().then(student_count => {
        term.countClasses().then(class_count => {
          var x = term.get({plain: true})
          x.student_count = student_count
          x.class_count = class_count
          res.send(x)
        })
      })
    })
  })
  router.get('/terms/:tid/classes', function (req, res) {
    var query = {where: {term_id: req.params.tid},
      include:[models.Course,
        {
          model: models.Person,
          trough: 'class_teachers',
          as: 'teachers'
        }]}
    models.TermClass.findAll(query).
    then(data => {
      return data.map(x => {
        x = x.get({plain: true})
        x.teachers.map(y => {
          delete y.class_teachers
          return y
        })
        return x
      })
    }).then(classes => {
      res.send(classes)
    })
  })
  router.get('/classes/:cid', function (req, res) {
    models.TermClass.findByPk(req.params.cid).
    then(term => {
      res.send(term)
    })
  })
  router.get('/classes/:cid/students', function (req, res) {
    models.TermClass.findByPk(req.params.cid).
    then(term_class => {return term_class.getStudents()}).
    then(data => {
      return data.map(x => {
        x = x.get({plain: true})
        delete x.class_roster
        return x
      })
    }).
    then(term => {
      res.send(term)
    })
  })
  router.post('/classes/:cid/students', function (req, res, next) {
    var class_id = req.params.cid
    var actions = Object.keys(req.body)
    var knownActions = ["add"]
    if (!actions.every(x => knownActions.includes(x))) {
      throw {message: "Unrecognized action(s): " + 
        actions.filter(x => ! knownActions.includes(x)).join(", ")}
    }
    Object.entries(req.body).forEach(([k,v]) => {
      if (!Array.isArray(v)) {
        throw {message: `Action '${k}' does not contain array` }
      }
    })
    var getPerson = function(data, t) {
      var person_data = models.Person.build(data).get({plain: true})
      if (person_data.person_id) {
        return models.Person.findByPk(person_data.person_id)
      } else {
        return models.Person.create(person_data, {transaction: t})
      }
    }
    var results = []
    sequelize.transaction({autocommit: false}, t => {
      return Promise.all(req.body.add.map(raw_person =>{
        return getPerson(raw_person, t).then( p => {
          if (p) {
            return p.addClass(class_id, {transaction: t})
          } else {
            throw {message: "Unable to find person:" + 
              JSON.stringify(raw_person)}
          }
        }).catch(err => {
          throw err
        })
      }))
    }).then(() => {
      res.send(results)
    }).catch(next)
  })

  // API Error Handler
  router.use(function (err, req, res, next) {
    console.log("ERROR HANDLER")
    if (res.headersSent) {
      return next(err)
    }
    res.status(err.status || 500).json({message: err.message})
  });

  return router
}

module.exports = get_router