var express = require('express')
var router = express.Router()

router.get("/", function(req, res) {
	res.render("index");
});

router.get("/term/:tid", function(req, res) {
	res.render("term", {term_id: req.params.tid});
});

router.get("/class/:cid", function(req, res) {
	res.render("class", {class_id: req.params.cid});
});

router.get("/student/:pid", function(req, res) {
	res.render("student", {person_id: req.params.pid});
});

module.exports = router