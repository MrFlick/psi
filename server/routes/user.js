var express = require('express')
var router = express.Router()

router.get("/", function(req, res) {
	res.render("index");
});

router.get("/class/:cid", function(req, res) {
	res.render("class", {class_id: req.params.cid});
});

module.exports = router