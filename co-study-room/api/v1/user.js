var express = require('express');
const db = require('../../models/index');
const tools = require('../../modules/tools')

const crypto = require('crypto')
const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const keyword_number = 8
const url_number = 32;

var router = express.Router();

/* POST /user/geturl */
router.post('/geturl', async function (req, res, next) {

  // パラメータの受取り
  var roomid = req.body.roomid
  var keyword;
  var url;
  var expiration = new Date();
  expiration.setDate(expiration.getDate() + 2);

  try {

    // sessionがない場合はエラーとしてレスポンス
    if (!tools.checkLoginstatus(req)) {
      throw 'requestHasNoSession';
    }

    // トランザクションの開始
    await db.sequelize.transaction(async (t) => {

      // 既にURLを発行済みかチェック
      var invitation = await db.InvitationRoom.findOne({
        where: {
          roomid: roomid
        }
      });
      
      if (!invitation) {

        // 発行済み招待URLがなければ新規登録、有効期限は二日後で登録する
        // keyword,urlはランダムな値を生成する
        keyword = Array.from(crypto.randomFillSync(new Uint8Array(keyword_number))).map((n)=>S[n%S.length]).join('');
        url = Array.from(crypto.randomFillSync(new Uint8Array(url_number))).map((n)=>S[n%S.length]).join('');

        var invitation = await db.InvitationRoom.create({
          roomid: roomid,
          invitationurl: url,
          keyword: keyword,
          expiration: expiration
        }, { transaction: t });
        
      } else {

        // 発行済み招待URLがあれば取得、有効期限を二日伸ばす
        await db.InvitationRoom.update({
          expiration: expiration,
        }, {
          where: {
            roomid: roomid,
        }
        }, { transaction: t });
      }

      // 発行済みの値、更新した有効期限をレスポンスする
      url = invitation.invitationurl;
      keyword = invitation.keyword;

      res.json({
        result: 'success',
        data: {
          url: url,
          keyword: keyword,
          expiration: `${expiration.getFullYear()}-${expiration.getMonth()+1}-${expiration.getDate()}`
        }
      });
    });

  } catch (err) {

    res.json({
      result: 'error',
      data: {},
    });    
  }
});


module.exports = router;
