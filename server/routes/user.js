const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { messages: req.session.messages });
  req.session.messages = [];
});

router.get('*', (req, res) => {
  res.render('index');
});

module.exports = router;
