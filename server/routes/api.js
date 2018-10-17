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
  return router
}

module.exports = get_router