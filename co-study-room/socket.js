var app = require('./app');
var io = require('socket.io');
const db = require('./models/index');
var sessionMiddleware = app.session;

// express-session を socket.io でも使えるように設定する
io.prototype._init = myIo => {
  myIo.on('connection', (socket) => {
    console.log('a user connected');

    // ルームに参加
    socket.on('join room', roomid => {
      console.log(`join room, ${ roomid }. userid : ${ socket.request.session.loginuser.id }`);
      socket.join(roomid);
    });
  });
} 

module.exports = io;
