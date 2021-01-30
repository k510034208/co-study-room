var express = require('express');
const db = require('../../models/index');
const room = require('../../models/room');
const crypto = require('crypto')
const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const keyword_number = 8
const url_number = 32;

var router = express.Router();

/* POST /geturl */
router.post('/geturl', async function(req, res, next) {

  var roomid = req.body.roomid
  var keyword;
  var url;
  var expiration;

  try {

    await db.sequelize.transaction(async (t) => {
      
      var invitation = await db.InvitationRoom.findOne({
        where: {
          roomid: roomid
        }
      });
      
      if (!invitation) {
        // 発行済み招待URLがなければ登録、有効期限は二日後で登録する

        keyword = Array.from(crypto.randomFillSync(new Uint8Array(keyword_number))).map((n)=>S[n%S.length]).join('');
        url = Array.from(crypto.randomFillSync(new Uint8Array(url_number))).map((n)=>S[n%S.length]).join('');
        expiration = new Date();
        expiration.setDate(expiration.getDate() + 2);

        var invitation = await db.InvitationRoom.create({
          roomid: roomid,
          invitationurl: url,
          keyword: keyword,
          expiration: expiration
        }, { transaction: t });
        
      } else {

        url = invitation.invitationurl;
        keyword = invitation.keyword;
        expiration = invitation.expiration;
        expiration.setDate(expiration.getDate() + 2);

        // 発行済み招待URLがあれば取得、有効期限を二日伸ばす
        await db.InvitationRoom.update({
          roomid: roomid,
        }, {
          where: {
            expiration: expiration,
          }
        }, { transaction: t });
      }

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
