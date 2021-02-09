var express = require('express');
const db = require('../models');
const room = require('../models/room');
const dbcontroller = require('../modules/dbController');
const tools = require('../modules/tools');
var MarkdownIt = require('markdown-it');
var markdown = new MarkdownIt();

var router = express.Router();

/* GET /room/register page. */
router.get('/register', function (req, res, next) {

  // ログインチェック
  if (!tools.checkLoginstatus(req)) {
    res.redirect('/');
    return;
  }

  res.render('room-register', {
    message: null,
    form:{}
  });
});

/* POST /room/register page. */
router.post('/register', async function (req, res, next) {

  try{
    var room_name = req.body.room_name; //string
    var room_sammary = req.body.room_sammary; //string
    var start_date = tools.translateStringToDate(req.body.start_date); // 2021-01-27 => Date型
    var end_date = tools.translateStringToDate(req.body.end_date); // 2021-01-27 => Date型
    var book_title = req.body.book_title; //string
    var meetng_sammary = req.body.meetng_sammary; //string

    var term_content = req.body.content;
  
    var term_end_date_raw = req.body.term_end_date;
    var term_end_date = [];

    for (var date of term_end_date_raw) {
      term_end_date.push(tools.translateStringToDate(date));  
    }
    
    if (!tools.checkLoginstatus(req)) {

      res.redirect('/');
      return;
    }

    // start_dateとend_dateの比較
    if (!tools.compareDate(start_date, end_date)) {
      renderRoomRegister(req, res, '開始日は終了日より前の日付を設定してください');
      return;
    }

    // term毎のend_dateの比較

  // データの登録
    await db.sequelize.transaction(async (t) => {

      // 本情報の登録
      var book = await db.BookInfo.create({
        booktitle : book_title
      }, { transaction: t });

      // ルーム情報の登録
      var room = await db.Room.create({
        roomname: room_name,
        sammary: room_sammary,
        startdate: start_date,
        enddate: end_date,
        bookid: book.id,
        meeting: meetng_sammary,
      }, { transaction: t });

      // スケジュール情報の登録
      var schedule_data = [];
      for (var i = 0; i < term_content.length; i++) {
        schedule_data.push({
          roomid: room.id,
          term: i + 1,
          term_end_date: term_end_date[ i ],
          term_content: term_content[ i ],
          term_task: ''
        });
      }

      await db.Schedule.bulkCreate(schedule_data, { transaction: t });

      // ACLの登録
      await db.RoomAcl.create({
        userid: req.session.loginuser.id,
        roomid: room.id,
      }, { transaction: t });

    });
    
  } catch(err) {
    console.error(err);
    renderRoomRegister(req, res, 'エラーが発生しました');
    return;
  }

  renderRoomRegister(req, res, 'ルームが作成されました');
});

/* Get /room/?id page */
router.get('/', async function (req, res, next) {
  

  // ログインチェック
  if (!tools.checkLoginstatus(req)) {
    res.redirect('/');
    return;
  }

  var roomid = req.query.id;

  // ACLチェック
  //var acl = await tools.checkAcl(roomid, req.session.loginuser.id);
  var acl = await db.RoomAcl.findAll({
    where: {
      roomid: roomid,
      userid: req.session.loginuser.id
    }
  });

  if (acl.length == 0) {
    
    // error処理
    res.redirect('/top');
    return;
  }

  var room = await db.Room.findOne({
    where: {
      id: roomid
    },
  });

  var book = await db.BookInfo.findOne({
    where: {
      id: room.bookid
    },
  });

  var schedule = await db.Schedule.findAll({
    where: {
      roomid: roomid
    },
    order: [
      ['term', 'ASC']
    ]
  });

  var mynote = await db.Note.findOne({
    where: {
      roomid: roomid,
      userid:req.session.loginuser.id
    }
  });

  // render
  res.render('room', {
    session: req.session,
    room: room,
    book: book,
    schedule: schedule,
    mynote:markdown.render(mynote.note)
  });
})




function renderRoomRegister(req, res,message) {
  res.render('room-register', {
    message: message,
    form: req.body
  });
}


module.exports = router;
