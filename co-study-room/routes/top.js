var express = require('express');
const db = require('../models/index');
const tools = require('../modules/tools');

var router = express.Router();

/* GET /top page. */
router.get('/', async function (req, res, next) {
  
  if (!tools.checkLoginstatus(req)) {
    res.redirect('/');
    return;
  }

  // ログインしているユーザのIDに紐づくルーム情報を取得する
  var rooms = await db.RoomAcl.findAll({
    where: {
      userid: req.session.loginuser.id
    },
    order: [['createdAt', 'ASC' // ACLIDが作成された日順（ユーザがルームに紐づけられた日順番）
    ]],
    include: [{
      model: db.Room,
      require:true
    }, {
      model: db.User,
      require:true
      }]
  });

  // 部屋ごとに所属しているユーザ名を取得する
  for (var room of rooms) {
    var roomid = room.roomid;

    users = await db.RoomAcl.findAll({
      where: {
        roomid: roomid
      },
      include: [ {
        model: db.User,
        require: true,
      } ]
    });

    var userarray = [];

    for (var user of users) {
      userarray.push(user.User.username);
    }
    room.users = userarray;
  }

  res.render('top', {
    title: 'co-study-room top',
    rooms:rooms
  });
});

module.exports = router;
