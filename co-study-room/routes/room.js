var express = require('express');
const db = require('../models');
const room = require('../models/room');
const dbcontroller = require('../modules/dbController');
const tools = require('../modules/tools');

var router = express.Router();

/* GET /room/register page. */
router.get('/register', function (req, res, next) {

  if (!tools.checkLoginId) {

    res.redirect('/');
    return;
  }

  res.render('room-register', {
    message: null
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
    
  if (!tools.checkLoginId) {

    res.redirect('/');
    return;
  }

  // start_dateとend_dateの比較

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
      var schedule;
      for (var i = 0; i < term_content.lengh; i++) {
        schedule = await db.Schedule.create({
          roomid: room.id,
          term_end_date: term_end_date[i],
          term_content: term_content[i],
          term_task: ''
        }, { transaction: t });
      }

    });
    
  } catch(err) {
    console.error(err);
    res.render('room-register', {
      messsage:'エラーが発生しました'
    })
    return;
  }

  res.render('room-register', {
    message:'ルームが作成されました'
  });
});


module.exports = router;
