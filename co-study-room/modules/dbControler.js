const db = require('../models');

exports.getRoomList = async function (userid) {
  
  var room = await db.Room.findAll({
    where: {
      userid: userid
    },
    order: [['createdAt', 'ASC' // ACLIDが作成された日順（ユーザがルームに紐づけられた日順番）
    ]],
    include: [{
      model: db.RoomAcl,
      require:true
    }]
  });

  if (!room) {
    return null;
  }
  return room;
}