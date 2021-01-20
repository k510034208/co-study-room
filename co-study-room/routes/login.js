var express = require('express');
const db = require('../models');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'co-study-room',
  });
});

/* POST /login 
 * @param loginid ログインID
 * @param password  パスワード
*/
router.post('/', async function (req, res, next) {

  var login_id = req.body.login_id;
  var input_password = req.body.password;
  
  // 入力パスワードしたパスワードがデータベースのパスワードと一致すること
  try {
      
    var loginuser = await db.User.findOne({
      where: {
      loginid: login_id,
      password: input_password        
      },
    },);

    if (!loginuser) {
      res.render('index', {
        title: 'co-study-room',
      });      
    }

    loginuser.password=undefined;
    req.session.login = loginuser.loginid;
    res.redirect('/top');

  } catch (err) {

    res.render('index', {
      title: 'co-study-room',
      message: err.errors,
    });}
});

module.exports = router;
