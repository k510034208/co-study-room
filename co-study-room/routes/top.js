var express = require('express');
const db = require('../models');
var router = express.Router();

/* GET /top page. */
router.get('/', function (req, res, next) {
  
  if (!req.session.login) {
    res.redirect('/');
    return;
  }

  res.render('top', { title: 'co-study-room top' });
});

module.exports = router;
