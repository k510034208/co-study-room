var express = require('express');
const db = require('../../models/index');
const tools = require('../../modules/tools')

var router = express.Router();

/* DELETE /room/delete */
router.delete('/delete', async function (req, res, next) {

  // パラメータの受取り
  var roomid = req.body.roomid

  try {

    // sessionがない場合はエラーとしてレスポンス
    if (!tools.checkLoginstatus(req)) {
      throw 'requestHasNoSession';
    }

    // トランザクションの開始
    await db.sequelize.transaction(async (t) => {

      var deleteroom = await db.Room.destroy({
        where: {
          id: roomid
        },
      }, { transaction: t });

      var deleteacl = await db.RoomAcl.destroy({
        where: {
          roomid: roomid
        }
      });

      res.json({
        result: 'success',
        data: {}
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
