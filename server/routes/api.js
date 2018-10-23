var express = require('express')
var router = express.Router()

function get_router(sequelize) {
  var models = require("../models")(sequelize);

  router.get('/', function (req, res) {
    res.send('hello')
  })
  router.get('/people', function (req, res) {
    models.Person.findAll().then(people => {
      res.send(people)
    })
  })
  router.get('/people/:pid', function (req, res) {
    models.Person.findById(req.params.pid).then(person => {
      res.send(person)
    })
  })
  router.get('/people/:pid/classes', function (req, res) {
    models.Person.findById(req.params.pid).
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
    models.Course.findById(req.params.cid).then(course => {
      res.send(course)
    })
  })
  router.get('/terms', function (req, res) {
    models.Term.findAll().then(terms => {
      res.send(terms)
    })
  })
  router.get('/terms/:tid', function (req, res) {
    models.Term.findById(req.params.tid).then(term => {
      res.send(term)
    })
  })
  router.get('/terms/:tid/classes', function (req, res) {
    var query = {where: {term_id: req.params.tid}, include:[models.Course]}
    models.TermClass.findAll(query).
    then(data => {
      return data.map(x => {
        x = x.get({plain: true})
        x.course_name = x.course.course_name
        delete x.course
        return x
      })
    }).then(classes => {
      res.send(classes)
    })
  })
  router.get('/classes/:cid/students', function (req, res) {
    models.TermClass.findById(req.params.cid).
    then(term_class => {return term_class.getPeople()}).
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
  return router
}

module.exports = get_router