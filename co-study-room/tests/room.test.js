const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const db = require('../models/index')
const { Op } = require('sequelize');

var expect = chai.expect;


chai.use(chaiHttp);
chai.should();

describe("room作成画面", () => {

  // 前処理
  before(async () => {
    try {
      await db.User.create({
        id:3,
        loginid: 'roomid001',
        username: 'roomname001',
        password: 'roompassword001',        
      });

      await db.Room.create({
        id: 3,
        roomname: 'testroom',
        sammary: 'testsamarry',
        startdate: new Date(2022, 0, 1, 0, 0, 0),
        enddate: new Date(2022, 1, 28, 0, 0, 0),
        bookid: 3,
        meeting: 'testinfo',
      });

      await db.RoomAcl.create({
        id:3,
        roomid : 3,
        userid: 3,
      });

      await db.BookInfo.create({
        id : 3,
        booktitle: 'testbooktitel',
      });

      await db.Schedule.create({
        id: 5,
        term:1,
        roomid: 1,
        term_end_date: new Date(2022,0,31,0,0,0),
        term_content: '第1章～第３章',
        term_task: ''
      },
      {
        id: 6,
        term:2,
        roomid: 1,
        term_end_date: new Date(2022,1,14,0,0,0),
        term_content: '第４章',
        term_task: ''
      },
      {
        id: 7,
        term: 3,
        roomid: 1,
        term_end_date: new Date(2022,1,28,0,0,0),
        term_content: '第５章',
        term_task: ''
      });
      
    } catch (e) {
      console.log(e);
    }
  });

  // 後処理
  after(async () => {
    try {
      await db.User.destroy({
        where: {
          loginid: { [ Op.like ]: `roomid%` }
        }
      });

      await db.Room.destroy({
        where: {
          id: 3,          
        }
      });

      await db.RoomAcl.destroy({
        where: {
          id: 3,          
        }
      });

      await db.BookInfo.destroy({
        where: {
          id: 3,          
        }
      });

      await db.Schedule.destroy({
        where: {
          id: 5,
        }
      });

      await db.Schedule.destroy({
        where: {
          id: 6,
        }
      });

      await db.Schedule.destroy({
        where: {
          id: 7,
        }
      });

    } catch (e) {
      console.log(e);
    }
  });

  describe("GET /room登録画面の表示 へのアクセス（ログイン画面を表示）", () => {

    // ログインしていない場合、ログイン画面に遷移する
    it('200OK', (done) => {
      chai.request(app)
        .get('/room/register')
        .end((err, res) => {
          expect(err).to.be.null; // エラーがないこと
          expect(res).to.have.status(200); //statusの指定
          expect(res.text).to.include('Login Form'); //LoginFormの文字列を確認する
          done();
        })
    });    

    it('ルーム作成画面への遷移', (done) => {
      var agent = chai.request.agent(app)
      agent
        .post('/login')
        .send({
          login_id: "roomid001",
          password: "roompassword001"
        }).then(function (res) {
          expect(res).to.have.status(200);
          return agent.get('/room/register')
            .then(function(res){
              expect(res).to.have.status(200); //statusの指定
              expect(res.text).to.include('ルーム名、学習期間などを設定してルームを作成します'); //文字列を確認する
            });
        })
        .catch(function (err) {
          console.log(err);
        })
      agent.close(done());
    });
    
    it('room作成実行', (done) => {
      var agent = chai.request.agent(app)
      agent
        .post('/login')
        .send({
          login_id: "roomid001",
          password: "roompassword001"
        }).then(function (res) {
          expect(res).to.have.status(200);
          return agent
            .post('/room/register')
            .send({
              room_name: 'test name1',
              room_sammary: 'test sammary',
              start_date: '2020-01-01',
              end_date: '2020-01-31',
              book_title: 'test book title',
              meetng_sammary: 'test meeting',
              content: [ 'chap1', 'chap2', 'chap3' ],
              term_end_date: [ '2020-01-10', '2020-01-21', '2020-01-31' ],
            })
            .then((err, res) => {
              expect(err).to.be.null; // エラーがないこと
              expect(res).to.have.status(200); //statusの指定
              expect(res.text).to.include('ルームが作成されました'); //LoginFormの文字列を確認する
            });
        })
        .catch(function (err) {
          console.log(err);
          throw err;
        });
      agent.close(done());
    });


    it('個別ルーム画面への遷移', (done) => {
      var agent = chai.request.agent(app)
      agent
        .post('/login')
        .send({
          login_id: "roomid001",
          password: "roompassword001"
        }).then(function (res) {
          expect(res).to.have.status(200);
          return agent
            .get('/room?roomid=1')
            .then((err, res) => {
              expect(err).to.be.null; // エラーがないこと
              expect(res).to.have.status(200); //statusの指定
              expect(res.text).to.include('testroom'); //roomの文字列を確認する
              expect(res.text).to.include('testsammary'); //roomの文字列を確認する
              expect(res.text).to.include('testsammary'); //roomの文字列を確認する
              expect(res.text).to.include('2022/1/1 ~ 2022/2/28'); //roomの文字列を確認する
              expect(res.text).to.include('testinfo'); //roomの文字列を確認する
            });
        })
        .catch(function (err) {
          console.log(err);
          throw err;
        });
      agent.close(done());
    });
  });    
});