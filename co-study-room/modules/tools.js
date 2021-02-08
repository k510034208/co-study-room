const crypto = require('crypto');
const db = require('../models');

/*
 * sammary  ACLチェック
 * @params  roomid <int> roomid
 * @params  userid  <int> ログインユーザのID
 */
exports.checkAcl = async function (roomid, userid) {
  
  try {
    // userid が roomに所属するかチェックする
    var acl = await db.RoomAcl.findAll({
      where: {
        roomid: roomid,
        userid: userid
      }
    });    
  } catch (err) {
    console.log(err);
  }

  if (acl) {
    return true;
  }

  return false;
}

/*
 * sammary  日付の比較(yyyy-mm-dd => Date)
 * @params string <string> 日付（YYYY-MM-DD）
 */
exports.compareDate = function (day1, day2) {

  if (intParse(day2) < intParse(day1)) {
    return false;
  }
  return true;
}


// ログインチェック
exports.checkLoginstatus = function (req) {
  
  if (!req.session.loginuser) {
    return false;
  }
  return true;
}

// 日付の変換(yyyy-mm-dd => Date)
exports.translateStringToDate = function (string) {

  var re = string.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/);
  return new Date(parseInt(re[ 1 ]), parseInt(re[ 2 ]) - 1, parseInt(re[ 3 ]), 0, 0, 0);
}

// Login IDの文字種チェック（半角英数字）
exports.checkLoginId = function (value) {

  if (value.match(/^[A-Za-z0-9]*$/)) {
    return true;
  }
  return false;
}

// パスワードのハッシュ化用の関数
exports.hashSha256 = function (value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}
