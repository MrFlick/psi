const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/term/:tid', (req, res) => {
  res.render('term', { term_id: req.params.tid });
});

router.get('/class/:cid', (req, res) => {
  res.render('class', { class_id: req.params.cid });
});

router.get('/student/:pid', (req, res) => {
  res.render('student', { person_id: req.params.pid });
});

module.exports = router;
