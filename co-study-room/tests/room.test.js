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
    } catch (e) {
      console.log(e);
      console.log('ユーザが作成されませんでした');
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
    } catch (e) {
      console.log(e);
      console.log('ユーザが削除されませんでした');
    }
  });

  describe("GET /room/register ", () => {

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
          throw err;
        });
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
  });    
});