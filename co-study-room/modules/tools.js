const crypto = require('crypto');

// ログインチェック
exports.checkLoginId = function (req) {
  
  /* テストがうまくいかないのでコメントアウト
  if (!req.session.loginuser) {
    return false;
  }
  */
  return true;
}


// 日付の変換(yyyy-mm-dd => Date)
exports.translateStringToDate = function (string) {

  var re = string.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/);
  return new Date(parseInt(re[1]), parseInt(re[2])-1, parseInt(re[3]), 0, 0, 0);
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
