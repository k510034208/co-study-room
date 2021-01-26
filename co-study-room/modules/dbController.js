const db = require('../models');

exports.getRoomList = async function (userid) {
  
  var room = await db.RoomAcl.findAll({
    where: {
      userid: userid
    },
    order: [['createdAt', 'ASC' // ACLIDが作成された日順（ユーザがルームに紐づけられた日順番）
    ]],
    include: [{
      model: db.Room,
      require:true
    }, {
      model: db.User,
      require:true
      }]
  });

  console.log(room);

  if (!room) {
    return null;
  }
  return room;
}