var express = require('express')
var router = express.Router()


function get_router(sequelize) {
  var models = require("../models")(sequelize);

  router.get('/', function (req, res) {
    res.send('hello')
  })
  router.get('/people', function (req, res) {
    models.Person.findAll().then(people => res.send(people));
  })
  return router
}

module.exports = get_router