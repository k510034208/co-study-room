var express = require('express');
const db = require('../modules/dbControler');
var router = express.Router();

/* GET /top page. */
router.get('/', async function (req, res, next) {
  
  if (!req.session.loginid) {
    res.redirect('/');
    return;
  }

  // ログインしているユーザのIDに紐づくルーム情報を取得する
  var rooms = await db.getRoomList(req.session.loginid);

  res.render('top', {
    title: 'co-study-room top',
    rooms: rooms
  });
});

module.exports = router;
