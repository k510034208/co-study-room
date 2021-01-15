const crypto = require('crypto');

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
