var express = require('express');
const db = require('../models');
var router = express.Router();

/* GET /room/register page. */
router.get('/register', function (req, res, next) {
  
  if (!req.session.login) {
    res.redirect('/');
    return;
  }

  res.render('room-register', { title: 'co-study-room room-register' });
});

/* POST /room/register page. */
router.post('/register', function (req, res, next) {

  var room_name = req.body.room_name;
  var room_sammary = req.body.room_sammary;
  var book_title = req.body.book_title;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var meetng_sammary = req.body.meetng_sammary;

  // start_dateとend_dateの比較
  
  if (!req.session.login) {
    res.redirect('/');
    return;
  }

  res.render('room-register', { title: 'co-study-room room-register' });
});


module.exports = router;
