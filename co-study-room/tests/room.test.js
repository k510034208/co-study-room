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


  describe("GET /room ", () => {
    
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

  });
});