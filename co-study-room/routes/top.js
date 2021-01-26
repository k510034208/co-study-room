var express = require('express');
const dbController = require('../modules/dbController');
var router = express.Router();

/* GET /top page. */
router.get('/', async function (req, res, next) {
  
  if (!req.session.loginuser) {
    res.redirect('/');
    return;
  }

  // ログインしているユーザのIDに紐づくルーム情報を取得する
  var rooms = await dbController.getRoomList(req.session.loginuser.id);

  res.render('top', {
    title: 'co-study-room top',
    rooms:rooms
  });
});

module.exports = router;
