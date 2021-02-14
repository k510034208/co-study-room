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
            
          })
      }
      db.sequelize.sync().then(() => db.Message.create({
        roomid: roomid,
        userid: socket.request.session.loginuser.id,
        message: message,
      })
        .then(model => {

          return model.reload();
        })
        .then(model => {
            // メッセージをルーム全員に発信
          myIo.in(store[room_id]).emit('chat message', {
            user_id: socket.request.session.login.id,
            user_name: socket.request.session.login.name,
            message: message,
            created_at: model.createdAt.getTime() //Timestamp 対応
          });
        })
      )
        .catch(err => {
          console.error(err);
        })
    });
  });
};


module.exports = io;
