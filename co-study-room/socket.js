var app = require('./app');
var io = require('socket.io');
const db = require('./models/index');
var sessionMiddleware = app.session;

var store = {};

io.prototype._init = myIo => {

  // express-session を socket.io でも使えるように設定する
  myIo.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  myIo.on('connection', (socket) => {
    console.log('a user connected');

    // ルームに参加
    socket.on('join room', roomid => {
      console.log(`join room, ${roomid}. userid : ${socket.request.session.loginuser.id}`);
      socket.join(roomid);
    });

    // メッセージ受信
    socket.on('chat message', obj => {

      console.log('chat message recieved', obj);
      var roomid = obj.roomid;
      var message = obj.message;

      // DBへ保存
      try {
      
        await db.sequelize.transaction(async (t) => {

          await db.Message.create({
            roomid: roomid,
            userid: socket.request.session.loginuser.id,
            message: message,
          }, { transaction: t });
        });
      } catch (err) {

        console.log(err);
      }

      // メッセージをルーム全員に発信
      myIo.in(store[room_id]).emit('chat message', {
        userid: socket.request.session.login.id,
        username: socket.request.session.login.name,
        message: message,
        created_at: model.createdAt.getTime() //Timestamp 対応
      });
    });
  });
};

module.exports = io;