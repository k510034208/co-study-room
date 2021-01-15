var express = require('express');
const db = require('../models');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup', {
    title: 'co-study-room',
    message: []
  });
});

/* POST signup page. 
 * @param loginid ログインID
 * @param username  ユーザ名
 * @param password  パスワード
*/
router.post('/', async function (req, res, next) {

  var login_id = req.body.login_id;
  var user_name = req.body.user_name;
  var input_password = req.body.password;
  var input_retype_password = req.body.password_retype;
  
  // Usersテーブルへの登録処理
  try {
    await db.sequelize.transaction(async (t) => {
      
      await db.User.create({
        loginid: login_id,
        username: user_name,
        password: input_password
      }, { transaction: t });

      res.render('signup', {
        title: 'signup',
        message: [ { message: 'ユーザが作成されました' } ],
      });
    });

  } catch (err) {

    res.render('signup', {
      title: 'signup error',
      message: err.errors,
    });}
});

module.exports = router;
