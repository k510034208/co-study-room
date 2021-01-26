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

    /* 修正中
    // ログインしている場合、ルーム作成画面に遷移する
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
              expect(err).to.be.null; // エラーがないこと
              expect(res).to.have.status(200); //statusの指定
              expect(res.text).to.include('ルーム名、学習期間などを設定してルームを作成します'); //文字列を確認する
            });
        })
        .catch(function (err) {
          console.log(err);
          throw err;
        });
    });
    */
    
        // ログインしていない場合、ログイン画面に遷移する
    it('room作成', (done) => {
      chai.request(app)
        .post('/room/register')
        .send({
          room_name : 'test name',
          room_sammary: 'test sammary',
          start_date: new Date(2021, 0, 1, 0, 0, 0),
          end_date: new Date(2021, 1, 28, 0, 0, 0),
          book_title: 'test book title',
          meetng_sammary: 'test meeting',
          term_content: ['chap1', 'chap2', 'chap3'],
          term_end_date: [new Date(2021, 0, 1, 31, 0, 0), new Date(2021, 1, 14, 0, 0, 0), new Date(2021, 1, 28, 0, 0, 0)],
        })
        .end((err, res) => {
          expect(err).to.be.null; // エラーがないこと
          expect(res).to.have.status(200); //statusの指定
          expect(res.text).to.include('ルームが作成されました'); //LoginFormの文字列を確認する
          done();
        })
    });    

    

  });
});